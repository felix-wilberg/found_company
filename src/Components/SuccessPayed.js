import React from 'react';


//this component will be displayed once  a company was successfully received

const Success = ({isReceived}) => {
        return (
            <>
                        <div key={isReceived.companyId}>
                                <div className="alert alert-success my-3" role="alert" data-mdb-color="success">
                                    <i className="fas fa-check-circle me-3"></i>
                                        <p>Ether wurde eingezahlt:</p>
                                        <p>Menge: {isReceived.value}</p>
                                        <p>Adresse: {isReceived.addressSender}</p>
                                        <a href={`https://ropsten.etherscan.io/tx/${isReceived.txHash}`}>
                                                Check in block explorer
                                        </a>
                                </div>
                        </div>

            </>
        );
}

export default Success;