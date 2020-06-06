import React, { useState } from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import Help from './Help';


const validationSchema = yup.object().shape({
    targetTemp: yup.number("Enter a valid number!")
        .positive("Enter positive number!")
        .required("This field is required!"),
    outputPin: yup.number("Enter a valid number!")
        .positive("Enter positive number!")
        .required("This field is required!"),
});

const outputPinHelpText = "Pin 16 is recommended!";

const onSubmit = (data) => {
    console.log(data);

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
}

function Setup({ status, setStatus }) {
    return (
        <>
            <Formik
                initialValues={{
                    targetTemp: 25,
                    outputPin: 16,
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => onSubmit(values)}
            >
                {({ errors, touched }) => (
                    <Form className="setup-container">
                        <div className="setup">
                            <label htmlFor="targetTemp"><h2>Target Temperature</h2></label>
                            <Field
                                id="targetTemp"
                                name="targetTemp"
                                className={errors.targetTemp && touched.targetTemp ? "error" : null}
                            />
                            <br />
                            <ErrorMessage component="span" className="error" name="targetTemp" />

                            <div className="label-with-help">
                                <label htmlFor="outputPin">
                                    <h2>Output Pin</h2>
                                </label>
                                <Help helpText={outputPinHelpText} />
                            </div>
                            <Field
                                id="outputPin"
                                name="outputPin"
                                className={errors.outputPin && touched.outputPin ? "error" : null}
                            />
                            <br />
                            <ErrorMessage component="span" className="error" name="outputPin" />
                        </div>
                        
                        <div className="btn-container">
                            <div className="btn-wrapper">
                                <input
                                    type="submit"
                                    className="btn primary-btn green-btn"
                                    value="Start"
                                    onClick={() => setStatus(true)}
                                    disabled={errors.targetTemp || errors.outputPin ? true : false}
                                />
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default Setup;