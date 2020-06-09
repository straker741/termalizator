import React, { useState } from 'react';

import TextField from '@material-ui/core/TextField';


function CustomEditField(props) {
    const [isError, setIsError] = useState(false);
    const [helperText, setHelperText] = useState("");
    
    const handleEdit = (event) => {
        let element = {...props.rowData};
        element[props.columnDef.field] = event.target.value;
        //console.log(element);
        // Every time value changes, do validation
        const isValid = async () => {
            try {
                const result = await props.validationSchema.validateAt(props.columnDef.field, element);
                //console.log(result);
                setIsError(false);
                setHelperText("");
            }
            catch (error) {
                //console.log(error);
                setIsError(error.path === props.columnDef.field ? true : false);
                setHelperText(error.path === props.columnDef.field ? error.message : "");
            }
        }
        isValid();

        props.onChange(event.target.value)
    };

    return (
        <TextField
            {...props}
            style={props.columnDef.type === 'numeric' ? { float: 'right' } : {}}
            type={props.columnDef.type === 'numeric' ? 'number' : 'text'}
            placeholder={props.columnDef.title}
            value={props.value === undefined ? '' : props.value}
            onChange={event => handleEdit(event)}
            InputProps={{
                style: {
                    fontSize: 13,
                },
                inputProps: {
                    'aria-label': props.columnDef.title
                }
            }}
            error={isError}
            helperText={helperText}
        />
    );
}


export default CustomEditField;
