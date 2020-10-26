import { Book, User } from ".";

export interface NewReview {
    comment: string,
    stars: number,
    created_at: Date,
    user: User,
    book: Book
}