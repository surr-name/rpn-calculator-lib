import {
    Operation,
 } from './types';

export const operations: Map<string, Operation> = new Map();

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
