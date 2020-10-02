import {AxiosResponse} from "axios";

import {instance} from "../utils/Interceptors/Inerceptors";
import {baseURL} from "./EnvironmentService";
import {ReviewFromSpecificBook} from "../model/ReviewFromSpecificBook";
import ResponseDelete from "../model/responses/ResponseDelete";


class ReviewService {

    static getReviews = (bookID: number): Promise<AxiosResponse<ReviewFromSpecificBook[]>> => {
        return instance.get<ReviewFromSpecificBook[]>(`${baseURL}/books/${bookID}/reviews`)
    }

    static deleteReview = (reviewID: number): Promise<AxiosResponse<ResponseDelete>> => {
        return instance.delete<ResponseDelete>(`${baseURL}/reviews/${reviewID}`)
    }


}

export default ReviewService;