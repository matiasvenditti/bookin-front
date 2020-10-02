import { AxiosRequestConfig, AxiosResponse } from "axios"
import { NewReview } from "../model"
import { Review } from "../model/Review"
import { instance } from "../utils/Interceptors/Inerceptors"
import { baseURL } from "./EnvironmentService"

class ReviewService {
    
    static createReview = (review: NewReview): Promise<AxiosResponse<Review>> =>{
        const createReviewForm = new FormData();
        createReviewForm.append('review', new Blob([JSON.stringify(review)], {type: 'application/json'} ));
        return instance.post<Review>(`${baseURL}/reviews`, createReviewForm)
    }
}

export default ReviewService