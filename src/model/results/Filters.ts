import { FilterBy, SortBy } from '.';


export type Filters = {
    text: string;
    sortBy: SortBy,
    filterBy: FilterBy ,
    nationalities: string[]; // nationality code -> utils/consts/allCountries
    bookGenres: string[]; // book genre -> utils/consts/allBookGenres
    languages: string[]; // languages -> utils/consts/allLanguages
}
