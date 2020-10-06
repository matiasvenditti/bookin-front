export type Filters = {
    text: string;
    nationalities: string[]; // nationality code -> utils/consts/allCountries
    bookGenres: string[]; // book genre -> utils/consts/allBookGenres
    languages: string[]; // languages -> utils/consts/allLanguages
}

export const initialFilters: Filters = {
    text: '',
    nationalities: [], 
    bookGenres: [],
    languages: [],
}
