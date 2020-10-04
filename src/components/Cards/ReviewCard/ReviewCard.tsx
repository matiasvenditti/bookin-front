import {Avatar, Button, Card, CardContent, CardHeader, Typography} from '@material-ui/core';
import React from 'react';
import './ReviewCard.css';
import Rating from "@material-ui/lab/Rating";
import {User} from "../../../model";
import ButtonGroup from "@material-ui/core/ButtonGroup";


interface ReviewCardProps {
    id: number,
    stars: number,
    comment: string,
    reviewCreatorUserID: number,
    reviewCreatorFirstName: string,
    reviewCreatorLastName: string,
    currentUser: User,
    isAdmin: boolean,
    handleEdit():void,
    handleDelete(id:number):void,
}

const ReviewCard = (props: ReviewCardProps) => {
    const {isAdmin, reviewCreatorUserID, currentUser} = props;

    if (currentUser.id === reviewCreatorUserID || isAdmin) {
        return (
            <Card className={'review-card-container'}
                  style={{backgroundColor: '#F6F6F7', padding: '5'}}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={'review-item.avatar'}>
                            {/*{props.reviewCreatorUser.photo}*/}
                        </Avatar>
                    }
                    title={
                        <Typography
                            variant="h6"
                            style={{color: 'black', display: 'flex', alignItems: 'center'}}
                        >
                            {props.reviewCreatorFirstName + ' ' + props.reviewCreatorLastName + ' '}

                            <div className="button-container">
                                <ButtonGroup variant="contained" color="secondary"
                                             aria-label="contained primary button group" className={'button-group'}>
                                    <Button>Editar</Button>
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
                        <Avatar aria-label="recipe" className={'review-item.avatar'}>
                            {/*{props.reviewCreatorUserID.photo}*/}
                        </Avatar>
                    }
                    title={
                        <Typography
                            variant="h6"
                            style={{color: 'black', display: 'flex', alignItems: 'center'}}
                        >
                            {props.reviewCreatorFirstName + ' ' + props.reviewCreatorLastName + ' '}


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
