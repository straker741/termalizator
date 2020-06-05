import React, { useState } from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';


const validationSchema = Yup.object().shape({
    targetTemp: Yup.number("Enter a number!")
        .positive("Enter positive number!")
        .required("This field is required!"),
    outputPin: Yup.number("Enter a number!")
        .positive("Enter positive number!")
        .required("This field is required!"),
});

const onSubmit = (data) => {
    console.log(data);

    axios.put("http://192.168.178.114:5000/config/", data).then((response) => {
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
                    targetTemp: 20,
                    outputPin: 16,
                }}
                validationSchema={validationSchema}
                onSubmit={values => {
                    // same shape as initial values
                    onSubmit(values);
                }}
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

                            <label htmlFor="outputPin"><h2>Output Pin</h2></label>
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
                                    className="btn primary-btn"
                                    value="Start"
                                    //onClick={() => setStatus(true)}
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