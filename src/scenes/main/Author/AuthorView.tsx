import React, {Component} from "react";
import Loader from "../../../components/Loader/Loader";
import {
    Card,
    Typography
} from "@material-ui/core";


interface AuthorViewProps {
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
    data: { key: string, value: string}[],
}

export default class AuthorView extends Component<AuthorViewProps, AuthorViewState> {
    constructor(props: AuthorViewProps) {
        super(props);
        this.state = {
            data: [
                { key: 'Name', value: props.data.firstName + ' ' + props.data.lastName},
                { key: 'Nationality', value: props.data.nationality },
                { key: 'Birthday', value: props.data.birthday},
            ]
        }
    }
    render() {
        const { data } = this.state;
        const { loading, error } = this.props;
        if (loading) {
            return (
                <div className='author-view-container'>
                    <Loader />
                </div>
            );
        } else if (error) {
            return (
                <div className='author-view-container'>
                    <Typography color='error' variant='h6'>Hubo un error al obtener los datos del usuario</Typography>
                </div>
            )
        } else {
            return (
                <div>
                    <Card>
                        {/* TODO DISPLAY BOOKS */}
                    </Card>
                </div>

            )
        }
    }
}
