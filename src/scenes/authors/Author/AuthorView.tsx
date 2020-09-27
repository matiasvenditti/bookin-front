import React, { Component } from "react";
import {
    Avatar,
    Badge,
    Grid,
    Typography
} from "@material-ui/core";
import { dummyAvatar } from "../../../assets";
import { DateUtils } from "../../../utils";
import { Flag } from "../../../components";
import { Book } from "../../../model";
import BookDisplay from "../../../components/BookDisplay/BookDisplay";
import classes from "./AuthorView.module.css";
import { Author } from "../../../model/Author";


interface AuthorViewProps {
    books: Book[],
    data: Author,
    error: boolean,
}

interface AuthorViewState {
    books: Book[],
    data: Author,
}

export default class AuthorView extends Component<AuthorViewProps, AuthorViewState> {
    constructor(props: AuthorViewProps) {
        super(props);
        this.state = {
            books: this.props.books,
            data: {
                id: props.data.id,
                firstName: props.data.firstName,
                lastName: props.data.lastName,
                nationality: props.data.nationality,
                birthday: props.data.birthday,
                photo: props.data.photo,
            }
        }
    }

    render() {
        //const { books } = this.state;
        const { photo, firstName, lastName, nationality, birthday } = this.state.data;
        const { error } = this.props;
        const books = this.props.books.sort((a, b) => b.stars - a.stars).slice(0, 4);
        const listBooks = books.map((books, i) => (
            <Grid item xs={3} key={i}>
                <BookDisplay book={books} crown={i === 0} author={`${firstName} ${lastName}`}/>
            </Grid>
        ));

        if (error) {
            return (
                <div>
                    <Typography
                        align='center'
                        color='error'
                        variant='h6'
                    >
                        Hubo un error al obtener los datos del Autor
                    </Typography>
                </div>
            );
        } else {
            return (
                <div>
                    <div className={classes.container} >
                        <div className='image-container'>
                            <Badge
                                color='primary'
                                overlap='circle'
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                className={'avatar-image'}
                            >
                            <Avatar src={`data:image/jpeg;base64,${photo}` || dummyAvatar} />
                            </Badge>
                            </div>
                            <div className={classes.titleContainer}>
                                <Typography variant='h4'>{firstName + ' ' + lastName} </Typography>
                                <div className={classes.birthdayContainer}>
                                    <Flag code={nationality} height='24' />
                                    <Typography className='nationality'>{DateUtils.formatDateTime(birthday.toString())}</Typography>
                                </div>
                            </div>
                    </div>
                    <div className={classes.marginTop}>
                        <Grid alignItems='center' container spacing={2} >
                            {listBooks}
                        </Grid>
                    </div>
                </div>
            )
        }
    }
}
