// filters
import React from 'react';
import { IconButton, Typography } from '@material-ui/core';
import classes from './Filters.module.css';
// tag
import CloseIcon from '@material-ui/icons/Close';
import { Filters as FiltersModel } from '../../../model/results/Filters';
import { MultiCheckbox } from '../../../components/Form/MultiCheckbox/MultiCheckbox';
import { SortBy } from '../../../model/results/SortBy';
import { RequestStatus } from '../../../model/consts/RequestStatus';
import { Select } from '../../../components/Form';


interface FiltersProps {
    filters: FiltersModel,
    loading: boolean,
    onSubmit(filters: FiltersModel): void,
}

const Filters = (props: FiltersProps) => {
    const {
        filters,
        loading,
    } = props;

    const handleChangeFilters = (id: keyof FiltersModel, value: any) => {
        // const key = Object.keys(filters).find((key) => key === id) || 'query';
        if (filters[id].includes(value)) {
            console.log(id, value, '[-]');
        } else {
            console.log(id, value, '[+]');
        }
    };

    const getTags = () => {
        let results: {id: keyof FiltersModel, value: string}[] = [
            {id: 'text', value: props.filters.text},
            {id: 'sortBy', value: props.filters.sortBy},
            ...props.filters.nationalities.map((nationality: string) => ({id: 'nationalities',  value: nationality})) as {id: keyof FiltersModel, value: string}[],
            ...props.filters.bookGenres.map((bookGenre: string) => ({id: 'bookGenres',  value: bookGenre})) as {id: keyof FiltersModel, value: string}[],
            ...props.filters.languages.map((language: string) => ({id: 'languages',  value: language})) as {id: keyof FiltersModel, value: string}[],
        ];
        return results;
    };

    return (
        <div className='filters-container'>
            <div className='tags-container'>
                {getTags().map((tag) => (
                    <Tag
                        onClose={() => handleChangeFilters(tag.id, tag.value)}
                        id={tag.id}
                        value={tag.value}
                        loading={loading}
                    />
                ))}
            </div>
            <Typography className='subtitle' variant='h5'>Ordenar por</Typography>
            <Select
                label=''
                id='sortBy'
                value={filters.sortBy}
                options={Object.values(SortBy)}
                disabled={loading}
                onChange={(id, type, value) => handleChangeFilters('sortBy', value)}
            />
            <Typography className='subtitle' variant='h5'>Filtrar por</Typography>
            {/* <Select
                id='sort-by-select'
                value='Alfabético - A-Z'
                options={Object.values(SortBy)}
                onChange={(id, type, value) => handleChangeSortBy(value)}
            /> */}
            {/* <Checkbox
                id='only-books-checkbox'
                label='Solo libros'
                checked={onlyBooks}
                type='checkbox'
                error={false}
                errorText={''}
                onChange={(id, type, value) => handleCheckboxChange(value, onlyAuthors)}
            />
            <Checkbox
                id='only-authors-checkbox'
                label='Solo autores'
                checked={onlyAuthors}
                type='checkbox'
                error={false}
                errorText={''}
                onChange={(id, type, value) => handleCheckboxChange(onlyBooks, value)}
            /> */}
            <Typography className='subtitle' variant='h5'>Nacionalidad</Typography>
            {/* {allCountries.map((country, i) => (
                <div className='country-checkbox-container'>
                    <Checkbox
                        id={'country-checkbox-checkbox-' + i}
                        checked={countries.some((c) => c === country)}
                        type='checkbox'
                        error={false}
                        errorText=''
                        onChange={(id, type, value) => handleChangeCountries(value)}
                    />
                    <Typography>{country}</Typography>
                </div>
            ))}
            <Typography className='subtitle' variant='h5'>Géneros</Typography>
            {allGenres.map((genre, i) => (
                <div className='genre-checkbox-container'>
                    <Checkbox
                        id={'genre-checkbox-checkbox-' + i}
                        checked={genres.some((c) => c === genre)}
                        type='checkbox'
                        error={false}
                        errorText=''
                        onChange={(id, type, value) => handleChangeGenres(value)}
                    />
                    <Typography>{genre}</Typography>
                </div>
            ))} */}
            <Typography className='subtitle' variant='h5'>Idiomas</Typography>
            {/* {allLanguages.map((language, i) => (
                <div className='language-checkbox-container'>
                    <Checkbox
                        id={'language-checkbox-checkbox-' + i}
                        checked={countries.some((c) => c === language)}
                        type='checkbox'
                        error={false}
                        errorText=''
                        onChange={(id, type, value) => handleChangeLanguages(value)}
                    />
                    <Typography>{language}</Typography>
                </div>
            ))} */}

        </div>
    )
}


interface TagProps {
    onClose(): void,
    id: string,
    value: string,
    loading: boolean,
}

const Tag = (props: TagProps) => {
    const { id, value, loading } = props
    return (
        <div className={classes.tagContainer} key={id}>
            <Typography>{value}</Typography>
            <IconButton size='small'>
                <CloseIcon onClick={loading ? undefined : props.onClose} />
            </IconButton>
        </div>
    );
};


export default Filters;
