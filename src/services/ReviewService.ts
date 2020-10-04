import {AxiosResponse} from "axios";

import {instance} from "../utils/Interceptors/Inerceptors";
import {baseURL} from "./EnvironmentService";
import {ReviewWithUser} from "../model/ReviewWithUser";
import ResponseDelete from "../model/responses/ResponseDelete";


class ReviewService {

    static getReviews = (bookID: number): Promise<AxiosResponse<ReviewWithUser[]>> => {
        return instance.get<ReviewWithUser[]>(`${baseURL}/books/${bookID}/reviews`)
    }

    static deleteReview = (reviewID: number): Promise<AxiosResponse<ResponseDelete>> => {
        return instance.delete<ResponseDelete>(`${baseURL}/reviews/${reviewID}`)
    }


}

export default ReviewService;