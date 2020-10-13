import { allCountries } from "./consts";


class ConstsUtils {
    static getCountryName = (key: string) => {
        const country = allCountries.find((country) => country.value === key);
        if (country !== undefined) return country.key;
    };    
}


export default ConstsUtils;
