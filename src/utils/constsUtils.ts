import { allBookGenres, allCountries } from "./consts";


class ConstsUtils {
    static getCountryName = (key: string) => {
        const country = allCountries.find((country) => country.key === key);
        if (country !== undefined) return country.value;
    };

    static getBookGenreValue = (key: string): string => {
        const bookGenre = allBookGenres.find((bookG) => bookG.key === key);
        if (bookGenre !== undefined) return bookGenre.value;
        else return '';
    }
}


export default ConstsUtils;
