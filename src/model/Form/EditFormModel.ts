interface FormValue {
    value: any,
    type: string,
    error: boolean,
}

export interface EditFormModel {
    [key: string]: FormValue,
}