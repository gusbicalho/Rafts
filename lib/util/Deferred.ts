export interface Deferred<T> {
    readonly promise: Promise<T>
    readonly resolve: (value: T) => void
    readonly reject: (error: any) => void
}

export function deferred<T>(): Deferred<T> {
    let resolve: ((val: T) => void)
    let reject: (error: any) => void

    const promise = new Promise<T>((res, rej) => {
        resolve = res;
        reject = rej;
    })

    return { 
        promise,
        resolve: resolve!,
        reject: reject!
    }
}
