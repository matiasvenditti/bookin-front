import { Avatar, Typography } from '@material-ui/core';
import React from 'react';
import { dummyAvatar } from '../../../assets';
import { Author } from '../../../model/Author';
import './AuthorCard.css';


interface AuthorCardProps {
    id: string,
    author: Author,
}

const AuthorCard = (props: AuthorCardProps) => {
    const {
        id,
        firstName,
        lastName,
        nationality,
        birthday,
        photo,
    } = props.author;
    
    return (
        <div className='author-card-container' key={props.id + '-' + id}>
            <Avatar src={photo || dummyAvatar} />
            <Typography>{firstName}</Typography>
            <Typography>{lastName}</Typography>
        </div>
    )
}


export default AuthorCard;
