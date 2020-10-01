import { Avatar, Button } from '@material-ui/core';
import React, { useState } from 'react';
import { dummyAvatar } from '../../assets';
import { PhotoUtils } from '../../utils';
import HoverableAvatar from './HoverableAvatar/HoverableAvatar';
import classes from './Photo.module.css';


interface PhotoProps {
    hoverable?: boolean,
    src: any,
    id: string,
    maxSize: number,
    onChange(file: File): void,
    onChangeAlt(id: string, type: string, value: File): void,
    onLoadError(): void,
}

export const Photo = (props: PhotoProps) => {
    const {
        hoverable,
        src,
        id,
        maxSize,
        onChange,
        onChangeAlt,
        onLoadError,
    } = props;
    const [bytearray, setBytearray] = useState<string | ArrayBuffer | null>(null)
    
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
    };

    const readFile = (file: File) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setBytearray(reader.result)
        }
    };

    if (hoverable) {
        return (
            <div className={classes.hoverableContainer}>
                <HoverableAvatar
                    src={src}
                    id={id}
                    maxSize={maxSize}
                    onChange={onChange}
                    onLoadError={onLoadError}
                />
            </div>
        );
    } else {
        return (
            <div className={classes.container}>
                <Avatar
                    className={classes.photo}
                    src={src === '' ? src : dummyAvatar}
                />
                <Button
                    fullWidth
                    variant="contained"
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
