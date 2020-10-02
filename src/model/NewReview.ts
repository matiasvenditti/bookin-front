export interface NewReview {
    comment: string,
    stars: number,
    createdAt: Date,
    userId: string,
    bookId: string
}