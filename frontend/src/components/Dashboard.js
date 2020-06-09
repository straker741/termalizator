import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';

import Setup from './Setup.js';


function Dashboard({ status, setStatus }) {
    
    const handleStop = () => {
        setStatus(false);
        /*
        axios.get("http://localhost:5000/stop/").then((response) => {
            console.log(response);
            setStatus(false);
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
        });*/
    }

    if (!status) {
        return (
            <div className="dashboard">
                <Setup status={status} setStatus={setStatus} />
            </div>
        );
    }
    else {
        return (
            <div className="dashboard">
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