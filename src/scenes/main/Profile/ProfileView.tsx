import React, { Component } from 'react'
import { List, ListItem, ListItemText, Divider, IconButton, Button, Typography } from '@material-ui/core'
import translateGender from '../../../utils/translateGender';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { EditVar } from '../../../model/consts/EditVar';
import Loader from '../../../components/Loader/Loader';

interface ProfileViewProps {
    data: {
        firstName: string,
        lastName: string,
        email: string,
        gender: string,
        photo: any,
    },
    loading: boolean,
    error: boolean,
    onEdit(type: EditVar): void,
}

interface ProfileViewState {
    data: { key: string, value: string, type: EditVar }[],
}

export default class ProfileView extends Component<ProfileViewProps, ProfileViewState> {
    constructor(props: ProfileViewProps) {
        super(props);
        this.state = {
            data: [
                { key: 'Nombre', value: props.data.firstName + ' ' + props.data.lastName, type: EditVar.NAME },
                { key: 'Mail', value: props.data.email, type: EditVar.EMAIL },
                { key: 'Género', value: translateGender(props.data.gender), type: EditVar.GENDER },
            ]
        }
    }
    render() {
        const { data } = this.state;
        const { loading, error } = this.props;
        if (loading) {
            return (
                <div className='profile-view-container'>
                    <Loader />
                </div>
            );
        } else if (error) {
            return (
                <div className='profile-view-container'>
                    <Typography color='error' variant='h6'>Hubo un error al obtener los datos del usuario</Typography>
                </div>
            )
        } else {
            return (
                <div>
                    <List>
                        {data.map((item, i) => ([
                            <ListItem>
                                <ListItemText primary={item.key} secondary={item.value} />
                                <IconButton
                                    size='medium'
                                    onClick={() => this.props.onEdit(item.type)}
                                ><ChevronRightIcon /></IconButton>
                            </ListItem>,
                            (i !== data.length - 1) && <Divider />,
                        ]))}
                    </List>
                    <div className='footer-buttons-container'>
                        <Button onClick={() => console.log('Cambiar la contraseña button clicked')}>Cambiar la contraseña</Button>
                        <Button onClick={() => console.log('Eliminar cuenta button clicked')}>Eliminar cuenta</Button>
                    </div>
                </div>
            )
        }
    }
}
