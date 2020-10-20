import { TagValueParams } from "../model";

export default class ParserUtils {

    /**
     * @param object keys should be parameters keys
     */
    static arrayToRequestParams = (array: TagValueParams[]): string => {
        let result = '';
        let first = true;
        for (var i = 0; i < array.length; i++) {
            if (array[i].value !== '') {
                if (first) {
                    result += `?${array[i].tag}=${array[i].value}`;
                    first = false;
                }
                else result += `&${array[i].tag}=${array[i].value}`;
            }
        }
        // console.log('objectToRequestParams', result);
        return result;
    }
}