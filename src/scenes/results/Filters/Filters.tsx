// filters
import React from 'react';
import { Chip, Typography } from '@material-ui/core';
import classes from './Filters.module.css';
// tag
import { Filters as FiltersModel } from '../../../model/results/Filters';
import { SortBy } from '../../../model/results/SortBy';
import { CountriesSelect, RadioGroup, Select } from '../../../components/Form';
import { ConstsUtils } from '../../../utils';
import Flag from 'react-world-flags';
import { FilterBy } from '../../../model/results/FilterBy';
import { MultiCheckbox } from '../../../components/Form/MultiCheckbox/MultiCheckbox';
import { allBookGenres, allFilterBys, allLanguages } from '../../../utils/consts';



interface FiltersProps {
    filters: FiltersModel,
    loading: boolean,
    onChangeFilters(filters: FiltersModel): void,
    onChangeSortBy(value: SortBy): void,
    onChangeFilterBy(value: FilterBy): void,
}

const Filters = (props: FiltersProps) => {
    const {
        filters,
        loading,
    } = props;

    const handleClickTag = (id: keyof FiltersModel, value: any) => {
        switch (id) {
            case 'text':
                props.onChangeFilters({...filters, text: ''});
                break;
            // case sortBy: nope! passed with other props
            // case filterBy: nope! passed with other props
            case 'nationalities':
                props.onChangeFilters({
                    ...filters,
                    nationalities: filters.nationalities.filter((nationality) => nationality !== value)
                });
                break;
            case 'bookGenres':
                props.onChangeFilters({
                    ...filters,
                    bookGenres: filters.bookGenres.filter((bookGenre) => bookGenre !== value)
                });
                break;
            case 'languages':
                props.onChangeFilters({
                    ...filters,
                    languages: filters.languages.filter((language) => language !== value)
                });
                break;
            default: 
                console.warn('handle change filters defaulted');
                break; // do nothimg
        }
    }

    const renderTags = () => {
        let tags: {id: keyof FiltersModel, value: string}[] = [];
        if (props.filters.text) tags.push({id: 'text', value: props.filters.text});
        tags = tags.concat(
            ...props.filters.nationalities.map((nationality: string) => ({id: 'nationalities',  value: nationality})) as {id: keyof FiltersModel, value: string}[],
            ...props.filters.bookGenres.map((bookGenre: string) => ({id: 'bookGenres',  value: bookGenre})) as {id: keyof FiltersModel, value: string}[],
            ...props.filters.languages.map((language: string) => ({id: 'languages',  value: language})) as {id: keyof FiltersModel, value: string}[],
        )
        if (tags.length === 0) {
            return (
                <div className={classes.tagsContainer}>
                    <Typography className={classes.noTags}>No hay tags</Typography>
                </div>
            );
        } else {
            return (
                <div className={classes.tagsContainer}>
                    {tags.map((tag) => {
                        if (tag.id === 'nationalities') {
                            return (
                                <Chip
                                    key={'tags-chip-' + tag.id}
                                    avatar={<Flag code={tag.value} />}
                                    label={ConstsUtils.getCountryName(tag.value)}
                                    onDelete={() => handleClickTag(tag.id, tag.value)}
                                    style={{marginRight: '8px'}}
                                />
                            );
                        } else {
                            return (
                                <Chip
                                    key={'tags-chip-' + tag.id}
                                    label={tag.value}
                                    onDelete={() => handleClickTag(tag.id, tag.value)}
                                    style={{marginRight: '8px'}}
                                />
                            );
                        }
                    })}
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
                value={filters.sortBy}
                options={Object.values(SortBy)}
                disabled={loading}
                onChange={(id, type, value: SortBy) => props.onChangeSortBy(value)}
            />
            <Typography className={classes.subtitle} variant='h5'>Filtrar por</Typography>
            <RadioGroup
                title=''
                id='filter-by-radio-group'
                key='filter-by-radio-group'
                type='radio-group'
                onChange={(id, type, value) => props.onChangeFilterBy(value)}
                valueId={filters.filterBy}
                options={allFilterBys}
                error={false}
                errorText={''}
            />
            <Typography className={classes.subtitle} variant='h5'>Nacionalidad</Typography>
            <CountriesSelect
                value={filters.nationalities}
                placeholder='Nacionalidad'
                id='nationalities-select'
                disabled={loading}
                error={false}
                errorText={''}
                onChange={(id, type, value) => props.onChangeFilters({...filters, nationalities: value})}
                multiple
            />
            <Typography className={classes.subtitle} variant='h5'>Géneros</Typography>
            <MultiCheckbox
                id='bookGenres'
                options={allBookGenres}
                selected={filters.bookGenres}
                onChange={(id, type, value) => props.onChangeFilters({...filters, bookGenres: value})}
            />
            <Typography className={classes.subtitle} variant='h5'>Idiomas</Typography>
            <MultiCheckbox
                id='languages'
                options={allLanguages}
                selected={filters.languages}
                onChange={(id, type, value) => props.onChangeFilters({...filters, languages: value})}
            />
        </div>
    )
}


export default Filters;
