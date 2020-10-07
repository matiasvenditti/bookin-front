import { Card, Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import React from "react";
import { Button, Input } from '../../../components/Form';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { Book, NewReview, User } from "../../../model";
import { ReviewFormModel } from "../../../model/Form/ReviewFormModel";
import { validateInput } from "../../../utils";
import { TheatersOutlined } from "@material-ui/icons";


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
                message: { value: '', type: 'alphanumeric', error: false, touched: false },
                rating: { value: 0, type: 'number', error: false, touched: false },

            }
        }
    }

    handleSubmit = () => {
        let values: NewReview = {
            comment: this.state.values.message.value,
            stars: this.state.values.rating.value,
            created_at: new Date,
            user: this.props.user,
            book: this.props.book
        }
        this.props.onSubmit(values);
    }

    handleInput = (id: string, type: string, value: string) => {
        const error = !validateInput(type, value);
        this.setState({
            values: {
                ...this.state.values,
                [id]: { value, type, error, touched: true }
            },
        });
    } 

    handleRateChange = (value: number|null) => {
        const error = !validateInput(this.state.values.rating.type, value);
        this.setState({
            values: {
                ...this.state.values,
                rating: {value, type: 'number', error, touched: true}
            }
        });
    }

    render() {
        return (
            <Card>
                <form>
                    <Rating
                        name="simple-controlled"
                        value={this.state.values.rating.value}
                        onChange={(event, newValue) => {
                            this.handleRateChange(newValue);
                        }}
                    />
                    <Input
                        label='Escriba aqui'
                        id='message'
                        type='text'
                        value={this.state.values.message.value}
                        onChange={this.handleInput}
                        error={this.state.values.message.error}
                        errorText={this.state.values.message.error ? 'Caracteres invalidos' : ''}
                        required
                    />
                    <Button title='Crear Reseña' color='primary' variant='contained' disabled={!(this.state.values.message.touched || this.state.values.rating.touched)} onClick={this.handleSubmit} />
                </form>
            </Card>
        )
    }
}