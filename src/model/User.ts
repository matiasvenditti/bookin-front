import { Gender } from "./Gender";

export interface User {
    firstName: number,
    lastName: string,
    email: string,
    gender: Gender,
    photo: string,
}