export type StreamCallback<Event> = (event: Event) => void;

export interface Stream<Event> {
    readonly port: Port<Event>
    readonly stop: () => void
}

export type StreamFactory =
    <Event>(callback: StreamCallback<Event>) => Stream<Event>