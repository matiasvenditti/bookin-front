import { Typography } from '@material-ui/core';
import React from 'react';
import BookDisplay from '../../../components/BookDisplay/BookDisplay';
import AuthorCard from '../../../components/Cards/AuthorCard/AuthorCard';
import { Book } from '../../../model';
import { Author } from '../../../model/Author';
import classes from './Results.module.css';


interface ResultsProps {
    data: {books: Book[], authors: Author[]},
}

const Results = (props: ResultsProps) => {
    const {
        data
    } = props;

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
                            id={'results-author-card' + i}
                            author={author}
                        />
                    ))}
                </div>
            );
        }       
    }

    const renderBooks = () => {
        if (data.books.length === 0) {
            return (
                <div className={classes.resultsBooksContainer}>
                    <Typography className={classes.noResults}>No hay resultados</Typography>
                </div>
            );
        } else {
            return (
                <div className={classes.resultsBooksContainer}>
                    {data.books.map((book, i) => (
                        <BookDisplay
                            book={book}
                            // crown={}
                            author={'dfjhgkjdsfhg'}
                            resultsVariant
                        />
                    ))}
                </div>
            );
        }
        
    }
    
    return (
        <div className={classes.resultsContainer}>
            <Typography className={classes.title} variant='h3'>Autores</Typography>
            {renderAuthors()}
            <Typography className={classes.title} variant='h3'>Libros</Typography>
            {renderBooks()}
        </div>
    )
}


export default Results;
