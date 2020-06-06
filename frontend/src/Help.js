import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'


function Help({ helpText }) {
    return (
        <div className="help">
            <FontAwesomeIcon className="help-icon" size="lg" icon={faQuestionCircle} />
            <span className="help-text">{helpText}</span>
        </div>
    );
}

export default Help;
