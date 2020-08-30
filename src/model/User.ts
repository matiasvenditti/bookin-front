import { Gender } from "./Gender";

export interface User {
    firstName: string,
    lastName: string,
    email: string,
    gender: Gender,
    photo: string,
}