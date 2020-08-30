import React, { useState } from 'react'
import { Button, Avatar, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import Loader from '../Loader/Loader';

interface ConfirmPhotoModalProps {
    open: boolean,
    photo: any,
    handleCancel(): void,
    handleConfirm(): void,
}

const ConfirmPhotoModal = (props: ConfirmPhotoModalProps) => {
    const {
        open,
        photo,
    } = props;
    const [loading, setLoading] = useState(false);

    const convertImage = (): any => {
        if (props.photo !== null) {
            var reader = new FileReader();
            reader.onload = function (e) {
                setLoading(true);
                return (e && e.target && e.target.result);
            }
            reader.readAsDataURL(props.photo);
        }
    }
    console.log('modal', photo);
    return (
        <Dialog
            open={open}
            onClose={props.handleCancel}
        >
            <DialogTitle>Confirmar cambio de foto</DialogTitle>
            <DialogContent>
                {loading ?
                    <Loader />
                    :
                    <div>
                        Foto nueva:
                        <Avatar src={convertImage()}></Avatar>
                    </div>
                }
            </DialogContent>
            <DialogActions>
                <Button color='primary' onClick={props.handleConfirm}>Confirmar</Button>
                <Button color='secondary' onClick={props.handleCancel}>Cancelar</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmPhotoModal;
