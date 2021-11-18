import {
    TokenOperator,
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
        this.rpnStack = rpnStack;
        this.token = token;
    }
}
