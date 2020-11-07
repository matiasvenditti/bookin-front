import {Typography } from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import { Book, SearchAuthor } from '../../../model';
import classes from './RankingMain.module.css';
import { BooksService } from '../../../services';
import BookDisplay from '../../../components/BookDisplay/BookDisplay';
import { Skeleton } from '@material-ui/lab';
import { Author } from '../../../model/Author';

type BookData = {
    id: number,
    data: Book,
    // loadingAuthors: boolean,
    // authors: string[],
};

interface RankingMainProps {
    getErrorCallback(): void,
}

const RankingMain = (props: RankingMainProps) => {
    const [books, setBooks] = useState<BookData[]>([]);
    const [loading, setLoading] = useState(false);

    const _requestBooks = () => {
        setLoading(true); setBooks([]);
        BooksService.getRankingByScore()
            .then((response) => {
                const bookDataList: BookData[] = response.data.map((book, id) => {
                    const authors: string[] = [];
                    return ({id, data: book, loadingAuthors: true, authors});
                });
                setBooks(bookDataList);
                setLoading(false);
                // _requestBooksAuthors(bookDataList);
            })
            .catch(() => {
                setLoading(false);
                props.getErrorCallback();
            })
    }

    useEffect(() => {
        _requestBooks();
    }, []);

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
                    {books.map((bookData, i) => (
                        <div key={`div-best-books-display-container-${i}`} className={classes.bookDisplayContainer}>
                            <BookDisplay
                                book={bookData.data}
                                authors={bookData.data.authors.map((author: Author) => (`${author.firstName} ${author.lastName}`))}
                            />
                        </div>
                    ))}
                </div>
            );
        }
    };

    return (
        <div className={classes.container}>
            <Typography align='center' variant='h4' className={classes.title}>Estos son los libros preferidos!</Typography>
            {renderList()}
        </div>
    )
}

export default RankingMain;
