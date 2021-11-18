import {
    TokenOperator,
    Location,
} from './types';

export class InvalidTokenValueError extends TypeError {
    constructor(message: string, readonly token: object) {
        super(message);
        this.token = token;
    }
}

export class InvalidTokenError extends TypeError {
    constructor(message: string, readonly token: object) {
        super(message);
        this.token = token;
    }
}

export class TooShortStackError extends Error {
    constructor(readonly rpnStack: [], readonly token: TokenOperator) {
        super(`Cannot apply oprator "${token.value}" to stack. Stack is too short.`);
    }
}

export class RpnSyntaxError extends SyntaxError {
    constructor(
        readonly message: string,
        readonly location: Location
    ) {
        super(message);
    }
}

export class MatcherRegExpError extends Error {
    readonly input: string;
    readonly regexp: string;

    constructor(input: string, regexp: RegExp) {
        super('Matcher.regexp matched not from first character.');
        this.input = input;
        this.regexp = regexp.toString();
    }
}

export class NoTokensFoundError extends Error {
    constructor() {
        super('No tokens were found.');
    }
}
