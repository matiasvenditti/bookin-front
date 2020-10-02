import { UserReview } from "./UserReview";

export interface ReviewFromSpecificBook {
    id: number,
    stars: number,
    comment: string,
    user: UserReview,
}