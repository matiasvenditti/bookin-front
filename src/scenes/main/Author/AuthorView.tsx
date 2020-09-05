import React, {Component} from "react";
import Loader from "../../../components/Loader/Loader";
import {
    Avatar,
    Badge,
    Typography
} from "@material-ui/core";
import {dummyAvatar} from "../../../assets";
import Flag from "react-world-flags";
import {formatDateTime} from "../../../utils/formateDateTime";


interface AuthorViewProps {
    books: {
        book1: string,
        book2: string,
        book3: string,
        book4: string,
    },
    data: {
        id: string,
        firstName: string,
        lastName: string,
        nationality: string,
        birthday: any,
        photo: any,
    },
    loading: boolean,
    error: boolean,
}

interface AuthorViewState {

    books: { key: string, value: string}[],
    data: {
        id: string,
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
            books: [
                { key: 'Book1', value: props.books.book1},
                { key: 'Book2', value: props.books.book2},
                { key: 'Book3', value: props.books.book3},
                { key: 'Book4', value: props.books.book4},
            ],
            data:{
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
        const {photo, firstName, lastName, nationality, birthday} = this.state.data;
        const { loading, error } = this.props;
        if (loading) {
            return (
                <div>
                    <Typography align='center'> <Loader /> </Typography>
                </div>
            );
        } else if (error) {
            return (
                <div>
                    <Typography align='center' color='error' variant='h6'>Hubo un error al obtener los datos del Autor</Typography>
                </div>
            )
        } else {
            return (
                <div>
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
                            <Avatar src={photo || dummyAvatar}/>

                        </Badge>

                        <Typography align='center' variant='h4'>{firstName + ' ' + lastName} </Typography>
                    </div>
                    <div className='subtitle-container'>
                        <Typography align='center' variant='subtitle2'><Flag code={nationality}
                                                                             height="16"/>{'    ' + formatDateTime(birthday)}
                        </Typography>
                    </div>
                </div>
            )
        }
    }
}
