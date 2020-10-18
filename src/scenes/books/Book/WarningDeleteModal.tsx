import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@material-ui/core';


interface WarningDeleteModalProps {
    open: boolean,
    onCancel(): void,
}

export const WarningDeleteModal = (props: WarningDeleteModalProps) => {
    const { open } = props;
    return (
        <div>
            <Dialog open={open}>
                <DialogTitle>Error!</DialogTitle>
                    <DialogContent>
                        <Typography className='typography-bold'>No es posible eliminar el libro, debe borrar todas las reseñas</Typography>
                    </DialogContent>
                <DialogActions>
                    <Button color='primary' variant='outlined' onClick={props.onCancel}>Cancelar</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}