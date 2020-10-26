import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@material-ui/core';
import {Loader} from "../../components";



interface DeleteReviewModalProps {
    open: boolean,
    loading: boolean,
    onConfirm(): void,
    onCancel(): void,
}

export const DeleteReviewModal = (props: DeleteReviewModalProps) => {
    const { open, loading } = props;
    return (
        <div>
            <Dialog open={open}>
                <DialogTitle>Atención</DialogTitle>
                {loading ?
                    <DialogContent><Loader /></DialogContent>
                    :
                    <DialogContent>
                        <Typography className='typography-bold'>¿Está seguro que quiere eliminar este reseña?</Typography>
                        <Typography>Esta acción no podrá revertirse.</Typography>
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