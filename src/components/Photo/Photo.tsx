import { Avatar, Button } from '@material-ui/core';
import React, { useState } from 'react';
import { dummyAvatar } from '../../assets';
import { PhotoUtils } from '../../utils';
import HoverableAvatar from './HoverableAvatar/HoverableAvatar';
import classes from './Photo.module.css';
import Resizer from 'react-image-file-resizer';


interface PhotoProps {
    hoverable?: boolean,
    src: any,
    id: string,
    loading: boolean,
    onChange(file: File): void,
    onChangeAlt(id: string, type: string, value: File): void,
    onLoadError(): void,
}

export const Photo = (props: PhotoProps) => {
    const {
        hoverable,
        src,
        id,
        loading,
        onChange,
        onChangeAlt,
        onLoadError,
    } = props;
    const [bytearray, setBytearray] = useState<any>(null)
    
    const handleChange = (event: any) => {
        const file: File = event.target.files[0];
        if (file === undefined) return;
        const error: boolean = file.size >= PhotoUtils.MAX_PHOTO_SIZE;
        if (!error) {
            readFile(file);
            props.onChangeAlt(id, 'photo', file);
        } 
        // else {
        //     this.setState({ ...this.state, values: { ...this.state.values, photo: { value: null, type: 'photo', error: true, touched: true } }, formValid: false })
        // }
        resizeFileBlob(file)
            .then((response) => {
                console.log(response);
            })
    };

    const resizeFileBlob = (file: File) => new Promise<string | Blob | ProgressEvent<FileReader>>(resolve => {
        Resizer.imageFileResizer(file, 480, 480, 'JPEG', 95, 0, uri => { resolve(uri); }, 'blob');
    });

    const resizeFileBytearray = (file: File) => new Promise<string | Blob | ProgressEvent<FileReader>>(resolve => {
        Resizer.imageFileResizer(file, 480, 480, 'JPEG', 95, 0, uri => { resolve(uri); }, 'base64');
    });

    const readFile = (file: File) => {
        resizeFileBytearray(file)
            .then((response) => {
                setBytearray(response); 
            })
    };
    
    if (hoverable) {
        return (
            <div className={classes.hoverableContainer}>
                <HoverableAvatar
                    src={src}
                    id={id}
                    loading={loading}
                    maxSize={PhotoUtils.MAX_PHOTO_SIZE}
                    onChange={onChange}
                    onLoadError={onLoadError}
                />
            </div>
        );
    } else {
        // const image = (this.props.bytearray ?
        //     <img src={this.props.bytearray} width="100" height="100" alt="author" /> 
        //     :
        //     <AccountCircle color="secondary" style={{ fontSize: 100 }} />
        // );
        return (
            <div className={classes.container}>
                <Avatar
                    className={classes.photo}
                    src={bytearray || dummyAvatar }
                />
                <Button
                    fullWidth
                    variant='outlined'
                    component="label"
                    onChange={handleChange}
                    color='secondary'
                >
                    Agrega una foto
                    <input
                        accept="image/*"
                        type="file"
                        style={{ display: "none" }}
                    />
                </Button>
            </div>
        );
    }
}
