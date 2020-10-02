import { Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import React from "react";
import { Button, Input } from '../../../components/Form';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { NewReview } from "../../../model";
import { ReviewFormModel } from "../../../model/Form/ReviewFormModel";
import { validateInput } from "../../../utils";
import { TheatersOutlined } from "@material-ui/icons";


interface CreateReviewFormProps {
    onSubmit(values: NewReview, userId: string, bookId: string): void,
    userId: string,
    bookId: string,
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
            createdAt: new Date,
            userId: this.props.userId,
            bookId: this.props.bookId
        }
        this.props.onSubmit(values);
    }

    handleInput = (value: string, type: string) => {
        const error = !validateInput(type, value);
        this.setState({
            values: {
                ...this.state.values,
                message: { value, type, error, touched: true }
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
            <form>
                <Typography component="legend">Custom empty icon</Typography>
                <Rating
                    name="simple-controlled"
                    value={this.state.values.rating.value}
                    onChange={(event, newValue) => {
                        this.handleRateChange(newValue);
                    }}
                />
                <Input
                    label='Nombre'
                    id='firstName'
                    type='text'
                    onChange={this.handleInput}
                    value={this.state.values.message.value}
                    error={this.state.values.message.error}
                    errorText={this.state.values.message.error ? 'Caracteres invalidos' : ''}
                    required
                />
                <Button title='Crear Reseña' variant='contained' disabled={!(this.state.values.message.touched || this.state.values.rating.touched)} onClick={this.handleSubmit} />
            </form>
        )
    }
}