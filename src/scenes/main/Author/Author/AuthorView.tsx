import React, { Component } from "react";
import {
    Avatar,
    Badge,
    Grid,
    Typography
} from "@material-ui/core";
import { dummyAvatar } from "../../../../assets";
import Flag from "react-world-flags";
import { formatDateTime } from "../../../../utils/formateDateTime";
import { getCode } from "country-list";
import { Book } from "../../../../model/Book";
import BookDisplay from "../../../../components/BookDisplay/BookDisplay";
import classes from "./AuthorView.module.css";


interface AuthorViewProps {
    books: Book[],
    data: {
        id: number,
        firstName: string,
        lastName: string,
        nationality: string,
        birthday: any,
        photo: any,
    },
    error: boolean,
}

interface AuthorViewState {
    books: Book[],
    data: {
        id: number,
        firstName: string,
        lastName: string,
        nationality: string,
        birthday: any,
        photo: any,
    },
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
        const { photo, firstName, lastName, nationality, birthday } = this.state.data;
        const { error } = this.props;
        const books = this.props.books.sort((a, b) => b.stars - a.stars).slice(0, 4);
        const listBooks = books.map((books, index) =>
            <Grid item xs={3} key={index}>
                <BookDisplay book={books} crown={index === 0} author={firstName + ' ' + lastName} />
            </Grid> 
        );

        if (error) {
            return (
                <div>
                    <Typography align='center' color='error' variant='h6'>Hubo un error al obtener los datos del
                        Autor</Typography>
                </div>
            )
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
                            <div className='title-container'>

                                <Typography variant='h4' gutterBottom={true}>{firstName + ' ' + lastName} </Typography>

                                <Typography variant='subtitle2' className='nationality'><Flag code={getCode(nationality)}
                                    height="16" className='flag'/>{'    ' + formatDateTime(birthday)}
                                </Typography>
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
