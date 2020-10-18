import {Avatar, Button, Card, CardContent, CardHeader, Link, Typography} from '@material-ui/core';
import React from 'react';
import Rating from "@material-ui/lab/Rating";
import {User} from "../../../model";
import './ReviewCard.css';
import { ReviewFormModel } from '../../../model/Form/ReviewFormModel';


interface EditCardProps {
    id: number,
    stars: number,
    comment: string,
    reviewCreatorUserID: number,
    reviewDisplayString: string,
    reviewBookId:number,
    currentUser: User,
    isAdmin: boolean,
    editMode(): void
}

interface EditCardState{
    values: ReviewFormModel,

}

class EditCard extends React.Component<EditCardProps, EditCardState> {

    constructor(props: EditCardProps){
        super(props);
        this.state = {
            values: {
                message: { value: '', type: '', error: false, touched: false },
                rating: { value: 0, type: 'number', error: false, touched: false },

            }
        }
    }

    handleRateChange = (value: number|null) => {
        this.setState({
            values: {
                ...this.state.values,
                rating: {value, type: 'number', error: false, touched: true}
            }
        });
    }

    render() {
    
        return (
            (this.props.currentUser.id === this.props.reviewCreatorUserID || this.props.isAdmin) ?
            <Card className={'review-card-container'}
                  style={{backgroundColor: '#F6F6F7', padding: '5'}}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={'review-item-avatar'}>
                            {this.props.reviewDisplayString.substr(0,2)}
                        </Avatar>
                    }
                    title={
                        <Typography
                            variant="h6"
                            style={{color: 'black', display: 'flex', alignItems: 'center'}}
                        >
                            <Link href={`/books/${this.props.reviewBookId}`} color="inherit">
                            {this.props.reviewDisplayString}
                            </Link>
                        </Typography>
                    }
                    subheader={<Rating name="read-only" value={this.props.stars} precision={0.5}
                                       readOnly/>}

                />
                <CardContent className={'review-card-body'}>
                    <Typography variant="body1" color="textPrimary"
                                component="p">
                        {this.props.comment}
                    </Typography>
                </CardContent>
            </Card>
        
        :
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
                            {this.props.reviewDisplayString}


                        </Typography>}
                    subheader={<Rating 
                        name="simple-controlled"                        
                        value={this.props.stars} 
                        precision={0.5}                                 
                        onChange={(event, newValue) => {
                            this.handleRateChange(newValue);
                        }}/>
                }

                />
                <CardContent className={'review-card-body'}>
                    <Typography noWrap variant="body1" color="textPrimary"
                                component="p">
                        {this.props.comment}
                    </Typography>
                </CardContent>
            </Card>
            )        
    }       
}


export default EditCard;