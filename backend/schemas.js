const yup = require('yup');


const ConfigSchema = yup.object().shape({
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
        .trim()
        .required("This field is required!"),
});


const RecipeOptions = {
    stripUnknown: true,
};


module.exports = { ConfigSchema, RecipeSchema, RecipeOptions };
