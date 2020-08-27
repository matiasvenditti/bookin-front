import React, { Component } from 'react'
import { List, ListItem, ListItemAvatar, ListItemText, Divider } from '@material-ui/core'

interface ProfileViewProps {
    data: {
        firstName: string,
        lastName: string,
        email: string,
        gender: string,
        photo: any,
    }
}

interface ProfileViewState {
    data: { key: string, value: string }[],
}

export default class ProfileView extends Component<ProfileViewProps, ProfileViewState> {
    constructor(props: ProfileViewProps) {
        super(props);
        this.state = {
            data: [
                { key: 'Nombre', value: props.data.firstName + ' ' + props.data.lastName },
                { key: 'Mail', value: props.data.email },
                { key: 'Género', value: props.data.gender },
                { key: 'Foto', value: props.data.photo },
            ]
        }
    }
    render() {
        const { data } = this.state;
        return (
            <List className='card-container'>
                {data.map((item, i) => ([
                    <ListItem>
                        <ListItemText primary={item.value} secondary={item.key} />
                    </ListItem>,
                    (i !== data.length - 1) && <Divider />,
                ]))}
            </List>
        )
    }
}
