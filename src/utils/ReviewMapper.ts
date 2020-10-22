import { EditableReview } from "../model/EditableReview";
import { ReviewWithUser } from "../model/ReviewWithUser";

export class ReviewMapper {
    static toEditableReview(reviews: ReviewWithUser[]): EditableReview[] {
        var editableReview: EditableReview[] = []
        editableReview = reviews.map((review: ReviewWithUser) => ({review, editMode: false}))
        console.log(editableReview)
        return  editableReview
    }
}