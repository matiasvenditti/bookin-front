import {EditVar} from "../../../model/consts/EditVar";
import React, {Component} from "react";
import translateGender from "../../../utils/translateGender";
import Loader from "../../../components/Loader/Loader";
import {Button, Divider, IconButton, List, ListItem, ListItemText, Typography} from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

interface AuthorViewProps {
    data: {
        firstName: string,
        lastName: string,
        email: string,
        nationality: string,
        photo: any,
    },
    loading: boolean,
    error: boolean,
}

interface AuthorViewState {
    data: { key: string, value: string }[],
}

export default class AuthorView extends Component<AuthorViewProps, AuthorViewState> {
    constructor(props: AuthorViewProps) {
        super(props);
        this.state = {
            data: []

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
                </div>
            )
        }
    }
}
