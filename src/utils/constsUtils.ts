import { allBookGenres, allCountries, allLanguages } from "./consts";


class ConstsUtils {
    static getCountryName = (key: string): string => {
        const country = allCountries.find((country) => country.key === key);
        if (country !== undefined) return country.value;
        else return 'País inválido';
    };

    static getBookGenreValue = (key: string): string => {
        const bookGenre = allBookGenres.find((bookG) => bookG.key === key);
        if (bookGenre !== undefined) return bookGenre.value;
        else return 'Género inválido';
    }

    static getLanguageValue = (key: string): string => {
        const language = allLanguages.find((lang) => lang.key === key);
        if (language !== undefined) return language.value;
        else return 'Idioma inválido';
    }
}


export default ConstsUtils;
