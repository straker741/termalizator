const yup = require('yup');


const ConfigSchema = yup.object().shape({
    targetTemp: yup.number("Enter a number!")
        .positive("Enter positive number!")
        .required("This field is required!"),
    outputPin: yup.number("Enter a number!")
        .positive("Enter positive number!")
        .required("This field is required!"),
});


module.exports = { ConfigSchema };
