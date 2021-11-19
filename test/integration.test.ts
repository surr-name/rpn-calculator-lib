import Lexer from '../src/Lexer';
import TokensEvaluator from '../src/TokensEvaluator';
import {
    FourArithmeticOperatorsTokenMatcher,
    OperandsTokenMatcher,
    UnknownTokenMatcher,
} from '../src/matchers';

const createSimpleRpnCalculator = () => {
    const tokensEvaluator = new TokensEvaluator;
    const lexer = new Lexer([
        OperandsTokenMatcher,
        FourArithmeticOperatorsTokenMatcher,
        UnknownTokenMatcher
    ]);

    return (input: string): number | undefined => {
        tokensEvaluator.eval(lexer.splitChunkToTokens(input));
        return tokensEvaluator.getLastStackElement();
    };
};

describe('Integration of Lexer and TokensEvaluator', () => {

    test('it evaluates rpn expression', () => {
        const rpn = createSimpleRpnCalculator();

        expect(rpn('5 5 5 8 + + -')).toEqual(-13);
    });

    test('it stores state between invokations', () => {
        const rpn = createSimpleRpnCalculator();

        expect(rpn('5 5 5 8 + + -')).toEqual(-13);
        expect(rpn('13 +')).toEqual(0);
    });
});
