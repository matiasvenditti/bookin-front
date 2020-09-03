import React, {Component} from "react";
import Loader from "../../../components/Loader/Loader";
import {
    Card,
    Typography
} from "@material-ui/core";


interface AuthorViewProps {
    data: {
        book1: string,
        book2: string,
        book3: string,
        book4: string,
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
                { key: 'Book1', value: props.data.book1},
                { key: 'Book2', value: props.data.book2},
                { key: 'Book3', value: props.data.book3},
                { key: 'Book4', value: props.data.book4},
            ]
        }
    }
    render() {
        const { data } = this.state;
        const { loading, error } = this.props;
        if (loading) {
            return (
                <div>
                    <Loader />
                </div>
            );
        } else if (error) {
            return (
                <div>
                    <Typography color='error' variant='h6'>Hubo un error al obtener los datos del Autor</Typography>
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
