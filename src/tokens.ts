import {
    Location,
    AbstractToken,
} from './types';

import {
    RpnSytaxError,
} from './errors';

export class TokenOperand implements AbstractToken {
    readonly type: 'OPERAND';
    readonly value: number;

    constructor(
        readonly matchedText: string,
        readonly location: Location
    ) {
        this.type = 'OPERAND';
        this.value = this.parseValue(matchedText);
    }

    private parseValue(matchedText: string): number {
        const value = parseFloat(matchedText);
        if (Number.isNaN(value)) throw new RpnSytaxError(
            `Can't convert "${matchedText}" to number.`,
            this.location
        );
        return value;
    }
}

export class TokenOperator implements AbstractToken {
    readonly type: 'OPERATOR';
    readonly value: string;

    constructor(
        readonly matchedText: string,
        readonly location: Location
    ) {
        this.type = 'OPERATOR';
        this.value = matchedText.trim();
    }
}

export class TokenUnknown implements AbstractToken {
    readonly type: 'UNKNOWN';
    readonly value: string;

    constructor(
        readonly matchedText: string,
        readonly location: Location
    ) {
        this.type = 'UNKNOWN';
        this.value = matchedText.trim();
    }
}
