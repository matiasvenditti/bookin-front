import { Avatar, Card, CardActionArea, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { dummyAvatar } from '../../../assets';
import { Author } from '../../../model/Author';
import './AuthorCard.css';


interface AuthorCardProps extends RouteComponentProps {
    key: string,
    author: Author,
    loading?: boolean,
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
    const { loading } = props;
    
    if (loading) {
        return (
            <Card className='author-card-container' key={props.key + '-' + id}>
                <Skeleton variant="circle" width={100} height={100}/>
                <Skeleton variant="text" width={100} height={25}/>
                <Skeleton variant="text" width={100} height={25}/>
            </Card>
        );
    } else {
        return (
            <Card className='author-card-container' key={props.key + '-' + id}>
                <CardActionArea onClick={() => props.history.push('/authors/' + id)}>
                    <Avatar src={`data:image/jpeg;base64,${photo}` || dummyAvatar}/>
                    <Typography>{firstName}</Typography>
                    <Typography>{lastName}</Typography>
                </CardActionArea>
            </Card>
        );
    }
};


export default withRouter(AuthorCard);
