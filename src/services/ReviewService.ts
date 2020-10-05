import {AxiosResponse} from "axios";

import {instance} from "../utils/Interceptors/Inerceptors";
import {baseURL} from "./EnvironmentService";
import {ReviewWithUser} from "../model/ReviewWithUser";
import ResponseDelete from "../model/responses/ResponseDelete";
import {Review} from "../model/Review";


class ReviewService {

    static getReviews = (bookID: number): Promise<AxiosResponse<ReviewWithUser[]>> => {
        return instance.get<ReviewWithUser[]>(`${baseURL}/books/${bookID}/reviews`)
    }

    static getReviewsFromUser = (userID: number): Promise<AxiosResponse<Review[]>> => {
        return instance.get<ReviewWithUser[]>(`${baseURL}/users/${userID}/reviews`)
    }

    static deleteReview = (reviewID: number): Promise<AxiosResponse<ResponseDelete>> => {
        return instance.delete<ResponseDelete>(`${baseURL}/reviews/${reviewID}`)
    }


}

export default ReviewService;