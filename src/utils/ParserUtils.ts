export default class ParserUtils {

    /**
     * @param object keys should be parameters keys
     */
    static objectToRequestParams = (object: Object): string => {
        let result = '';
        const keys = Object.keys(object);
        const values = Object.values(object);
        let first = 0;
        for (var i = 0; i < keys.length; i++) {
            if (!values[i]) {
                first++;
            } else {
                result += (first === 0) ? '?' : '&' 
                result += `${keys[i]}=${values[i]}`;
            }
        }
        console.log('objectToRequestParams', result);
        return result;
    }

    static arrayToStringParam = (array: any[]): any => {
        if (array.length === 0) return null;
        let result = '';
        array.forEach((lang, i) => {
            if (i === 0) result += lang;
            else result += `,${lang}`;
        })
        return result;
    }
}