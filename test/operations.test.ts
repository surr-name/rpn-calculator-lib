import { operations } from '../src/operations';

describe('operations', () => {
    test('+', () => {
        expect(operations.get('+')?.evaluate([5, 2])).toEqual(7);
    });

    test('-', () => {
        expect(operations.get('-')?.evaluate([5, 2])).toEqual(3);
    });

    test('*', () => {
        expect(operations.get('*')?.evaluate([5, 2])).toEqual(10);
    });

    test('/', () => {
        expect(operations.get('/')?.evaluate([5, 2])).toEqual(2.5);
    });
});
