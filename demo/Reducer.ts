import * as Reducer from '../lib/util/Reducer'
import { Port } from '../lib/util/Port';
import { newStream } from './impls/SimpleStreamImpl';

export function AdderPrinter(): Port<number> {
    return Reducer.newReducer<number, number, 'print'>(
        newStream,
        0,
        (a, b) => [a + b, 'print'],
        (_: 'print', val: number) => {
            console.log('New state:', val)
        }
    )
}