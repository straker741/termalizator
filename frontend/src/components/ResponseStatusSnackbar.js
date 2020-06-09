import React, { useState, useEffect } from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ResponseStatusSnackbar(props) {
    const [severity, setSeverity] = useState("");

    useEffect(() => {
        if (props.active) {
            if (200 <= props.status && props.status < 300) {
                // Success
                setSeverity("success");
            }
            else if (300 <= props.status && props.status < 400) {
                // Redirection
                setSeverity("warning");
            }
            else if (400 <= props.status && props.status < 500) {
                // Client Error
                setSeverity("error");
            }
            else if (500 <= props.status && props.status < 600) {
                // Server Error
                setSeverity("error");
            }
            else {
                // Default
                setSeverity("info");
            }
        }
    }, [props.active]);
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        const prevState = props;
        props.setSnackbarState({ ...prevState, active: false });
    };

    return (
        <Snackbar open={props.active} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity}>
                {props.message}
                {severity === "error" ? " " + props.status : ""}
            </Alert>
        </Snackbar>
    );
}

export default ResponseStatusSnackbar;
