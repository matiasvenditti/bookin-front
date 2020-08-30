import {Validator} from "./RequiredValidator";

const textValidator: Validator = (value: string) => {
    // any common letter
    const regex = /^[a-zA-Z]+$/;
    return regex.test(value);
}
const passwordValidator: Validator = (value: string) => {
    // any common letter and a length of 6 minimum
    const regex = /^([a-zA-Z0-9]|[!@#$%^&*]){6,50}$/;
    return regex.test(value);
}
const numberValidator: Validator = (value: number) => {
    // any number
    const regex = /^[0-9]+$/;
    return regex.test(value.toString());
}
const emailValidator: Validator = (value: string) => {
    // any alphanumeric + @ + any lowercase with dots in the middle
    // example -> asd@asd.asd
    const regex = /^[a-zA-Z0-9]+@([a-z]+[.])+[a-z]+$/;
    return regex.test(value);
}
const radioGroupValidator: Validator = (value: string) => {
    return value !== null;
}
export {
    textValidator,
    passwordValidator,
    numberValidator,
    emailValidator,
    radioGroupValidator,
}