import React from 'react'
import { Button, Avatar, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@material-ui/core';
import Loader from '../../Loader/Loader';


interface ConfirmPhotoModalProps {
    open: boolean,
    photo: any,
    loading: boolean,
    handleCancel(): void,
    handleConfirm(): void,
}

const ConfirmPhotoModal = (props: ConfirmPhotoModalProps) => {
    const {
        open,
        photo,
        loading,
    } = props;

    return (
        <Dialog
            open={open}
            onClose={props.handleCancel}
        >
            <DialogTitle>Confirmar cambio de foto</DialogTitle>
            <DialogContent className='dialog-content'>
                {loading ? <Loader /> 
                    :
                    <div>
                        <Typography className='dialog-content-text'>Foto nueva:</Typography>
                        <Avatar src={photo} className='modal-avatar-image'></Avatar>
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
