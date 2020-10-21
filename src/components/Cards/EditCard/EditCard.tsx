import {Avatar, Button, Card, CardActions, CardContent, CardHeader, Typography} from '@material-ui/core';
import React from 'react';
import Rating from "@material-ui/lab/Rating";
import {User} from "../../../model";
import classes from './EditCard.module.css';
import { ReviewFormModel } from '../../../model/Form/ReviewFormModel';
import { NewEditReview } from '../../../model/NewEditReview';
import Input from '../../Form/Input/Input';


interface EditCardProps {
    id: number,
    index: number,
    stars: number,
    comment: string,
    reviewCreatorUserID: number,
    reviewDisplayString: string,
    reviewBookId:number,
    currentUser: User,
    editMode(): void,
    onSubmit(review: NewEditReview, id: number, key: number): void
}

interface EditCardState{
    values: ReviewFormModel,
}

class EditCard extends React.Component<EditCardProps, EditCardState> {
    MAX_CHARACTERS: number = 1000;

    constructor(props: EditCardProps){
        super(props);
        this.state = {
            values: {
                message: { value: this.props.comment, type: '', error: false, touched: true },
                rating: { value: this.props.stars, type: 'number', error: false, touched: true },
            },
        }
    }

    handleSubmit = () => {
        let values: NewEditReview = {
            stars: this.state.values.rating.value,
            comment: this.state.values.message.value,
        }
        this.props.onSubmit(values, this.props.id, this.props.index);
    }

    handleInput = (id: string, type: string, value: string) => {
        const error = value.length > this.MAX_CHARACTERS;
        this.setState({
            values: {
            ...this.state.values,
            [id]: { value, type, error: error, touched: true }
            },
        });    
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
            <Card className={classes.reviewCardContainer}
                  style={{backgroundColor: '#F6F6F7', padding: '5'}}>
                <form>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" className={classes.reviewItemAvatar}>
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
                            value={this.state.values.rating.value} 
                            precision={0.5}                                 
                            onChange={(event, newValue) => {
                                this.handleRateChange(newValue);
                            }}/>
                    }

                    />
                    <CardContent className={classes.reviewCardBody}>
                    <Input
                            label='Escriba aqui (max 1000 caracteres)'
                            variant='filled'
                            id='message'
                            type='text'
                            value={this.state.values.message.value}
                            onChange={this.handleInput}
                            error={this.state.values.message.error}
                            multiline={true}
                            errorText={this.state.values.message.error ? 'Excede el limite de caracteres' : ''}
                        />
                    </CardContent>
                </form>
                <CardActions>
                    <div className={classes.paddingEdit}>
                        <Button title='Editar' color='primary' variant='contained' disabled={!(this.state.values.rating.touched) && !(this.state.values.message.error)} onClick={this.handleSubmit} />
                        <Button title='Cancelar' color='primary' variant='contained' onClick={this.props.editMode} />
                    </div>
                </CardActions>
            </Card>
            )        
    }       
}


export default EditCard;