// filters
import React, { useState } from 'react';
import { IconButton, Typography } from '@material-ui/core';
import './Filters.css';
// tag
import CloseIcon from '@material-ui/icons/Close';
import { Checkbox, Select } from '../../../components/Form';



const allSortBy = [
    'Alfabético - A-Z',
    'Alfabético - Z-A',
    'Fecha de publicación - viejo primero',
    'Fecha de publicación - nuevo primero',
    'Estrellas - mayor primero',
    'Estrellas - menor primero'
];
const allCountries = ['Argentino', 'Español', 'Uruguayo', 'Peruano'];
const allGenres = ['Fiction', 'Romance'];
const allLanguages = ['Español', 'Inglés', 'Japonés', 'Italiano'];

const initialMockData = {
    tags: ['or', 'Español'],
    sortBy: 'Alfabético - A-Z',
    onlyBooks: false,
    onlyAuthors: false,
    countries: ['Argentino', 'Peruano'],
    genres: ['Fiction', 'Romance'],
    languages: ['Español', 'Japonés'],
}

interface FiltersProps {

}

const Filters = (props: FiltersProps) => {
    const [mockData, setMockData] = useState(initialMockData);
    const {
        tags,
        sortBy,
        onlyBooks,
        onlyAuthors,
        countries,
        genres,
        languages,
    } = mockData;

    const handleTagChange = (value: string) => {
        console.log('handle tag', value)
        // props.onChangeFilters() // -> re-sends request to update results
    }

    const handleChangeSortBy = (value: string) => {
        console.log('changing sort by', value);
        // props.onChangeFilters() // -> re-sends request to update results
    }

    const handleCheckboxChange = (onlyBooks: boolean, onlyAuthors: boolean) => {
        console.log('changing checkboxes', onlyBooks, onlyAuthors);
        // props.onChangeFilters() // -> re-sends request to update results
    }

    const handleChangeCountries = (value: string) => {
        console.log('changing countries', value);
        // props.onChangeFilters() // -> re-sends request to update results
    }

    const handleChangeGenres = (value: string) => {
        console.log('changing countries', value);
        // props.onChangeFilters() // -> re-sends request to update results
    }

    const handleChangeLanguages = (value: string) => {
        console.log('changing countries', value);
        // props.onChangeFilters() // -> re-sends request to update results
    }

    return (
        <div className='filters-container'>
            <div className='tags-container'>
                {tags.map((tag: string, i: number) => (
                    <Tag
                        onClose={() => handleTagChange(tag)}
                        id={'tags-tag' + i}
                        value={tag}
                    />
                ))}
            </div>
            <Typography className='subtitle' variant='h5'>Ordenar por</Typography>
            <Select
                id='sort-by-select'
                value='Alfabético - A-Z'
                options={allSortBy}
                onChange={(id, type, value) => handleChangeSortBy(value)}
            />
            <Typography className='subtitle' variant='h5'>Filtrar por</Typography>
            <Checkbox
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
            />
            <Typography className='subtitle' variant='h5'>Nacionalidad</Typography>
            {allCountries.map((country, i) => (
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
            ))}
            <Typography className='subtitle' variant='h5'>Idiomas</Typography>
            {allLanguages.map((language, i) => (
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
            ))}

        </div>
    )
}


interface TagProps {
    onClose(): void,
    id: string,
    value: string,
}

const Tag = (props: TagProps) => {
    const { id, value } = props
    return (
        <div className='tag-container' key={id}>
            <Typography>{value}</Typography>
            <IconButton size='small'>
                <CloseIcon onClick={props.onClose} />
            </IconButton>
        </div>
    );
};


export default Filters;
