import React from 'react';

import * as yup from 'yup';

import { HOST_URL } from '../settings.js';
import MyTable from './material-table/Material-Table.js';


/* VALIDATION SCHEMA */
const RecipeSchema = yup.object().shape({
    id: yup.number()
        .typeError("Enter a valid number!")
        .positive("Enter positive number!"),
    name: yup.string()
        .max(32, "Too long!")
        .required("This field is required!"),
    weight: yup.number()
        .typeError("Enter a valid number!")
        .positive("Enter positive number!"),
    temp: yup.number()
        .typeError("Enter a valid number!")
        .min(20, "It's a heater, not freezer!")
        .max(100, "Do you want to burn something?")
        .required("This field is required!"),
    time: yup.string()
        .required("This field is required!"),
});


function Notes() {
    return (
        <>
            <MyTable
                url={`${HOST_URL}api/recipes`}
                validationSchema={RecipeSchema}
                title="Recipes"
            />
            
        </>
    );
}

export default Notes;
