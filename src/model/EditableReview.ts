import { ReviewWithUser } from "./ReviewWithUser";

export interface EditableReview {
    review: ReviewWithUser
    editMode: boolean
}