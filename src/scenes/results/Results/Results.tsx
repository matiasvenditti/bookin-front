import { Typography } from '@material-ui/core';
import React from 'react';
import AuthorCard from '../../../components/Cards/AuthorCard/AuthorCard';
import BookCard from '../../../components/Cards/BookCard/BookCard';
import { Book } from '../../../model';
import { Author } from '../../../model/Author';
import './Results.css';


const mockAuthors = [
    { photo: null, firstname: 'Firstname', lastname: 'Lastname 1' },
    { photo: null, firstname: 'Firstname', lastname: 'Lastname 2' },
    { photo: null, firstname: 'Firstname', lastname: 'Lastname 3' },
    { photo: null, firstname: 'Firstname', lastname: 'Lastname 4' },
];
const mockBooks = [
    { photo: null, title: 'Titulo del libro 1', author: 'Autor del libro 1', genre: 'Ficción', language: 'Español', date: 1995, summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin id enim pretium, bibendum quam sed, mollis sapien. Nam et sem posuere, viverra turpis sed, eleifend nunc. Ut erat est, gravida sed semper nec, dapibus vitae ipsum. Ut maximus erat dolor, a pharetra dui convallis a. In sodales, nulla sit amet lacinia pretium, felis sapien pharetra quam, eu ornare sapien nunc id sapien. Maecenas consectetur interdum libero hendrerit ultrices. Quisque sagittis ante quam, id sagittis urna facilisis vitae.' },
    { photo: null, title: 'Titulo del libro 2', author: 'Autor del libro 2', genre: 'Romance', language: 'Español', date: 1995, summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin id enim pretium, bibendum quam sed, mollis sapien. Nam et sem posuere, viverra turpis sed, eleifend nunc. Ut erat est, gravida sed semper nec, dapibus vitae ipsum. Ut maximus erat dolor, a pharetra dui convallis a. In sodales, nulla sit amet lacinia pretium, felis sapien pharetra quam, eu ornare sapien nunc id sapien. Maecenas consectetur interdum libero hendrerit ultrices. Quisque sagittis ante quam, id sagittis urna facilisis vitae.' },
]


interface ResultsProps {
    data: {books: Book[], authors: Author[]},
}

const Results = (props: ResultsProps) => {
    return (
        <div className='results-container'>
            <Typography className='title' variant='h3'>Autores</Typography>
            <div className='results-authors-container'>
                {mockAuthors.map((author, i) => (
                    <AuthorCard
                        photo={author.photo}
                        firstname={author.firstname}
                        lastname={author.lastname}
                        id={'results-author-card' + i}
                    />
                ))}
            </div>
            <Typography className='title' variant='h3'>Libros</Typography>
            <div className='results-books-container'>
                {mockBooks.map((book, i) => (
                    <BookCard
                        id={'results-book-card' + i}
                        photo={book.photo}
                        title={book.title}
                        author={book.author}
                        genre={book.genre}
                        language={book.language}
                        date={book.date}
                        summary={book.summary}
                    />
                ))}
            </div>
        </div>
    )
}


export default Results;
