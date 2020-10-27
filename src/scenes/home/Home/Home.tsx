import React from 'react';
import classes from './Home.module.css';
import RankingMain from '../RankingMain/RankingMain';
import RankingGenre from '../RankingGenre/RankingGenre';


interface HomeProps {
    getBooksRankingByGenreErrorCallback(): void,
}

const Home = (props: HomeProps) => {

    return (
        <div className='route-container'>
            <div className={classes.homeContainer}>
                <RankingMain/>
                <RankingGenre getErrorCallback={props.getBooksRankingByGenreErrorCallback}/>
            </div>
        </div>
    )
}


export default Home;
