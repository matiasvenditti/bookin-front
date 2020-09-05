import { Gender } from "./Gender";

export interface User {
    [key: string]: any,
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    gender: Gender,
    photo: any,
}