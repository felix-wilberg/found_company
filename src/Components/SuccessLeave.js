import React from 'react';


//this component will be displayed once  a company was successfully founded

const SuccessLeave = ({companyLeave}) => {
        return (
            <>
                        <div key={companyLeave.companyId}>
                                <div className="alert alert-success my-3" role="alert" data-mdb-color="success">
                                    <i className="fas fa-check-circle me-3"></i>
                                        <p>Die Firma wurde gegründet:</p>
                                        <p>CompanyID: {companyLeave.companyId}</p>
                                        <p>name: {companyLeave.name}</p>
                                        <p>foundingCapitalGoal: {companyLeave.foundingCapitalGoal}</p>
                                        <p>memberAmount: {companyLeave.memberAmount}</p>
                                        <a href={`https://ropsten.etherscan.io/tx/${companyLeave.txHash}`}>
                                                Check in block explorer
                                        </a>
                                </div>
                        </div>

            </>
        );
}

export default SuccessLeave;