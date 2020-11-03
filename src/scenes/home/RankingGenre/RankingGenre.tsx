import { Button, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { Book, KeyValue, SearchAuthor } from '../../../model';
import { allBookGenres } from '../../../utils';
import classes from './RankingGenre.module.css';
import { 
    action, adventure, autorealization, biography,
    children, comedy, drama, education, fantasy, fiction,
    mistery, novel, poetry, police, romance, selfhelp,
    terror, tragic,
} from '../../../assets';
import { BooksService } from '../../../services';
import BookDisplay from '../../../components/BookDisplay/BookDisplay';
import { Skeleton } from '@material-ui/lab';


const getIconByBookGenre = (key: string) => {
    switch (key) {
        case 'Aventura':            return (<img src={adventure        } alt='adventure        ' height='40px' width='40px'/>);
        case 'Acción':              return (<img src={action           } alt='action           ' height='40px' width='40px'/>);
        case 'Auto-ayuda':          return (<img src={selfhelp         } alt='selfhelp         ' height='40px' width='40px'/>);
        case 'Auto-realización':    return (<img src={autorealization  } alt='autorealization  ' height='40px' width='40px'/>);
        case 'Biografías':          return (<img src={biography        } alt='biography        ' height='40px' width='40px'/>);
        case 'Comedia':             return (<img src={comedy           } alt='comedy           ' height='40px' width='40px'/>);
        case 'Drama':               return (<img src={drama            } alt='drama            ' height='40px' width='40px'/>);
        case 'Educativos':          return (<img src={education        } alt='education        ' height='40px' width='40px'/>);
        case 'Fantasia':            return (<img src={fantasy          } alt='fantasy          ' height='40px' width='40px'/>);
        case 'Ficción':             return (<img src={fiction          } alt='fiction          ' height='40px' width='40px'/>);
        case 'Infantiles':          return (<img src={children         } alt='children         ' height='40px' width='40px'/>);
        case 'Misterio':            return (<img src={mistery          } alt='mistery          ' height='40px' width='40px'/>);
        case 'Novela':              return (<img src={novel            } alt='novel            ' height='40px' width='40px'/>);
        case 'Poesías':             return (<img src={poetry           } alt='poetry           ' height='40px' width='40px'/>);
        case 'Policiales':          return (<img src={police           } alt='police           ' height='40px' width='40px'/>);
        case 'Romance':             return (<img src={romance          } alt='romance          ' height='40px' width='40px'/>);
        case 'Terror':              return (<img src={terror           } alt='terror           ' height='40px' width='40px'/>);
        case 'Trágica':             return (<img src={tragic           } alt='tragic           ' height='40px' width='40px'/>);
        default: return (<img src={action} alt='action' height='40px' width='40px'/>)
    }
}


type BookData = {
    id: number,
    data: Book,
    loadingAuthors: boolean,
    authors: string[],
};

interface RankingGenreProps {
    getErrorCallback(): void,
}

const RankingGenre = (props: RankingGenreProps) => {
    const [selector, setSelector] = useState<string | null>(null);
    const [books, setBooks] = useState<BookData[]>([]);
    const [loading, setLoading] = useState(false);

    const _requestBooks = (key: string) => {
        setSelector(key); setLoading(true); setBooks([]);
        BooksService.getRankingByRanking(key)
            .then((response) => {
                const bookDataList: BookData[] = response.data.map((book, id) => {
                    const authors: string[] = [];
                    return ({id, data: book, loadingAuthors: true, authors});
                });
                setBooks(bookDataList);
                setLoading(false);
                _requestBooksAuthors(bookDataList);
            })
            .catch((error) => {
                setLoading(false);
                props.getErrorCallback();
            })
    }

    const _requestBooksAuthors = (bookDataList: BookData[]) => {
        if (bookDataList.length === 0) return;
        const results = Promise.all([
            ...bookDataList.map((bookData) => (BooksService.getBookAuthors(bookData.data.id)))        
        ])
        results
            .then((responses) => {
                let newBooks = bookDataList;
                // [response: {data: [author1, author2, ...]}, response: {...}, ...]
                responses.forEach((response, index) => {
                    const authors = response.data.map((author: SearchAuthor) => (`${author.firstName} ${author.lastName}`));
                    newBooks[index] = {...newBooks[index], loadingAuthors: false, authors}
                })
                setBooks([...newBooks]); // without spread, react thinks newBooks = bookDataList 
                // and doesnt fire re-render
            })
            .catch((errors) => {
                let newBooks = bookDataList;
                // [response: {data: [author1, author2, ...]}, response: {...}, ...]
                newBooks.forEach((bookData, index) => {
                    newBooks[index] = {...newBooks[index], loadingAuthors: false, authors: [errors[index]]}
                })
                setBooks([...newBooks]); // without spread, react thinks newBooks = bookDataList 
                // and doesnt fire re-render
            })
    };

    const handleClickGenre = (key: string) => {
        _requestBooks(key)
    }

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
            return null;
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
                        <div key={`div-book-display-container-${i}`} className={classes.bookDisplayContainer}>
                            <BookDisplay
                                book={bookData.data}
                                loading={bookData.loadingAuthors}
                                authors={bookData.authors}
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
                        <BigButton
                            id={`${bookGenre.key}-button`}
                            title={bookGenre.value}
                            selected={selector === bookGenre.key}
                            onClick={() => handleClickGenre(bookGenre.key)}
                            endIcon={getIconByBookGenre(bookGenre.key)}
                        />
                    </div>
                ))}
            </div>
            {renderList()}
        </div>
    )
}

const BigButton = (props: {
    id: string,
    title: string,
    selected: boolean,
    onClick(): void,
    endIcon: any
}) => {
    const {id, title, selected, onClick, endIcon} = props;

    return (
        <Button
            key={id}
            onClick={onClick}
            variant='contained' size='large' 
            color={selected ? 'primary' : 'secondary'}
            className={classes.bigButton}
            endIcon={endIcon}
        >{title}</Button>
    );
};


export default RankingGenre;
