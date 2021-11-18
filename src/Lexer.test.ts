import Lexer from './Lexer';
import {
    FourArithmeticOperatorsTokenMatcher,
    OperandsTokenMatcher,
    UnknownTokenMatcher,
} from './matchers';

describe('Fixed Lexer Instance', () => {
    const fixedLexerInstance = new Lexer([
        OperandsTokenMatcher,
        FourArithmeticOperatorsTokenMatcher,
        UnknownTokenMatcher
    ]);

    test('it creates Operands and Operators tokens', () => {
        expect(fixedLexerInstance.splitChunkToTokens('5 2 +'))
            .toEqual([
                {
                    type: 'OPERAND',
                    value: 5,
                    matchedText: '5 ',
                    location: { global: { position: 0 }, withinChunk: { position: 0 } },
                },
                {
                    type: 'OPERAND',
                    value: 2,
                    matchedText: '2 ',
                    location: { global: { position: 2 }, withinChunk: { position: 2 } },
                },
                {
                    type: 'OPERATOR',
                    value: '+',
                    matchedText: '+',
                    location: { global: { position: 4 }, withinChunk: { position: 4 } },
                }
            ]);
    });

    test('it handles global token location on next chunk', () => {
        expect(fixedLexerInstance.splitChunkToTokens('5'))
            .toEqual([
                {
                    type: 'OPERAND',
                    value: 5,
                    matchedText: '5',
                    location: { global: { position: 5 }, withinChunk: { position: 0 } },
                }
            ]);
    });

    test('it gracefully matches UNKNOWN tokens among known ones', () => {
        expect(fixedLexerInstance.splitChunkToTokens('7 WTF 8'))
            .toEqual([
                {
                    type: 'OPERAND',
                    value: 7,
                    matchedText: '7 ',
                    location: { global: { position: 6 }, withinChunk: { position: 0 } },
                },
                {
                    type: 'UNKNOWN',
                    value: 'WTF',
                    matchedText: 'WTF ',
                    location: { global: { position: 8 }, withinChunk: { position: 2 } },
                },
                {
                    type: 'OPERAND',
                    value: 8,
                    matchedText: '8',
                    location: { global: { position: 12 }, withinChunk: { position: 6 } },
                }
            ]);
    });
});

