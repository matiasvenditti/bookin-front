import React from 'react';
import { 
    Button,
    Typography, 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
} from '@material-ui/core';
import { Loader } from '../../../components';


interface DeleteAuthorModalProps {
    open: boolean,
    loading: boolean,
    onConfirm(): void,
    onCancel(): void,
}

const DeleteAuthorModal = (props: DeleteAuthorModalProps) => {
    const { open, loading } = props;
    return (
        <div>
            <Dialog open={open}>
                <DialogTitle>Atención</DialogTitle>
                {loading ?
                    <DialogContent><Loader /></DialogContent>
                    :
                    <DialogContent>
                        <Typography className='typography-bold'>¿Está seguro que quiere eliminar este autor?</Typography>
                        <Typography>Todos sus datos y reseñas se eliminarán. Esta acción no podrá revertirse.</Typography>
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


export default DeleteAuthorModal;