import { allBookGenres, allCountries } from "./consts";


class ConstsUtils {
    static getCountryName = (codename: string) => {
        const country = allCountries.find((country) => country.codename === codename);
        if (country !== undefined) return country.name;
    };

    static getBookGenreName = (codename: string) => {
        const bookGenre = allBookGenres.find((bookGenre) => bookGenre.codename === codename);
        if (bookGenre !== undefined) return bookGenre.name;
    };    
}


export default ConstsUtils;
