import { AxiosRequestConfig, AxiosResponse } from "axios"
import { NewReview } from "../model"
import { Review } from "../model/Review"
import { instance } from "../utils/Interceptors/Inerceptors"
import { baseURL } from "./EnvironmentService"

class ReviewService {
    
    static createReview = (review: NewReview, userId: string, bookId: string): Promise<AxiosResponse<Review>> =>{
        const createReviewForm = new FormData();
        createReviewForm.append('review', new Blob([JSON.stringify(review)], {type: 'application/json'} ));
        createReviewForm.append('userId', userId);
        createReviewForm.append('bookId', bookId)
        const config: AxiosRequestConfig = {
            headers: {
                'Content-Type': undefined,
            }
        }
        return instance.post<Review>(`${baseURL}/reviews`, createReviewForm, config)
    }
}

export default ReviewService