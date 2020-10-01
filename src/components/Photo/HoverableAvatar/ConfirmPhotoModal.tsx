import React from 'react'
import { Button, Avatar, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';


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

    return (
        <Dialog
            open={open}
            onClose={props.handleCancel}
        >
            <DialogTitle>Confirmar cambio de foto</DialogTitle>
            <DialogContent>
                {/* {loading ?
                    <Loader />
                    : */}
                <div>
                    Foto nueva:
                        <Avatar src={photo} className='modal-avatar-image'></Avatar>
                </div>
                {/* } */}
            </DialogContent>
            <DialogActions>
                <Button color='primary' onClick={props.handleConfirm}>Confirmar</Button>
                <Button color='secondary' onClick={props.handleCancel}>Cancelar</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmPhotoModal;
