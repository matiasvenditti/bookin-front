import { Card } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import React from "react";
import { Button, Input } from '../../../components/Form';
import { Book, NewReview, User } from "../../../model";
import { ReviewFormModel } from "../../../model/Form/ReviewFormModel";
import classes from "./CreateReviewForm.module.css";


interface CreateReviewFormProps {
    onSubmit(revew: NewReview): void,
    user: User,
    book: Book,
}

interface CreateReviewFormState{
    values: ReviewFormModel,
}

export default class CreateReviewForm extends React.Component<CreateReviewFormProps, CreateReviewFormState>{
    
    constructor(props: CreateReviewFormProps){
        super(props);
        this.state = {
            values: {
                message: { value: '', type: '', error: false, touched: false },
                rating: { value: 0, type: 'number', error: false, touched: false },

            }
        }
    }

    handleSubmit = () => {
        let values: NewReview = {
            comment: this.state.values.message.value,
            stars: this.state.values.rating.value,
            created_at: new Date(),
            user: this.props.user,
            book: this.props.book
        }
        this.props.onSubmit(values);
    }

    handleInput = (id: string, type: string, value: string) => {
        if (value.length <= 10000){
            this.setState({
                values: {
                    ...this.state.values,
                    [id]: { value, type, error: false, touched: true }
                },
            });
        }
        console.log(this.state.values.message)
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
            <Card style={{backgroundColor: '#F6F6F7', padding: '5'}}>
                <form>
                    <div className={classes.rating}> 
                        <Rating
                            name="simple-controlled"
                            value={this.state.values.rating.value}
                            onChange={(event, newValue) => {
                                this.handleRateChange(newValue);
                            }}
                        />
                    </div>
                    <Input
                        label='Escriba aqui (max 1000 caracteres)'
                        id='message'
                        type='text'
                        value={this.state.values.message.value}
                        onChange={this.handleInput}
                        error={this.state.values.message.error}
                        errorText={this.state.values.message.error ? 'Caracteres invalidos' : ''}
                        required
                    />
                    <div className={classes.button}>
                        <Button title='Crear Reseña' color='primary' variant='contained' disabled={!(this.state.values.rating.touched)} onClick={this.handleSubmit} />
                    </div>
                </form>
            </Card>
        )
    }
}