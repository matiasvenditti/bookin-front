import React, { Component } from 'react'
import { List, ListItem, ListItemText, Divider, IconButton, Button, Typography } from '@material-ui/core'
import { genderToString } from '../../../utils/translateGender';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { EditVar } from '../../../model/consts/EditVar';
import Loader from '../../../components/Loader/Loader';
import { User } from '../../../model';


interface ProfileViewProps {
    data: User,
    loading: boolean,
    error: boolean,
    onEdit(type: EditVar): void,
    onChangePassword(): void,
    onDeleteUser(): void,
}

interface ProfileViewState {
    data: { key: string, value: string, type: EditVar }[] | null,
}

export default class ProfileView extends Component<ProfileViewProps, ProfileViewState> {
    constructor(props: ProfileViewProps) {
        super(props);
        this.state = {
            data: null,
        }
    }

    formatData = () => {
        return ([
            { key: 'Nombre', value: this.props.data.firstName + ' ' + this.props.data.lastName, type: EditVar.NAME },
            { key: 'Mail', value: this.props.data.email, type: EditVar.EMAIL },
            { key: 'Género', value: genderToString(this.props.data.gender), type: EditVar.GENDER },
        ])
    };

    render() {
        console.log('profile view', this.props.data.gender, genderToString(this.props.data.gender))
        const data = this.formatData();
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
                            <ListItem key={'profile-view-item-' + i}>
                                <ListItemText
                                    primary={item.value}
                                    secondary={item.key}
                                    key={'text-' + i}
                                />
                                <IconButton
                                    size='medium'
                                    key={'icon-button-' + i}
                                    onClick={() => this.props.onEdit(item.type)}
                                ><ChevronRightIcon key='iconn' /></IconButton>
                            </ListItem>,
                            (i !== data.length - 1) && <Divider key={'divider-' + i} />,
                        ]))}
                    </List>
                    <div className='footer-buttons-container'>
                        <Button onClick={this.props.onChangePassword}>Cambiar la contraseña</Button>
                        <Button onClick={this.props.onDeleteUser}>Eliminar cuenta</Button>
                    </div>
                </div>
            )
        }
    }
}
