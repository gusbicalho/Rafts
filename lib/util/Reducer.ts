import { Port } from "./Port";
import { StreamFactory, Stream } from "./Stream";

export type ReduceFn<State, Event, Effect> =
    (state: State, event: Event) => [State, Effect?]

export type PureReduceFn<State, Event> =
    (state: State, event: Event) => State

export type StreamControls = {
    stop: () => void
}

export type EffectHandler<State, Event, Effect> =
    (effect: Effect, state: State, streamControls: Stream<Event>) => void

export function pure<State, Event>(
    reduceFn: PureReduceFn<State, Event>
): ReduceFn<State, Event, void> {
    return (
        (state: State, event: Event) => [reduceFn(state, event)]
    )
}

export function newReducer<State, Event, Effect>(
    newStream: StreamFactory,
    initialState: State,
    reduceFn: ReduceFn<State, Event, Effect>,
    effectHandler:
        void extends Effect
        ? (undefined | EffectHandler<State, Event, Effect>)
        : EffectHandler<State, Event, Effect>
): Port<Event> {
    let state = initialState
    const stream = newStream<Event>((event: Event) => {
        const [newState, effect] = reduceFn(state, event)
        state = newState
        if (effect && effectHandler) {
            effectHandler(effect, state, stream)
        }
    })
    return stream.port;
}
