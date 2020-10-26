import React, { Component, createRef } from 'react'
import { ButtonBase, Avatar, Badge } from '@material-ui/core';
import './HoverableAvatar.css';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import ConfirmPhotoModal from './ConfirmPhotoModal';


interface HoverableAvatarProps {
    src: any,
    id: string,
    maxSize: number,
    loading: boolean,
    onChange(file: File): void,
    onLoadError(): void,
}

interface HoverableAvatarState {
    photo: any,
    photoFile: any,
    modalOpen: boolean,
    fileUploaderRef: any,
}

class HoverableAvatar extends Component<HoverableAvatarProps, HoverableAvatarState> {
    constructor(props: HoverableAvatarProps) {
        super(props);
        this.state = {
            photo: null,
            photoFile: null,
            modalOpen: false,
            fileUploaderRef: createRef() as React.MutableRefObject<HTMLInputElement>,
        }
    }

    handleClick = (e: any) => {
        this.state.fileUploaderRef.current.click();
    }

    // does not cover when you upload another file with extension
    // changed
    onChangeFile = (event: any) => {
        event.stopPropagation();
        event.preventDefault();
        const { maxSize } = this.props;
        const file: File = event.target.files[0];
        if (file === undefined) return;
        if (file.size > maxSize || !['jpg', 'jpeg', 'png'].some((ext) => `image/${ext}` === file.type)) {
            this.props.onLoadError();
        } else {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                // console.log('res', this.);
                let image = new Image();
                image.src = reader.result ? reader.result.toString() : '';
                image.onload = () => {
                    if (image.width <= 480 && image.height <= 480) {
                        this.setState({
                            ...this.state,
                            photo: reader.result,
                            photoFile: file,
                            modalOpen: true
                        });
                    } else this.props.onLoadError();
                }
                image.onerror = () => {this.props.onLoadError()}
            }
            reader.onerror = () => {this.props.onLoadError()}
        }
    };

    handleModalConfirm = () => {
        this.props.onChange(this.state.photoFile);
        this.setState({...this.state, modalOpen: false});
    }

    render() {
        const {
            src,
            id,
            loading,
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
                    accept='.png, .jpg, .jpeg'
                    type='file'
                    id='profile-photo-input'
                    ref={this.state.fileUploaderRef}
                    style={{ display: "none" }}
                    onChange={this.onChangeFile}
                />
            </Badge>,
            <ConfirmPhotoModal
                key={id + '-modal'}
                open={this.state.modalOpen}
                photo={this.state.photo}
                loading={loading}
                handleCancel={() => this.setState({ ...this.state, modalOpen: false })}
                handleConfirm={this.handleModalConfirm}
            />,
        ]);
    }
}

export default HoverableAvatar;
