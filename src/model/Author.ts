export class Author {
    id: number;
    firstName: string;
    lastName: string;
    nationality: string;
    birthday: Date;
    photo: string;

    constructor(){
        this.id = 0;
        this.firstName = '';
        this.lastName = '';
        this.nationality = '';
        this.birthday = new Date();
        this.photo = '';
    }
}
