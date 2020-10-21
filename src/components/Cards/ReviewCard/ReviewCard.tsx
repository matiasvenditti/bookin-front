import {Avatar, Button, Card, CardContent, CardHeader, Link, Typography} from '@material-ui/core';
import React from 'react';
import Rating from "@material-ui/lab/Rating";
import {User} from "../../../model";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import './ReviewCard.css';


interface ReviewCardProps {
    id: number,
    stars: number,
    comment: string,
    reviewCreatorUserID: number,
    reviewDisplayString: string,
    reviewBookId:number,
    currentUser: User,
    handleEdit():void,
    handleDelete(id:number):void,
    editMode(): void
}

const ReviewCard = (props: ReviewCardProps) => {
    const {reviewCreatorUserID, currentUser, reviewBookId,reviewDisplayString} = props;

 
    if (currentUser.id === reviewCreatorUserID) {
        return (
            <Card className={'review-card-container'}
                  style={{backgroundColor: '#F6F6F7', padding: '5'}}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={'review-item-avatar'}>
                            {reviewDisplayString.substr(0,2)}
                        </Avatar>
                    }
                    title={
                        <Typography
                            variant="h6"
                            style={{color: 'black', display: 'flex', alignItems: 'center'}}
                        >
                            <Link href={`/books/${reviewBookId}`} color="inherit">
                            {props.reviewDisplayString}
                            </Link>

                            <div className="button-container">
                                <ButtonGroup variant="contained" color="secondary"
                                             aria-label="contained primary button group" className={'button-group'}>
                                    <Button onClick={() => props.editMode()}>Editar</Button>
                                    <Button onClick={() => props.handleDelete(props.id)}>Eliminar</Button>
                                </ButtonGroup>
                            </div>
                        </Typography>
                    }
                    subheader={<Rating name="read-only" value={props.stars} precision={0.5}
                                       readOnly/>}

                />
                <CardContent className={'review-card-body'}>
                    <Typography variant="body1" color="textPrimary"
                                component="p">
                        {props.comment}
                    </Typography>
                </CardContent>
            </Card>
        )
    } else {
        return (
            <Card className={'review-card-container'}
                  style={{backgroundColor: '#F6F6F7', padding: '5'}}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={'review-item.avatar'} style={{width: 50,height: 50}}>
                            {props.reviewDisplayString.substr(0,2)}
                        </Avatar>
                    }
                    title={
                        <Typography
                            variant="h6"
                            style={{color: 'black', display: 'flex', alignItems: 'center'}}
                        >
                            {props.reviewDisplayString}


                        </Typography>}
                    subheader={<Rating name="read-only" value={props.stars} precision={0.5}
                                       readOnly/>}

                />
                <CardContent className={'review-card-body'}>
                    <Typography noWrap variant="body1" color="textPrimary"
                                component="p">
                        {props.comment}
                    </Typography>
                </CardContent>
            </Card>
        )
    }
}




export default ReviewCard;
