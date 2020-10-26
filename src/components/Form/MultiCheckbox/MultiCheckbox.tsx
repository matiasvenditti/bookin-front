import React from 'react';
import { Checkbox } from '..';
import { KeyValue } from '../../../model';
import Loader from '../../Loader/Loader';
import classes from './MultiCheckbox.module.css';


interface MultiCheckboxProps {
    id: string,
    options: KeyValue[],
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
                {options.map((option: KeyValue, i: number) => (
                    <Checkbox
                        id={`checkbox-${id}-${i}`}
                        key={`checkbox-${id}-${i}`}
                        type='checkbox'
                        checked={selected.includes(option.key)}
                        error={false}
                        errorText={''}
                        disabled={disabled}
                        onChange={(id, type, value) => handleChange(option.key)}
                        className={classes.checkboxContainer}
                        label={option.value}
                    />
                ))}
            </div>
        );
    }
}
