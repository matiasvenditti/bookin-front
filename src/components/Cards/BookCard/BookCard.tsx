import { Typography } from '@material-ui/core';
import React from 'react';
import { dummyAvatar } from '../../../assets';
import './BookCard.css';


interface BookCardProps {
    id: string,
    photo: any,
    title: string,
    author: string,
    genre: string,
    language: string,
    date: number,
    summary: string,
}

const BookCard = (props: BookCardProps) => {
    return (
        <div className='book-card-container' key={props.id}>
            <img src={props.photo || dummyAvatar} alt='' />
            <div className='book-card-content-container'>
                <Typography className='titlee' variant='h5'>{props.title}</Typography>
                <Typography className='author' variant='h6'>{props.author}</Typography>
                <div>
                    <Typography className='subtitle'>Género: </Typography>
                    <Typography>{props.genre}</Typography>
                </div>
                <div>
                    <Typography className='subtitle'>Idioma: </Typography>
                    <Typography>{props.language}</Typography>
                </div>
                <div>
                    <Typography className='subtitle'>Fecha de publicación: </Typography>
                    <Typography>{props.date}</Typography>
                </div>
                <div>
                    <Typography className='subtitle'>Sinópsis: </Typography>
                    <Typography>{props.summary}</Typography>
                </div>
            </div>
        </div>
    )
}


export default BookCard;
