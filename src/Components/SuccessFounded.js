import React from 'react';


//this component will be displayed once  a company was successfully founded

const SuccessFounded = ({companyFounded}) => {
        return (
            <>
                        <div key={companyFounded.companyId}>
                                <div className="alert alert-success my-3" role="alert" data-mdb-color="success">
                                    <i className="fas fa-check-circle me-3"></i>
                                        <p>Die Firma wurde gegründet:</p>
                                        <p>CompanyID: {companyFounded.companyId}</p>
                                        <p>name: {companyFounded.companyName}</p>
                                        <p>foundingCapitalGoal: {companyFounded.foundingCapitalGoal}</p>
                                        <p>memberAmount: {companyFounded.memberAmount}</p>
                                        <a href={`https://ropsten.etherscan.io/tx/${companyFounded.txHash}`} target="_blank">
                                                Check in block explorer
                                        </a>
                                </div>
                        </div>

            </>
        );
}

export default SuccessFounded;