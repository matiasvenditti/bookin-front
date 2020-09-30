import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Book } from '../../../model';
import { Author } from '../../../model/Author';
import { RequestStatus } from '../../../model/consts/RequestStatus';
import { Filters as FiltersModel, initialFilters as initialFiltersModel } from '../../../model/results/Filters';
import { SortBy } from '../../../model/results/SortBy';
import { AuthorsService, BooksService } from '../../../services';
import Filters from '../Filters/Filters';
import Results from '../Results/Results';
import './ResultsMenu.css';


type Data = {
    books: Book[],
    authors: Author[]
}

interface ResultsMenuProps extends RouteComponentProps {
    data: Data
    searchInput: string,
    updateStatus: RequestStatus,
    searchRequestErrorCallback(): void,
}

const ResultsMenu = (props: ResultsMenuProps) => {
    const {
        // data,
        searchInput,
        updateStatus,
    } = props;
    const [getDataStatus, setGetDataStatus] = useState(RequestStatus.NONE);
    const [data, setData] = useState<Data>({books: [], authors: []})
    const initialFilters: FiltersModel = {...initialFiltersModel, text: searchInput};

    const _searchRequest = (fitlers: FiltersModel) => {
        setGetDataStatus(RequestStatus.LOADING)
        const results = Promise.all([
            BooksService.searchBooks(fitlers),
            AuthorsService.searchAuthors(fitlers.text),
        ])
        results
            .then((response) => {
                setData({books: response[0].data, authors: response[1].data})
                setGetDataStatus(RequestStatus.SUCCESS)
            })
            .catch((error: any) => {
                props.searchRequestErrorCallback();
                setGetDataStatus(RequestStatus.ERROR)
            });
    }

    const handleSubmit = (filters: FiltersModel) => {
        _searchRequest(filters);
    }

    return (
        <div className='results-menu-container'>
            <Filters filters={initialFilters} onSubmit={handleSubmit} loading={updateStatus === RequestStatus.LOADING}/>
            <Results data={data}/>
        </div>
    )
}


export default withRouter(ResultsMenu);
