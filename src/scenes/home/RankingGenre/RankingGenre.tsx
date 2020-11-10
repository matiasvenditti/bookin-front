import { Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { Book, KeyValue } from '../../../model';
import { allBookGenres } from '../../../utils';
import classes from './RankingGenre.module.css';
import { BooksService } from '../../../services';
import BookDisplay from '../../../components/BookDisplay/BookDisplay';
import { Skeleton } from '@material-ui/lab';
import { Author } from '../../../model/Author';
import GenreBigButton from './GenreBigButton';


interface RankingGenreProps {
    getErrorCallback(): void,
}

const RankingGenre = (props: RankingGenreProps) => {
    const [selector, setSelector] = useState<string | null>(null);
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);

    const _requestBooks = (key: string) => {
        setSelector(key); setLoading(true); setBooks([]);
        BooksService.getRankingByRanking(key)
            .then((response) => setBooks(response.data))
            .catch(() => props.getErrorCallback())
            .finally(() => setLoading(false));
    };

    const handleClickGenre = (key: string) => {
        _requestBooks(key);
    };

    const renderList = () => {
        if (loading) {
            return (
                <div className={classes.bookContainer}>
                    {[1, 2, 3].map((i) => (
                        <div key={`skeleton-book-${i}`} className={classes.bookDisplayContainer}>
                            <Skeleton variant='rect' height={400} width={250}/>
                        </div>
                    ))}
                </div>
            );
        }
        if (!selector) {
            return (
                <div className={classes.bookContainer}>
                    <div className={classes.noBooksTextContainer}>
                        <Typography variant='h4' className={classes.noBooksText}>{`Seleccione un género`}</Typography>
                    </div>
                </div>
            );
        }
        if (books.length === 0) {
            return (
                <div className={classes.bookContainer}>
                    <div className={classes.noBooksTextContainer}>
                        <Typography variant='h4' className={classes.noBooksText}>{`No hay libros de este género`}</Typography>
                    </div>
                </div>
            );
        } else {
            return (
                <div className={classes.bookContainer}>
                    {books.map((book, i) => (
                        <div key={`div-book-display-container-${i}`} className={classes.bookDisplayContainer}>
                            <BookDisplay
                                book={book}
                                authors={book.authors.map((author: Author) => (`${author.firstName} ${author.lastName}`))}
                            />
                        </div>
                    ))}
                </div>
            );
        }
    };

    return (
        <div className={classes.container}>
            <Typography align='center' variant='h4' className={classes.title}>Elegí tu género favorito</Typography>
            <div className={classes.buttonsContainer}>
                {allBookGenres.map((bookGenre: KeyValue) => (
                    <div key={`${bookGenre.key}-div`} className={classes.bigButtonContainer}>
                        <GenreBigButton
                            id={`${bookGenre.key}-button`}
                            title={bookGenre.value}
                            selected={selector === bookGenre.key}
                            onClick={() => handleClickGenre(bookGenre.key)}
                            endIconKey={bookGenre.key}
                        />
                    </div>
                ))}
            </div>
            {renderList()}
        </div>
    )
}


export default RankingGenre;
