import React from 'react';
import { CircularProgress } from '@material-ui/core';
import './Loader.css';


interface LoaderProps {
    disabled?: boolean,
    mini?: boolean,
}

const Loader = (props: LoaderProps) => {
    const { disabled, mini } = props;
    return (
        <div className='loader-container'>
            {!disabled && <CircularProgress size={mini ? 20 : 50} />}
        </div>
    )
};


export default Loader;
