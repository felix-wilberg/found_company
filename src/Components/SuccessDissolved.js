import React from 'react';


//this component will be displayed once  a company was successfully founded

const SuccessDissolved = ({isDissolved}) => {
        return (
            <>
                        <div key={isDissolved.companyId}>
                                <div className="alert alert-success my-3" role="alert" data-mdb-color="success">
                                    <i className="fas fa-check-circle me-3"></i>
                                        <p>Die Firma wurde aufgelöst:</p>
                                        <p>CompanyID: {isDissolved.companyId}</p>
                                        <p>name: {isDissolved.companyName}</p>
                                        <p>Adresse: {isDissolved.addressSender}</p>
                                        <a href={`https://ropsten.etherscan.io/tx/${isDissolved.txHash}`} target="_blank">
                                                Check in block explorer
                                        </a>
                                </div>
                        </div>

            </>
        );
}

export default SuccessDissolved;