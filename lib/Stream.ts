import { Port } from "./Port";
import { deferred } from "./Deferred";

export type StreamCallback<Event> = (event: Event) => void;

export interface Stream<Event> {
    readonly port: Port<Event>
    readonly stop: () => void
}

interface Nil<Event> {
    tail: Promise<Cons<Event>>
    append: (event: Event) => Nil<Event>
}
interface Cons<Event> {
    val: Event
    tail: Promise<Cons<Event>>
    append: (event: Event) => Cons<Event>
}
type AppendList<Event> = Nil<Event> | Cons<Event>

function cons<Event>(event: Event): Cons<Event> {
    let appended: false | Cons<Event> = false;
    const val = event
    const tail = deferred<Cons<Event>>()
    return {
        val,
        tail: tail.promise,
        append: (event: Event) => {
            if (appended) {
                throw new Error('Double append')
            }
            if (!appended) {
                let tailVal = cons(event)
                tail.resolve(tailVal)
                appended = {
                    val,
                    tail: tail.promise,
                    append: tailVal.append
                }
            }
            return appended
        }
    }
}

function nil<Event>(): Nil<Event> {
    let appended: false | Nil<Event> = false;
    const tail = deferred<Cons<Event>>()
    return {
        tail: tail.promise,
        append: (event: Event) => {
            if (appended) {
                throw new Error('Double append')
            }
            if (!appended) {
                let tailVal = cons(event)
                tail.resolve(tailVal)
                appended = {
                    tail: tail.promise,
                    append: tailVal.append
                }
            }
            return appended
        }
    }
}

function onTailCall<E>(isStopped: () => boolean, callback: StreamCallback<E>) {
    const onTail = (tail: Cons<E>) => {
        if (isStopped()) {
            return
        }
        callback(tail.val)
        tail.tail.then(onTail)
    }
    return onTail;
}

export function newStream<E>(onEvent: StreamCallback<E>): Stream<E> {
    let stopped = false;
    const stop = () => { stopped = true }
    let list: AppendList<E> = nil()
    list.tail.then(onTailCall(
        () => stopped,
        onEvent
    ))
    const port: Port<E> = {
        put(event: E) {
            list = list.append(event)
        }
    }
    return {
        port,
        stop
    }
}