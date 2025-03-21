import React from 'react';

//css loader to show while waiting for blockchain
const Loader = () => (

    <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
);

export default Loader;