import {
    TokenOperand,
    TokenOperator
 } from './types';

import {
    InvalidTokenError,
    InvalidTokenValueError,
    TooShortStackError,
} from './errors';

import {
    operations,
} from './operations';

type StackOfNumbers = Array<number>;
type KnownToken = TokenOperand | TokenOperator;

export default class TokensEvaluator {
    private stack: StackOfNumbers;

    constructor(stack=[]) {
        this.stack = stack;
    }

    eval(tokens: KnownToken[]): void {
        this.stack = tokens.reduce(this.applyToken.bind(this), this.getStackCopy());
    }

    getStackCopy() {
        return this.stack.concat([]);
    }

    getStackLength(): number {
        return this.stack.length;
    }

    getLastStackElement(): number | undefined {
        return this.stack[this.getStackLength() - 1];
    }

    private applyToken(stack: StackOfNumbers, token: KnownToken): StackOfNumbers {
        switch (token.type) {
            case 'OPERAND':
                this.applyTokenOperand(stack, token);
                break;
            case 'OPERATOR':
                this.applyTokenOperator(stack, token);
                break;
            default:
                throw new InvalidTokenError('Unknown token.', token);
        }
        return stack;
    }

    private applyTokenOperand(stack: StackOfNumbers, token: TokenOperand): void {
        const value = token.value;
        if (!TokensEvaluator.isValidNumber(value)) throw new InvalidTokenValueError(
            'Value of token of type OPERAND must be a valid number.',
            token
        );
        stack.push(value);
    }

    private applyTokenOperator(stack: StackOfNumbers, token: TokenOperator): void {
        const operation = operations.get(token.value);
        if (!operation) throw new InvalidTokenValueError(
            `Unknown operator "${token.value}".`,
            token
        );
        const requiredOperandsLength = operation.requiredOperandsLength;
        const stackLength = stack.length;
        if (stackLength < requiredOperandsLength) throw new TooShortStackError(
            stack as [],
            token
        );
        const operands = stack.splice(stackLength - requiredOperandsLength);
        const result = operation.evaluate(operands);
        if (!TokensEvaluator.isValidNumber(result)) throw new InvalidTokenError(
            'Value returned by token operation is not valid number.',
            token
        );
        stack.push(result);
    }

    static isValidNumber(value: any): boolean {
        return typeof value === 'number' && !Number.isNaN(value);
    }
}