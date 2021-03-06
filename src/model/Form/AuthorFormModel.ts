interface FormValue {
    value: any,
    type: string,
    error: boolean,
    touched: boolean,
}

export interface AuthorFormModel {
    [key: string]: FormValue,
}