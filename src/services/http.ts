import { REQUEST_TYPES } from "../utils/enums";


/**
 * 
 */
const request = (type: String, body:) => {
    let header = {

    };

};

const getRequest = (body: Object) => request(REQUEST_TYPES.GET, body);
const postRequest = (body: Object) => request(REQUEST_TYPES.POST, body);
const putRequest = (body: Object) => request(REQUEST_TYPES.PUT, body);
const deleteRequest = (body: Object) => request(REQUEST_TYPES.DELETE, body);

export {
    getRequest,
    postRequest,
    putRequest,
    deleteRequest,
}