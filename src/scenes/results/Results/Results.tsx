import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import BookDisplay from '../../../components/BookDisplay/BookDisplay';
import AuthorCard from '../../../components/Cards/AuthorCard/AuthorCard';
import { Book } from '../../../model';
import { Author } from '../../../model/Author';
import { RequestStatus } from '../../../model/consts/RequestStatus';
import { FilterBy } from '../../../model/results';
import { SortBy } from '../../../model/results/SortBy';
import { BooksService } from '../../../services';
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
    const [booksAuthorsLoadingStatuses, setBooksAuthorsLoadingStatuses] = 
        useState<RequestStatus[]>(sortedBooks.map(() => RequestStatus.NONE));
    const [booksAuthors, setBooksAuthors] = useState<any[]>(sortedBooks.map(() => []));

    const updateBooksFromProps = (newBooks: Book[]) => {
        setSortedBooks(newBooks);
        setBooksAuthorsLoadingStatuses(newBooks.map(() => RequestStatus.NONE));
        setBooksAuthors(newBooks.map(() => []));
    }

    useEffect(() => {
        updateBooksFromProps(sortBooks(sortBy, data.books));
        _requestAllBooksAuthors()
    }, []);

    useEffect(() => {
        updateBooksFromProps(sortBooks(sortBy, data.books));
        _requestAllBooksAuthors();
    }, [sortBy, data.books]);
    
    const _requestAllBooksAuthors = () => {
        let newBooksAuthors = booksAuthors;
        sortedBooks.forEach((status, i) => {
            const statuses = booksAuthorsLoadingStatuses;
            statuses[i] = RequestStatus.LOADING;
            setBooksAuthorsLoadingStatuses(statuses);
            // TODO change for request with only {id, firstName, lastName}
            BooksService.getBookAuthorsSimple(sortedBooks[i].id)
                .then((response) => {
                    newBooksAuthors[i] = response.data.map((author) => `${author.firstName} ${author.lastName}`);
                    setBooksAuthors(newBooksAuthors);
                    statuses[i] = RequestStatus.SUCCESS;
                    setBooksAuthorsLoadingStatuses(statuses);
                })
                .catch((error) => {
                    statuses[i] = RequestStatus.ERROR;
                    setBooksAuthorsLoadingStatuses(statuses);
                })
        })
    };

    const renderAuthors = () => {
        if (data.authors.length === 0) {
            return (
                <div className={classes.resultsAuthorsContainer}>
                    <Typography className={classes.noResults}>No hay resultados</Typography>
                </div>
            );
        } else {
            return (
                <div className={classes.resultsAuthorsContainer}>
                    {data.authors.map((author, i) => (
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
        // console.log('rendering books', props, sortedBooks.map((book, i) => ({book: book, status: booksAuthorsLoadingStatuses[i], authors: booksAuthors[i]})));
        if (loading) {
            return (
                [1, 2, 3].map((i) => (
                    <BookDisplay
                        key={'bookdisplay-skeleton-' + i}
                        book={new Book()}
                        author={''}
                        resultsVariant
                    />
                ))
            );                
        
        } else if (sortedBooks.length === 0) {
            return (
                <div className={classes.resultsBooksContainer}>
                    <Typography className={classes.noResults}>No hay resultados</Typography>
                </div>
            );
        } else {
            return (
                <div className={classes.resultsBooksContainer}>
                    {sortedBooks.map((book, i) => (
                        <BookDisplay
                            key={'bookdisplay-card-' + i}
                            book={book}
                            author={booksAuthors[i]}
                            resultsVariant
                            loading={loading}
                            loadingAuthors={booksAuthorsLoadingStatuses[i] === RequestStatus.LOADING}
                        />
                    ))}
                </div>
            );
        }    
    }
    
    // console.log(Object.values(FilterBy), filterBy);
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
            // console.log('render results -> libros')
            return (
                <div className={classes.resultsContainer}>
                    <Typography className={classes.title} variant='h3'>Libros</Typography>
                    {renderBooks()}
                </div>
            );
        case FilterBy.autores:
            // console.log('render results -> autores')
            return (
                <div className={classes.resultsContainer}>
                    <Typography className={classes.title} variant='h3'>Autores</Typography>
                    {renderAuthors()}
                </div>
            );
        case FilterBy.ambos:
            // console.log('render results -> ambos')
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
