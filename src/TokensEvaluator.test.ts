import TokensEvaluator from './TokensEvaluator';

import {
    InvalidTokenError,
    InvalidTokenValueError,
    TooShortStackError,
} from './errors';

import {
    Operation,
 } from './types';

import {
    TokenOperand,
    TokenOperator,
 } from './tokens';

import { operations } from './operations';


describe('RpnTokensEvaluator', () => {
    let rpn: TokensEvaluator;

    beforeEach(() => {
        rpn = new TokensEvaluator;
    });

    describe('On invalid token.type', () => {

        test('it throws without changing stack', () => {
            const stackBefore = rpn.getStackCopy();

            expect(() => rpn.eval([{ type: 'AWKWARD', value: 5 } as unknown as TokenOperator]))
                .toThrowError(InvalidTokenError);

            expect(rpn.getStackCopy()).toEqual(stackBefore);
        });
    });


    describe('On token.type OPERAND', () => {

        test('it adds operands to stack in right order', () => {
            const tokens = [
                { type: 'OPERAND', value: 5 } as unknown as TokenOperand,
                { type: 'OPERAND', value: 7 } as unknown as TokenOperand,
                { type: 'OPERAND', value: 2 } as unknown as TokenOperand
            ];

            rpn.eval(tokens);

            expect(rpn.getStackCopy()).toEqual(tokens.map(token => token.value));
        });

        test('it throws without changing stack if token.value is not valid number', () => {
            const stackBefore = rpn.getStackCopy();

            const tokens = [
                { type: 'OPERAND', value: '5' } as unknown as TokenOperand
            ];

            expect(() => rpn.eval(tokens)).toThrowError(InvalidTokenValueError);

            expect(rpn.getStackCopy()).toEqual(stackBefore);
        });
    });

    describe('On token.type OPERATOR', () => {

        test('it applies opration to stack', () => {
            const tokens = [
                { type: 'OPERAND', value: 5 } as unknown as TokenOperand,
                { type: 'OPERAND', value: 2 } as unknown as TokenOperand,
                { type: 'OPERATOR', value: '+' } as unknown as TokenOperator,
            ];

            rpn.eval(tokens);

            expect(rpn.getStackCopy()).toEqual([7]);
        });

        test('it throws without changing stack if stack has less operands than required by operation', () => {
            const stackBefore = rpn.getStackCopy();

            const tokens = [
                { type: 'OPERAND', value: 5 } as unknown as TokenOperand,
                { type: 'OPERATOR', value: '+' } as unknown as TokenOperator,
            ];

            expect(() => rpn.eval(tokens)).toThrowError(TooShortStackError);

            expect(rpn.getStackCopy()).toEqual(stackBefore);
        });

        test('it throws without changing stack if operation.evaluate returns not valid number', () => {
            rpn.eval([
                { type: 'OPERAND', value: 5 } as unknown as TokenOperand,
                { type: 'OPERAND', value: 2 } as unknown as TokenOperand
            ]);

            const stackBefore = rpn.getStackCopy();
            const origin = operations.get('+');

            operations.set(
                '+',
                {
                    requiredOperandsLength: 2,
                    evaluate: (): string => '5'
                } as unknown as Operation
            );

            expect(() => rpn.eval([{ type: 'OPERATOR', value: '+' } as unknown as TokenOperator]))
                .toThrowError(InvalidTokenError);

            expect(rpn.getStackCopy()).toEqual(stackBefore);

            operations.set('+', origin as unknown as Operation);
        });
    });
});
