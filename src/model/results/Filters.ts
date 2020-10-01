import { SortBy } from "./SortBy";


export type Filters = {
    text: string;
    sortBy: SortBy;
    nationalities: string[]; // nationality code -> utils/consts/allCountries
    bookGenres: string[]; // book genre -> utils/consts/allBookGenres
    languages: string[]; // languages -> utils/consts/allLanguages
}

export const initialFilters: Filters = {
    text: '',
    sortBy: SortBy.alphabeticAsc,
    nationalities: [], 
    bookGenres: [],
    languages: [],
}
