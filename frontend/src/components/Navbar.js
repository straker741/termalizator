import React from 'react';
import { Link as LinkRouter } from 'react-router-dom';

import { AppBar, Toolbar, IconButton, Typography, Grid, Link, Tooltip } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faHome } from '@fortawesome/free-solid-svg-icons';


/**
 * @description Simple icon with Tooltip and onClick action
 * @param       {icon, onClickHandler, tooltip}
 */
const MyActionIcon = ({ icon, onClickHandler, tooltip }) => (
    <Tooltip title={tooltip}>
        <IconButton color="inherit" onClick={onClickHandler}>
            <FontAwesomeIcon icon={icon} />
        </IconButton>
    </Tooltip>
);


function Navbar() {
    return (
        <AppBar position="static">
            <Toolbar className="page">
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >
                <Link color="inherit" component={LinkRouter} to="/">
                    <Tooltip title="Home">
                        <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="center"
                        >
                        <IconButton color="inherit" >
                            <FontAwesomeIcon icon={faHome} />
                        </IconButton>
                        <Typography variant="h6">
                            Termalizator
                        </Typography>      
                        </Grid>
                    </Tooltip>
                </Link>
                <div>
                    <Link color="inherit" component={LinkRouter} to="/notes">
                        <MyActionIcon icon={faBook} tooltip="Notes" />
                    </Link>
                </div>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
