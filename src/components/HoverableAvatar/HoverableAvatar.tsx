import React, { Component, createRef } from 'react'
import { ButtonBase, Avatar, Badge } from '@material-ui/core';
import './HoverableAvatar.css';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import ConfirmPhotoModal from './ConfirmPhotoModal';


interface HoverableAvatarProps {
    src: any,
    id: string,
    onChange(id: string, type: string, file: any): void,
    // onError(error: any): void,
}

interface HoverableAvatarState {
    photo: any,
    modalOpen: boolean,
    fileUploaderRef: any,
}

class HoverableAvatar extends Component<HoverableAvatarProps, HoverableAvatarState> {
    constructor(props: HoverableAvatarProps) {
        super(props);
        this.state = {
            photo: null,
            modalOpen: false,
            fileUploaderRef: createRef() as React.MutableRefObject<HTMLInputElement>,
        }
    }



    handleClick = (e: any) => {
        this.state.fileUploaderRef.current.click()
    }

    onChangeFile = (event: any) => {
        event.stopPropagation();
        event.preventDefault();
        const file = event.target.files[0];
        console.log('selected file', file);
        this.setState({ ...this.state, photo: URL.createObjectURL(file), modalOpen: true });
    }

    handleModalConfirm = () => {
        this.props.onChange(this.props.id, 'photo', this.state.photo);
    }

    render() {
        const {
            src,
            id,
        } = this.props;

        return ([
            <Badge
                id={id}
                key={id}
                color='primary'
                overlap='circle'
                badgeContent={
                    <ButtonBase onClick={this.handleClick} >
                        <EditRoundedIcon />
                    </ButtonBase>
                }
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                className={'hoverable-avatar'}
            >
                <Avatar src={src} />
                <input
                    type='file'
                    id='profile-phoro-input'
                    ref={this.state.fileUploaderRef}
                    style={{ display: "none" }}
                    onChange={this.onChangeFile}
                />
            </Badge>,
            <ConfirmPhotoModal
                key={id + '-modal'}
                open={this.state.modalOpen}
                photo={this.state.photo}
                handleCancel={() => this.setState({ ...this.state, modalOpen: false })}
                handleConfirm={this.handleModalConfirm}
            />,
        ]);
    }
}

export default HoverableAvatar;
