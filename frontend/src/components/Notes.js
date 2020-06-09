import React from 'react';

import MyTable from './Material-Table.js';


function Notes() {
    return (
        <>
            {/* <MyTable url={"http://localhost:5000/api/recipes"} /> */}
            <MyTable url={"http://192.168.178.24:5000/api/recipes"} />
        </>
    );
}

export default Notes;
