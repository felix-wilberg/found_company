import React from 'react';


//this component will be displayed once  a company was successfully founded

const SuccessLeave = ({isLeft}) => {
        return (
            <>
                        <div key={isLeft.companyId}>
                                <div className="alert alert-success my-3" role="alert" data-mdb-color="success">
                                    <i className="fas fa-check-circle me-3"></i>
                                        <p>Die Firma wurde verlassen:</p>
                                        <p>CompanyID: {isLeft.companyId}</p>
                                        <p>name: {isLeft.companyName}</p>
                                        <p>Adresse: {isLeft.addressSender}</p>
                                        <a href={`https://ropsten.etherscan.io/tx/${isLeft.txHash}`} target="_blank">
                                                Check in block explorer
                                        </a>
                                </div>
                        </div>

            </>
        );
}

export default SuccessLeave;