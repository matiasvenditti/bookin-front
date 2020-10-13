import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Book } from '../../../model';
import { Author } from '../../../model/Author';
import { RequestStatus } from '../../../model/consts/RequestStatus';
import { FilterBy } from '../../../model/results';
import { Filters as FiltersModel } from '../../../model/results/Filters';
import { SortBy } from '../../../model/results/SortBy';
import { AuthorsService, BooksService } from '../../../services';
import Filters from '../Filters/Filters';
import Results from '../Results/Results';
import classes from './ResultsMenu.module.css';


const initialFilters: FiltersModel = {
    text: '',
    sortBy: SortBy.alphabeticAsc,
    filterBy: FilterBy.ambos,
    nationalities: [],
    bookGenres: [],
    languages: [],
}

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
    const [filters, setFilters] = useState<FiltersModel>({...initialFilters, text: searchInput});
    const [emptySearch, setEmptySearch] = useState(searchInput === '');

    useEffect(() => {
        if (searchInput !== '') _searchRequest({...filters, text: searchInput});
    }, [props.searchInput]);
    
    const checkSearchIsEmpty = (newFilters: FiltersModel) => {
        return (
            searchInput === '' &&
            // filters.sortBy !== SortBy.alphabeticAsc ||
            // filters.filterBy !== FilterBy.ambos ||
            newFilters.bookGenres.length === 0 &&
            newFilters.languages.length === 0 &&
            newFilters.nationalities.length === 0
        )
    }

    const _searchRequest = (newFilters: FiltersModel) => {
        // console.log('search request', newFilters)
        if (checkSearchIsEmpty(newFilters)) {
            // console.log('search is empty')
            setEmptySearch(true);
            return;
        }
        // console.log('search is NOT empty')
        setEmptySearch(false);
        setFilters(newFilters);
        setGetDataStatus(RequestStatus.LOADING);
        const results = Promise.all([
            BooksService.searchBooks(newFilters),
            AuthorsService.searchAuthorsSimple(newFilters.text),
        ])
        results
            .then((responses) => {
                setData({...data, books: responses[0].data, authors: responses[1].data});
                setGetDataStatus(RequestStatus.SUCCESS);
            })
            .catch((error: any) => {
                props.searchRequestErrorCallback();
                setGetDataStatus(RequestStatus.ERROR);
            });
    };

    // console.log('render results menu', searchInput);
    return (
        <div className={classes.resultsMenuContainer}>
            <Filters
                filters={filters}
                loading={updateStatus === RequestStatus.LOADING}
                onChangeFilters={(filters: FiltersModel) => _searchRequest(filters)}
                onChangeSortBy={(sortBy: SortBy) => setFilters({...filters, sortBy})}
                onChangeFilterBy={(filterBy: FilterBy) => setFilters({...filters, filterBy})}
            />
            <Results
                emptySearch={emptySearch}
                sortBy={filters.sortBy}
                filterBy={filters.filterBy}
                data={data}
                loading={getDataStatus === RequestStatus.LOADING}
            />
        </div>
    )
}


export default withRouter(ResultsMenu);
