import {
    Matcher,
} from './types';

import {
    TokenOperand,
    TokenOperator,
    TokenUnknown,
} from './tokens';

export class TokenMatcher implements Matcher {
    constructor(
        readonly regexp: Matcher['regexp'],
        readonly extract: Matcher['extract']
    ) { }
}

export const OperandsTokenMatcher = new TokenMatcher(
    /^[+-]?[0-9]+(?:\.[0-9]+)?(?:\s+|$)/,
    (matched, location) => new TokenOperand(matched[0], location)
);

export const FourArithmeticOperatorsTokenMatcher = new TokenMatcher(
    /^[-+*/](?:\s+|$)/,
    (matched, location) => new TokenOperator(matched[0], location)
);

export const UnknownTokenMatcher = new TokenMatcher(
    /^\S+(?:\s+|$)/,
    (matched, location) => new TokenUnknown(matched[0], location)
);
