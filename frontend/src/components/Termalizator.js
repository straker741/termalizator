import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Dashboard from './Dashboard.js';
import Navbar from './Navbar.js';
import Notes from './Notes.js';


function Termalizator() {
    const [status, setStatus] = useState(false);
    return (
        <BrowserRouter>
            <Navbar />
            <main className="page">
                
                <Switch>
                    <Route path="/notes" component={Notes} />
                    <Route path="/" render={() => <Dashboard status={status} setStatus={setStatus} />} />
                </Switch>
            </main>
        </BrowserRouter>
    );
}

export default Termalizator;
