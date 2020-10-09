import { FormControlLabel } from '@material-ui/core';
import React from 'react';
import { Checkbox } from '..';
import Loader from '../../Loader/Loader';
import classes from './MultiCheckbox.module.css';


interface MultiCheckboxProps {
    id: string,
    options: string[],
    selected: string[],
    disabled?: boolean,
    loading?: boolean,
    // error: boolean,
    // errorText: string,
    onChange(id: string, type: string, value: string[]): void,
}

export const MultiCheckbox = (props: MultiCheckboxProps) => {
    const {
        id,
        options,
        selected,
        disabled,
        loading,
        // error,
        // errorText,
    } = props;

    const handleChange = (value: string) => {
        if (selected.includes(value)) { // includes value -> filter it out
            props.onChange(id, 'multi-checkbox', selected.filter((selOption) => selOption !== value));
        } else { // does not include value -> add it
            props.onChange(id, 'multi-checkbox', selected.concat(value));
        }
    }

    if (loading) {
        return (
            <div className={classes.container}>
                <Loader/>
            </div>
        );
    } else {
        return (
            <div className={classes.container}>
                {options.map((option: string, i: number) => (
                    <FormControlLabel
                        control={
                            <Checkbox
                                id={'checkbox-' + i}
                                checked={selected.includes(option)}
                                type='checkbox'
                                error={false}
                                errorText={''}
                                disabled={disabled}
                                onChange={(id, type, value) => handleChange(option)}
                                noStyle
                            />
                        }
                        className={classes.checkboxContainer}
                        label={option}
                    />
                ))}
            </div>
        );
    }
}
