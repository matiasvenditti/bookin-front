import { Author } from "../Author";

interface FormValue {
    value: any,
    type: string,
    error: boolean,
}

export class EditAuthorFormModel {
    id: FormValue;
    firstName: FormValue;
    lastName: FormValue;
    nationality: FormValue;
    birthday: FormValue;
    photo: FormValue;

    constructor(author: Author){
        this.id = {value: author.id, type: 'hidden', error: false}
        this.firstName = {value: author.firstName, type: 'text', error: false}
        this.lastName = {value: author.lastName, type: 'text', error: false}
        this.nationality = {value: author.nationality, type: 'select', error: false}
        this.birthday = {value: author.birthday, type: 'Date', error: false}
        this.photo = {value: author.photo, type: 'File', error: false}

    }

}