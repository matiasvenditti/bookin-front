import React from 'react';
import { CircularProgress } from '@material-ui/core';
import './Loader.css';


interface LoaderProps {
    disabled?: boolean,
    mini?: boolean,
    color?: 'primary' | 'secondary'
}

const Loader = (props: LoaderProps) => {
    const { disabled, mini, color } = props;
    return (
        <div className='loader-container'>
            {!disabled && <CircularProgress color={color || 'primary'} size={mini ? 20 : 50} />}
        </div>
    )
};


export default Loader;
