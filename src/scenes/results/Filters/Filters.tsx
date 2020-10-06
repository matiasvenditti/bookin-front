// filters
import React, { useState } from 'react';
import { IconButton, Typography } from '@material-ui/core';
import classes from './Filters.module.css';
// tag
import CloseIcon from '@material-ui/icons/Close';
import { Filters as FiltersModel } from '../../../model/results/Filters';
import { MultiCheckbox } from '../../../components/Form/MultiCheckbox/MultiCheckbox';
import { SortBy } from '../../../model/results/SortBy';
import { CountriesSelect, Select } from '../../../components/Form';
import { allBookGenres, allLanguages } from '../../../utils/consts';


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
    const [localFilters, setLocalFilters] = useState<FiltersModel>(filters);
    const [sortBy, setSortBy] = useState<string>(SortBy.alphabeticAsc);
    const [filterBy, setFilterBy] = useState<string[]>([]);

    const handleChangeFilters = (id: keyof FiltersModel, value: any) => {
        // const key = Object.keys(filters).find((key) => key === id) || 'query';
        if (filters[id].includes(value)) {
            console.log(id, value, '[-]');
        } else {
            console.log(id, value, '[+]');
        }
    };

    const renderTags = () => {
        let results: {id: keyof FiltersModel, value: string}[] = [];
        if (props.filters.text) results.push({id: 'text', value: props.filters.text});
        results = results.concat(
            ...props.filters.nationalities.map((nationality: string) => ({id: 'nationalities',  value: nationality})) as {id: keyof FiltersModel, value: string}[],
            ...props.filters.bookGenres.map((bookGenre: string) => ({id: 'bookGenres',  value: bookGenre})) as {id: keyof FiltersModel, value: string}[],
            ...props.filters.languages.map((language: string) => ({id: 'languages',  value: language})) as {id: keyof FiltersModel, value: string}[],
        )
        if (results.length === 0) {
            return (
                <div className={classes.tagsContainer}>
                    <Typography className={classes.noTags}>No hay tags</Typography>
                </div>
            );
        } else {
            return (
                <div className={classes.tagsContainer}>
                    {results.map((tag) => (
                        <Tag
                            onClose={() => handleChangeFilters(tag.id, tag.value)}
                            id={tag.id}
                            value={tag.value}
                            loading={loading}
                        />
                    ))}
                </div>
            );
        }
    };

    return (
        <div className={classes.filtersContainer}>
            {renderTags()}
            <Typography className={classes.subtitle} variant='h5'>Ordenar por</Typography>
            <Select
                label=''
                id='sortBy'
                value={sortBy}
                options={Object.values(SortBy)}
                disabled={loading}
                onChange={(id, type, value) => setSortBy(value)}
            />
            <Typography className={classes.subtitle} variant='h5'>Filtrar por</Typography>
            <MultiCheckbox
                id='filter-by'
                options={['Solo libros', 'Solo autores']}
                selected={filterBy}
                singleSelect
                disabled={loading}
                onChange={(id, type, value) => setFilterBy(value)}
            />
            <Typography className={classes.subtitle} variant='h5'>Nacionalidad</Typography>
            <CountriesSelect
                value={localFilters.nationalities}
                placeholder='Nacionalidad'
                id='nationalities-select'
                onChange={(id, type, value) => null}
                disabled={loading}
                error={false}
                errorText={''}
            />
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
            ))} */}
            <Typography className='subtitle' variant='h5'>Géneros</Typography>
            <MultiCheckbox
                id='bookGenres'
                options={allBookGenres}
                selected={localFilters.bookGenres}
                onChange={(id, type, value) => setLocalFilters({...localFilters, bookGenres: value})}
            />
            {/* {allGenres.map((genre, i) => (
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
            <Typography className={classes.subtitle} variant='h5'>Idiomas</Typography>
            <MultiCheckbox
                id='languages'
                options={allLanguages}
                selected={localFilters.languages}
                onChange={(id, type, value) => setLocalFilters({...localFilters, languages: value})}
            />
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
