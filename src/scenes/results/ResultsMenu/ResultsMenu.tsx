import React, { useEffect, useState } from 'react';
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
    // data: Data
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
    const [filters, setFilters] = useState<FiltersModel>({...initialFiltersModel, text: searchInput});

    useEffect(() => {
        if (searchInput !== '') _searchRequest(filters);
    }, []);

    useEffect(() => {
        if (searchInput !== '') _searchRequest(filters);
    }, [props.searchInput]);
    
    const _searchRequest = (filters: FiltersModel) => {
        setGetDataStatus(RequestStatus.LOADING);
        const results = Promise.all([
            BooksService.searchBooks(filters),
            AuthorsService.searchAuthors(filters.text),
        ])
        results
            .then((responses) => {
                setData({...data, books: responses[0].data, authors: responses[1].data});
                setFilters(filters);
                setGetDataStatus(RequestStatus.SUCCESS);
            })
            .catch((error: any) => {
                props.searchRequestErrorCallback();
                setGetDataStatus(RequestStatus.ERROR);
            });
    };


    return (
        <div className='results-menu-container'>
            <Filters
                filters={filters}
                loading={updateStatus === RequestStatus.LOADING}
                onChangeFilters={(filters: FiltersModel) => _searchRequest(filters)}
                onChangeSortBy={(sortBy: SortBy) => _searchRequest({...filters, sortBy})}
                onChangeFilterBy={(filterBy: string[]) => _searchRequest({...filters, filterBy})}
            />
            <Results
                sortBy={filters.sortBy}
                filterBy={filters.filterBy}
                data={data}
                loading={getDataStatus === RequestStatus.LOADING}
            />
        </div>
    )
}


export default withRouter(ResultsMenu);
