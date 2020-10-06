import { AxiosRequestConfig, AxiosResponse } from "axios"
import { NewReview } from "../model"
import { Review } from "../model/Review"
import { instance } from "../utils/Interceptors/Inerceptors"
import { baseURL } from "./EnvironmentService"

class ReviewService {
    
    static createReview = (review: NewReview): Promise<AxiosResponse<Review>> =>{
        return instance.post<Review>(`${baseURL}/reviews`, review)
    }
}

export default ReviewService