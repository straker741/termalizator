import React, { useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';

import Setup from './Setup.js';
import ResponseStatusSnackbar from './ResponseStatusSnackbar.js';
import { HOST_URL } from '../settings.js';

function Dashboard({ status, setStatus }) {
    const [snackbarState, setSnackbarState] = useState({
        status: 0,
        message: "",
        active: false
    });

    const handleStop = () => {
        axios.get(`${HOST_URL}stop/`).then((response) => {
            console.log(response);
            setStatus(false);
            setSnackbarState({
                status: response.status,
                message: "Successfully stopped Termalizator!",
                active: true
            });
        }).catch((error) => {
            console.log(error);
            setSnackbarState({
                status: error.response.status,
                message: "Error!",
                active: true
            });
        });
    }

    if (!status) {
        return (
            <div className="dashboard">
                <ResponseStatusSnackbar {...snackbarState} setSnackbarState={setSnackbarState} />
                <Setup status={status} setStatus={setStatus} {...snackbarState} setSnackbarState={setSnackbarState} />
            </div>
        );
    }
    else {
        return (
            <div className="dashboard">
                <ResponseStatusSnackbar {...snackbarState} setSnackbarState={setSnackbarState} />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleStop()}
                >
                    STOP 
                </Button>
            </div>
        );
    }
}

export default Dashboard;