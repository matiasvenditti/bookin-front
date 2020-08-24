interface FormValue {
    value: any,
    type: string,
    error: boolean,
    touched: boolean,
}

export interface RegisterFormModel {
    [key: string]: FormValue,
}