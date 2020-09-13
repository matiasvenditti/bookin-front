import React from 'react';
import { Filters } from '../Filters/Filters';
import { Results } from '../Results/Results';
import './ResultsMenu.css';


export const ResultsMenu = () => {
    return (
        <div className='results-menu-container'>
            <Filters />
            <Results />
        </div>
    )
}
