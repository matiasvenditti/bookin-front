export interface ReviewWithUser {
    id: number,
    stars: number,
    comment: string,
    userId: number,
    userFirstName: string,
    userLastName: string,
    edit: Boolean,
}