interface FormValue {
    value: any,
    type: string,
    error: boolean,
    touched: boolean,
}

export interface LoginFormModel {
    [key: string]: FormValue,
}