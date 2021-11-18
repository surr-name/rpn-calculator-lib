export type Operation = {
    readonly requiredOperandsLength: number
    evaluate(operands: number[]): number
};

export interface TokenOperand {
    type: 'OPERAND',
    value: number,
}

export interface TokenOperator {
    type: 'OPERATOR',
    value: string,
}
