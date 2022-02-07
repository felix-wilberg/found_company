import React from 'react';


//this component will be displayed once  a company was successfully founded

const SuccessDissolved = ({companyDissolved}) => {
        return (
            <>
                        <div key={companyDissolved.companyId}>
                                <div className="alert alert-success my-3" role="alert" data-mdb-color="success">
                                    <i className="fas fa-check-circle me-3"></i>
                                        <p>Die Firma wurde gegründet:</p>
                                        <p>CompanyID: {companyDissolved.companyId}</p>
                                        <p>name: {companyDissolved.name}</p>
                                        <p>foundingCapitalGoal: {companyDissolved.foundingCapitalGoal}</p>
                                        <p>memberAmount: {companyDissolved.memberAmount}</p>
                                        <a href={`https://ropsten.etherscan.io/tx/${companyDissolved.txHash}`}>
                                                Check in block explorer
                                        </a>
                                </div>
                        </div>

            </>
        );
}

export default SuccessDissolved;