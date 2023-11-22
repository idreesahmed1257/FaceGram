import { FormControl, FormHelperText, TextField } from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'

const InputField = ({ control, errors, name, placeHolder, label, type, errorName }) => {
    let namee = 'email'

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <FormControl
                    error={errors && errors[name] && errors[name].message}
                    fullWidth >
                    <TextField
                        label={label}
                        placeholder={placeHolder}
                        variant="outlined"
                        fullWidth
                        size="small"
                        margin="normal"
                        {...field}
                        type={type}
                    />
                    {/* <FormHelperText>{errors[name].message}</FormHelperText> */}

                    <FormHelperText>{errors && errors[name] && errors[name].message}</FormHelperText>
                </FormControl>
            )}
        />
    )
}

export default InputField
