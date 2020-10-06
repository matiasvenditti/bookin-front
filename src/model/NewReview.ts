export interface NewReview {
    comment: string,
    stars: number,
    created_at: Date,
    user_id: string,
    book_id: string
}