import { allCountries } from "./consts";


class ConstsUtils {
    static getCountryName = (codename: string) => {
        const country = allCountries.find((country) => country.codename === codename);
        if (country !== undefined) return country.name;
    };    
}


export default ConstsUtils;
