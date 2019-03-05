import * as Reducer from '../lib/Reducer'
import { Port } from '../lib/Port';

export function AdderPrinter(): Port<number> {
    return Reducer.newReducer<number, number, 'print'>(
        0,
        (a, b) => [a + b, 'print'],
        (_: 'print', val: number) => {
            console.log('New state:', val)
        }
    )
}