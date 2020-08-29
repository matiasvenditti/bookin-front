export type Validator = (...args: any) => boolean
const requiredString: Validator = (value: string) => value !== '' && value !== null;
const requiredNumber: Validator = (value: number) => value !== null;
const requiredTrue: Validator = (value: boolean) => value;
const requiredFalse: Validator = (value: boolean) => !value;
const required: Validator = (value: any) => value !== null;
export {
    requiredString,
    requiredNumber,
    requiredFalse,
    requiredTrue,
    required,
}