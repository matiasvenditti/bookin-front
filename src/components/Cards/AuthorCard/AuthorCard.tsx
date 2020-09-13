import { Avatar, Typography } from '@material-ui/core';
import React from 'react';
import { dummyAvatar } from '../../../assets';
import './AuthorCard.css';


interface AuthorCardProps {
    photo: any,
    firstname: string,
    lastname: string,
    id: string,
}

const AuthorCard = (props: AuthorCardProps) => {
    return (
        <div className='author-card-container' key={props.id}>
            <Avatar src={props.photo || dummyAvatar} />
            <Typography>{props.firstname}</Typography>
            <Typography>{props.lastname}</Typography>
        </div>
    )
}


export default AuthorCard;
