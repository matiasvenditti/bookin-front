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
import { allBookGenres, allFilterBys, allLanguages, allSortBys } from '../../../utils/consts';
import { KeyValue } from '../../../model';



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

    const handleClickTag = (key: string, value: any) => {
        switch (key) {
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
                break; // do nothing
        }
    }

    const renderTags = () => {
        let tags: KeyValue[] = [];
        if (filters.text) tags.push({key: 'text', value: props.filters.text});
        tags = tags.concat(
            ...filters.nationalities.map((nationality: string) => ({key: 'nationalities',  value: nationality})),
            ...filters.bookGenres.map((bookGenre: string) => ({key: 'bookGenres',  value: ConstsUtils.getBookGenreValue(bookGenre)})),
            ...filters.languages.map((language: string) => ({key: 'languages',  value: ConstsUtils.getLanguageValue(language)})),
        );
        if (tags.length === 0) {
            return (
                <div className={classes.tagsContainer}>
                    <Typography className={classes.noTags}>No hay tags</Typography>
                </div>
            );
        } else {
            return (
                <div className={classes.tagsContainer}>
                    {tags.map((tag, i) => {
                        if (tag.key === 'nationalities') {
                            return (
                                <Chip
                                    key={'tags-chip-' + tag.key + '-' + i}
                                    avatar={<Flag code={tag.value} />}
                                    label={ConstsUtils.getCountryName(tag.value)}
                                    onDelete={() => handleClickTag(tag.key, tag.value)}
                                    style={{marginRight: '8px', marginBottom: '8px'}}
                                />
                            );
                        } else {
                            return (
                                <Chip
                                    key={'tags-chip-' + tag.key + '-' + i}
                                    label={tag.value}
                                    onDelete={() => handleClickTag(tag.key, tag.value)}
                                    style={{marginRight: '8px', marginBottom: '8px'}}
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
                options={allSortBys}
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
                column
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
