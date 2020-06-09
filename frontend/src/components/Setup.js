import React from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

import { TextField, Button } from '@material-ui/core';

import { HOST_URL } from '../settings.js';


const validationSchema = yup.object().shape({
    targetTemp: yup.number()
        .typeError("Enter a valid number!")
        .min(20, "It's a heater, not freezer!")
        .max(100, "Do you want to burn something?")
        .required("This field is required!"),
    outputPin: yup.number("Enter a valid number!")
        .typeError("Enter a valid number!")
        .integer("Enter an integer!")
        .lessThan(40, "Must be less than 40!")
        .positive("Enter positive number!")
        .required("This field is required!"),
});


function Setup(props) {
    const onSubmit = (data) => {
        //console.log(data);
        axios.put(`${HOST_URL}config/`, data).then((response) => {
            console.log(response);
            props.setStatus(true);
            props.setSnackbarState({
                status: response.status,
                message: "Successfully started Termalizator!",
                active: true
            });
        }).catch((error) => {
            console.log(error);
            props.setSnackbarState({
                status: error.response.status,
                message: "Error!",
                active: true
            });
        });
    }

    return (
        <Formik
            initialValues={{
                targetTemp: 25,
                outputPin: 16,
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ isValid, errors }) => (
                <Form>
                    <div>
                        <Field
                            autoComplete="off"
                            autoFocus
                            name="targetTemp"
                            as={TextField}
                            label="Target Temperature"
                            helperText={<ErrorMessage name="targetTemp" />}
                            error={errors.targetTemp ? true : false}
                        />
                    </div>
                    <div>
                        <Field
                            autoComplete="off"
                            name="outputPin"
                            as={TextField}
                            label="Output Pin"
                            helperText={<ErrorMessage name="outputPin" />}
                            error={errors.outputPin ? true : false}
                        /> 
                    </div>
                    <div>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={!isValid}
                        >
                            START
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export default Setup;