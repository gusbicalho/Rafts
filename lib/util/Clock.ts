import { Port } from "./Port";
import { setInterval } from "timers";

export type NanoTime = BigInt

export interface Clocked<T> {
    nanoTime: NanoTime
    event: T
}

type Unclocked<T> = T extends Clocked<infer U> ? U : T

export function clocked<Event>(
    port: Port<Clocked<Event>>,
): Port<Event> {
    const put = (event: Event) => {
        port.put({
            nanoTime: process.hrtime.bigint(),
            event,
        })
    }
    return { put }
}

export const tick = Symbol('Event/Tick')
export type Tick = typeof tick

export const startTicking = Symbol('Event/StartTicking')
export type StartTicking = typeof startTicking

export const stopTicking = Symbol('Event/Tick')
export type StopTicking = typeof stopTicking

type TickerCommand =
    | StartTicking
    | StopTicking

export function ticked<Event extends {}>(
    port: Port<Event | Tick>,
    intervalMs: number
): Port<Event | TickerCommand> {
    let interval: NodeJS.Timeout | undefined = undefined
    const startInterval = () => {
        if (!interval) {
            interval = setInterval(() => {
                port.put(tick)
            }, intervalMs)
        }
    }
    const stopInterval = () => {
        if (interval) {
            clearInterval(interval)
            interval = undefined
        }
    }

    const put = (event: Event | TickerCommand) => {
        if (event === stopTicking) {
            stopInterval()
        } else if (event === startTicking) {
            startInterval()
        } else {
            port.put(event)
        }

    }
    return { put };
}
