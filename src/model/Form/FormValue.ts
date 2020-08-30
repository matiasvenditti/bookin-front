import { Validator } from "../../utils/Validators/RequiredValidator";

export interface FormValue {
    value: any,
    type: string,
    error: boolean,
    touched: boolean,
    validators: Validator[];
}