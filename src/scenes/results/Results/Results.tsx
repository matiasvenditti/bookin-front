import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import BookDisplay from '../../../components/BookDisplay/BookDisplay';
import AuthorCard from '../../../components/Cards/AuthorCard/AuthorCard';
import { Book } from '../../../model';
import { Author } from '../../../model/Author';
import { FilterBy } from '../../../model/results';
import { SortBy } from '../../../model/results/SortBy';
import sortBooks from '../../../utils/sortBooks';
import classes from './Results.module.css';


interface ResultsProps {
    sortBy: SortBy,
    filterBy: FilterBy,
    data: {books: Book[], authors: Author[]},
    loading: boolean,
    emptySearch: boolean,
}

const Results = (props: ResultsProps) => {
    const {
        data,
        sortBy,
        filterBy,
        loading,
        emptySearch,
    } = props;
    const [sortedBooks, setSortedBooks] = useState<Book[]>(sortBooks(sortBy, data.books));

    const updateBooksFromProps = (newBooks: Book[]) => {
        setSortedBooks(newBooks);
    }

    useEffect(() => {
        updateBooksFromProps(sortBooks(sortBy, data.books));
    }, []);

    useEffect(() => {
        updateBooksFromProps(sortBooks(sortBy, data.books));
    }, [sortBy, data.books, loading ]);

    const renderAuthors = () => {
        if (!loading && data.authors.length === 0) {
            return (
                <div className={classes.resultsAuthorsContainer}>
                    <Typography className={classes.noResults}>No hay resultados</Typography>
                </div>
            );
        } else {
            const list = loading ? [new Author(), new Author(), new Author()] : data.authors;
            return (
                <div className={`${classes.resultsAuthorsContainer} ${classes.authorResults}`}>
                    {list.map((author, i) => (
                        <AuthorCard
                            key={'results-author-card' + i}
                            author={author}
                            loading={loading}
                        />
                    ))}
                </div>
            );
        }       
    }

    const renderBooks = () => {
        if (!loading && sortedBooks.length === 0) {
            return (
                <div className={classes.resultsBooksContainer}>
                    <Typography className={classes.noResults}>No hay resultados</Typography>
                </div>
            );
        } else {
            const list = loading ? [new Book(), new Book(), new Book()] : sortedBooks;
            return (
                <div className={classes.resultsBooksContainer}>
                    {list.map((book, i) => (
                        <div key={'bookdisplay-card-' + i} className={classes.resultsBooksBookContainer}>
                            <BookDisplay
                                book={book}
                                authors={book.authors.map((author) => (`${author.firstName} ${author.lastName}`))}
                                resultsVariant
                                loading={loading}
                            />
                        </div>
                    ))}
                </div>
            );
        }    
    }
    
    if (emptySearch) {
        return (
            <div className={classes.resultsContainer}>
                <div className={classes.resultsBooksContainer}>
                    <Typography className={classes.noResults}>Realiza una busqueda!</Typography>
                </div>
            </div>
        );
    }

    switch (filterBy) {
        case FilterBy.libros:
            return (
                <div className={classes.resultsContainer}>
                    <Typography className={classes.title} variant='h3'>Libros</Typography>
                    {renderBooks()}
                </div>
            );
        case FilterBy.autores:
            return (
                <div className={classes.resultsContainer}>
                    <Typography className={classes.title} variant='h3'>Autores</Typography>
                    {renderAuthors()}
                </div>
            );
        case FilterBy.ambos:
            return (
                <div className={classes.resultsContainer}>
                    <Typography className={classes.title} variant='h3'>Autores</Typography>
                    {renderAuthors()}
                    <Typography className={classes.title} variant='h3'>Libros</Typography>
                    {renderBooks()}
                </div>
            );
        default: return null;
    }
}


export default Results;
