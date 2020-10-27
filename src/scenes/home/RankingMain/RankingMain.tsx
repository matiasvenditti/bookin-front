import { Typography } from '@material-ui/core';
import React from 'react';
import classes from './RankingMain.module.css';


const RankingMain = () => {
    return (
        <div className={classes.container}>
            <Typography align='center' variant='h4' className={classes.title}>Encontrá los mejores libros</Typography>
        </div>
    )
}


export default RankingMain;
