export type Operation = {
    readonly requiredOperandsLength: number
    evaluate(operands: number[]): number
};

export type OperationsMap = Map<string, Operation>;

export interface TokenOperand {
    type: 'OPERAND',
    value: number,
}

export interface TokenOperator {
    type: 'OPERATOR',
    value: string,
}

export interface Location {
    global: {
        position: number,
    },
    withinChunk: {
        position: number,
    },
}

export interface AbstractToken {
    readonly type: string;
    readonly value: any;
    readonly matchedText: string;
    readonly location: Location;
}

export interface TokenExtractor {
    (matched: RegExpMatchArray, location: Location): AbstractToken;
}

export interface Matcher {
    readonly regexp: RegExp,
    readonly extract: TokenExtractor
}
