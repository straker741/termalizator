import React from 'react';
import ReactDOM from 'react-dom';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Termalizator from './components/Termalizator.js';

import './index.css';

// https://material-ui.com/customization/default-theme/
const theme = createMuiTheme({
    palette: {
      primary: green,
    },
    /*typography: {
        fontSize: 26,
    },*/
    overrides: {
        MuiInputLabel: {
            shrink: {
                transform: 'translate(0, -0.25em) scale(0.75)',
            },
        },
        MuiTableCell: {
            head: {
                textTransform: 'capitalize',
            },
        },
    },
});


ReactDOM.render(
    <React.StrictMode>
        <MuiThemeProvider theme={theme}>
            <Termalizator />
        </MuiThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

