import React from 'react'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'


interface DatePickerProps {
    error: boolean,
    helperText: string | null,
    required: boolean,
    id: string,
    label: string,
    value: any,
    onChange(id: string, type: string, value: any): void,
    disabled: boolean,
    maxDate: Date,
}

const DatePicker = (props: DatePickerProps) => {
    const {
        error,
        helperText,
        required,
        id,
        label,
        value,
        disabled,
        maxDate,
    } = props;

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                fullWidth
                error={error}
                helperText={helperText}
                color='secondary'
                disableToolbar
                required={required}
                inputVariant='outlined'
                format='dd/MM/yyyy'
                margin='none'
                id={id}
                label={label}
                value={value}
                onChange={(date) => props.onChange(id, 'date', date)}
                KeyboardButtonProps={{ 'aria-label': 'change date' }}
                disabled={disabled}
                maxDate={maxDate}
            />
        </MuiPickersUtilsProvider>
    )
}


export default DatePicker;
