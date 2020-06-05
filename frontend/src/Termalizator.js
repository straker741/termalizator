import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import Dashboard from './Dashboard.js';

function Termalizator() {
    return (
        <BrowserRouter>
            <main className="page">
                
                <Switch>
                    <Route path="/" component={Dashboard} />
                </Switch>
            </main>
        </BrowserRouter>
    );
}

export default Termalizator;