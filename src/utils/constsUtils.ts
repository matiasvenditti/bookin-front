import { allCountries } from "./consts";


class ConstsUtils {
    static getCountryName = (key: string) => {
        const country = allCountries.find((country) => country.value === key);
        if (country !== undefined) return country.key;
    };

    static getBookGenreValue = (key: string): string => {
        const bookGenre = allCountries.find((bookG) => bookG.key === key);
        if (bookGenre !== undefined) return bookGenre.value;
        else return '';
    }
}


export default ConstsUtils;
