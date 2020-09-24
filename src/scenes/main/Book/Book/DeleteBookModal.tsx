import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@material-ui/core';
import Loader from '../../../../components/Loader/Loader';


interface DeleteBookModalProps {
    open: boolean,
    loading: boolean,
    onConfirm(): void,
    onCancel(): void,
}

export const DeleteBookModal = (props: DeleteBookModalProps) => {
    const { open, loading } = props;
    return (
        <div>
            <Dialog open={open}>
                <DialogTitle>Atención</DialogTitle>
                {loading ?
                    <DialogContent><Loader /></DialogContent>
                    :
                    <DialogContent>
                        <Typography className='typography-bold'>¿Está seguro que quiere eliminar este libro?</Typography>
                        <Typography>Todos los datos del libro se eliminarán. Esta acción no podrá revertirse.</Typography>
                    </DialogContent>
                }
                <DialogActions>
                    <Button color='secondary' variant='outlined' onClick={props.onCancel}>Cancelar</Button>
                    <Button color='primary' variant='contained' onClick={props.onConfirm}>Aceptar</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
