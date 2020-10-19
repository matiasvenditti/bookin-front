export class ReviewWithUser {
    id: number;
    stars: number;
    comment: string;
    userId: number;
    userFirstName: string;
    userLastName: string;
    edit: Boolean = false;

    constructor() {
        this.id = 0;
        this.stars = 0;
        this.comment = '';
        this.userId = 0;
        this.userFirstName = '';
        this.userLastName = '';
    }
}