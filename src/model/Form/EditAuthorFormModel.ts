interface FormValue {
    value: any,
    type: string,
    error: boolean,
}

export interface EditAuthorFormModel {
    [key: string]: FormValue,
}