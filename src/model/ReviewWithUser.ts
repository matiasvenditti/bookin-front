export class ReviewWithUser {
    id: number;
    stars: number;
    comment: string;
    userId: number;
    userFirstName: string;
    userLastName: string;
    
    constructor(id: number, stars: number, comment: string, userId: number, userFirstName: string, userLastName: string) {
        this.id = id;
        this.stars = stars;
        this.comment = comment;
        this.userId = userId;
        this.userFirstName = userFirstName;
        this.userLastName = userLastName;
    }
}
