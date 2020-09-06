import Gender from "./Gender";

export interface NewUser {
    firstName: string,
    lastName: string,
    email: string,
    gender: typeof Gender,
    password: string,
}