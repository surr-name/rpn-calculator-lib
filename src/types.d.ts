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
