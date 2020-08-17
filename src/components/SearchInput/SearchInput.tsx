import React, { Component } from 'react';
import { InputBase } from '@material-ui/core';
import './SearchInput.css';

export default class SearchInput extends Component {
    render() {
        return (
            <div className='search-input'>
                <InputBase/>
            </div>
        )
    }
}
