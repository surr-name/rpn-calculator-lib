import {
    OperationsMap,
 } from './types';

export const operations: OperationsMap = new Map();

operations.set(
    '+',
    {
        requiredOperandsLength: 2,
        evaluate:([a, b]) => a + b,
    }
);

operations.set(
    '-',
    {
        requiredOperandsLength: 2,
        evaluate:([a, b]) => a - b,
    }
);

operations.set(
    '*',
    {
        requiredOperandsLength: 2,
        evaluate:([a, b]) => a * b,
    }
);

operations.set(
    '/',
    {
        requiredOperandsLength: 2,
        evaluate:([a, b]) => a / b,
    }
);
