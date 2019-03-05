export interface Port<T> {
    put(event: T): void
}
