import React from 'react';
import {useStore} from "./App";

//this component will be displayed once  a company was successfully founded

const Success = () => {
    const companyInfo = useStore((state) => state.companyInfo);
    let item = companyInfo[companyInfo.length-1];
        return (
            <>

                        <div key={item.companyId}>
                                <div className="alert" role="alert" data-mdb-color="success">
                                        <p>Die Firma wurde gegründet:</p>
                                        <p>CompanyID: {item.companyId}</p><br/>
                                        <p>name: {item.name}</p><br/>
                                        <p>foundingCapitalGoal: {item.foundingCapitalGoal}</p><br/>
                                        <p>memberAmount: {item.memberAmount}</p><br/>
                                        {/*<a href={`https://rinkeby.etherscan.io/tx/${item.txHash}`}>*/}
                                        {/*        Check in block explorer*/}
                                        {/*</a>*/}
                                </div>
                        </div>

            </>
        );
}

export default Success;