import { Book } from "../model";
import { SortBy } from "../model/results/SortBy";

/**
 * Book -> id, title, genre, language, date, photo, stars
 * @param sortBy 
 * @param books 
 */
export default function(sortBy: SortBy, books: Book[]): Book[] {
    switch (sortBy) {
        case SortBy.alphabeticAsc: return books.sort((a: Book, b: Book) => a.title.localeCompare(b.title));
        case SortBy.alphabeticDes: return books.sort((a: Book, b: Book) => b.title.localeCompare(a.title));
        case SortBy.publicationDateAsc: return books.sort((a: Book, b: Book) => a.date.getTime() - b.date.getTime());
        case SortBy.publicationDateDes: return books.sort((a: Book, b: Book) => b.date.getTime() - a.date.getTime());
        case SortBy.starsAsc: return books.sort((a: Book, b: Book) => a.stars - b.stars);
        case SortBy.starsDes: return books.sort((a: Book, b: Book) => b.stars - a.stars);
        default: return books;
    }
}
