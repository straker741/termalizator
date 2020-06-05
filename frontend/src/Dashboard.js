import React, { useState } from 'react';

import Setup from './Setup.js';


function Dashboard() {
    const [status, setStatus] = useState(false);

    if (!status) {
        return (
            <Setup status={status} setStatus={setStatus} />
        );
    }
    else {
        return (
            <>
                <div className="btn-container">
                    <div className="btn-wrapper">
                        <input
                            type="button"
                            className="btn primary-btn"
                            value="Stop"
                            onClick={() => setStatus(false)}
                        />
                    </div>
                </div>
            </>
        );
    }
}

export default Dashboard;