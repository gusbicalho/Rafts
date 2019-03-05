import * as Rafts from '../lib/Rafts';
import { Port } from '../lib/util/Port';
import { newStream } from './impls/SimpleStreamImpl';
import { newReducer } from '../lib/util/Reducer';

console.log('Rafts:', Rafts)

export function AdderPrinter(): Port<number> {
    return newReducer<number, number, 'print'>(
        newStream,
        0,
        (a, b) => [a + b, 'print'],
        (_: 'print', val: number) => {
            console.log('New state:', val)
        }
    )
}
