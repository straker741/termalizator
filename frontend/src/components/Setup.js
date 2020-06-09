import React from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

// Material UI
import { TextField, Button } from '@material-ui/core';


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

function Setup({ status, setStatus }) {
    const onSubmit = (data) => {
        console.log(data);
        setStatus(true);
    
        /*
        axios.put("http://localhost:5000/config/", data).then((response) => {
            console.log(response);
        }).catch(function (error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
            console.log(error.config);
        });
        */
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