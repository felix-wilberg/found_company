// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;


contract Company {

    ///////////////////////////
    /////////CONSTRUCTOR///////
    ///////////////////////////

    constructor(){
        //governance = governance_;
        governance = msg.sender;
    }

    ///////////////////////////
    /////////VARIABLES/////////
    ///////////////////////////

    //owner of contract
    address public governance;
    string[] public company;
    string public name = "Found your own company";

    // neded because it is not possible to create a replaceArray in memory
    // it is used in function removeFromMemberAddresses() to remove an address from a companyAddress Array
    address[] private replaceArray;


    //every Member of a company is a shareholder
    // a member consists of address, amount of coins investested and boolean for polling if company should be dissolved
    struct Member{
        address member;
        uint256 amount; //payed amount per member
        uint256 companyId;
        bool wantDissolveCompany;
    }



    ///////////////////////////
    /////////MAPPINGS//////////
    ///////////////////////////

    //company and member specific
    mapping(address => Member) internal addressMember; //map address to the member
    mapping(uint256 => address[]) internal memberAddresses; //map companyId to list of memberAddresses
    mapping(uint256 => uint256) internal memberAmount; // map amount companyId to amount of members
    mapping(uint256 => uint256) internal amountWantDissolveCompany; //map companyId to amount of members who want to dissolve the company

    //memberregister
    mapping(uint256 => mapping(address => bool)) memberOfCertainCompany; //member of a certain company

    //companyregister
    mapping(uint256 => string) internal names; // map company id to name of company
    mapping(string => bool) internal companyExists; //map company name to bool

    //companycapitalrelated
    mapping(uint256 => uint256) internal foundingCapitalGoal; //starting capital per companyId
    mapping(uint256 => uint256) internal payedCapital; //payedCapital per company


    ///////////////////////////
    /////////EVENTS////////////
    ///////////////////////////

    event Received(uint256 value, address sender, uint256 companyId); //event for confirmation of paying a share to company
    event Founded(uint256 companyId, string name, uint256 foundingCapitalGoal, uint256 memberAmount); // event of confirmation of a founded company
    event Dissolved(uint256 companyId, string name, address sender); //event of confirmation of a dissolved company
    event Left(uint256 companyId, string name, address sender); //event of confirmation that a user left a company


    ///////////////////////////
    /////////FUNCTIONS/////////
    ///////////////////////////

    function found(string memory _name, uint256 _foundingCapitalGoal, uint256 _memberAmount) external returns (uint256) {
        require(!companyExists[_name], 'Company already exists');
        // keine Namenssperre vorhanden?

        //company anlegen
        company.push(_name);
        uint256 companyId = company.length -1;
        names[companyId] = _name;
        memberAmount[companyId] = _memberAmount;
        foundingCapitalGoal[companyId] = _foundingCapitalGoal;
        payedCapital[companyId] = 0;
        companyExists[_name] = true;
        amountWantDissolveCompany[companyId]=0;

        //msg.sender is first founder
        createMember(msg.sender, companyId);
        emit Founded(companyId, _name, _foundingCapitalGoal, _memberAmount);
        return companyId;
    }

    function createMember(address newAddress , uint256 companyId) internal {
        addressMember[newAddress].member = newAddress;
        addressMember[newAddress].companyId = companyId;
        memberAddresses[companyId].push(newAddress);
        memberOfCertainCompany[companyId][newAddress] = true;
    }

    function payShare(uint256 companyId) external payable {
        // external means less gas fees
        // value needs to be more than expected companyfoundingcapital devided by amount of founders
        require(msg.value >= foundingCapitalGoal[companyId]/memberAmount[companyId], 'value is not enough');

        //if member is new, create member and assign to company
        if (addressMember[msg.sender].member == address(0x0)){
            createMember(msg.sender, companyId);
        }
        //save payed amount in correct member
        addressMember[msg.sender].amount = msg.value;
        payedCapital[companyId] += msg.value;

        emit Received(msg.value, msg.sender, companyId);
    }


    function leaveCompany(uint256 companyId) external  {
        //check, if user is part of the company
        require(memberOfCertainCompany[companyId][msg.sender] = true, 'Address is not member of the company.');
        //check, if company has more than one member
        require(memberAddresses[companyId].length >1, 'Company just has one member. Please dissolve Company.');
        //if member did not pay any share, one can not leave the company
        require(addressMember[msg.sender].amount > 0, 'No shares payed.');

        //calculate the retun amount
        uint256 returnMoney = calcReturnAmount(msg.sender, companyId);
        //if payed amount is smaller than part of payedcapital --> return amount payed, else return part of capital
        payedCapital[companyId] = payedCapital[companyId] - returnMoney;
        transfer(payable(msg.sender), returnMoney); //msg.sender needs to be casted to payable to receive ETH

        //remove address from all mappings
        delete addressMember[msg.sender];
        memberAmount[companyId] -= 1;
        memberOfCertainCompany[companyId][msg.sender] = false;
        removeFromMemberAddresses(companyId, msg.sender);
        emit Left(companyId, names[companyId], msg.sender);
    }

    //internal function to calculate the return amount
    function calcReturnAmount(address returnAddress, uint256 companyId) internal view returns(uint256){
        uint256 returnMoney = 0;
        if (addressMember[returnAddress].amount < payedCapital[companyId]/memberAmount[companyId]){
            returnMoney =  addressMember[returnAddress].amount;
        } else {
            returnMoney = payedCapital[companyId]/memberAmount[companyId];
        }
        return returnMoney;
    }

    //internal function to remove the address from mapping array
    function removeFromMemberAddresses(uint256 companyId, address removeAddress) internal {
        //search position of address in array
        for(uint i = 0; i <  memberAddresses[companyId].length; i++) {
            if (memberAddresses[companyId][i] != removeAddress){
                replaceArray.push(memberAddresses[companyId][i]);
            }
        }
        memberAddresses[companyId] = replaceArray;
    }

    //transfer function
    function transfer(address payable to, uint256 amount) internal {
        to.transfer(amount);
    }



    //every of the members need to run this function
    function dissolveCompany(uint256 companyId) public {
        require(companyExists[names[companyId]] = true, 'company does not exist');
        require(memberOfCertainCompany[companyId][msg.sender] = true, 'Address is not member of the company.');
        string memory companyName = names[companyId];

        //ob msg.sender ist der letzte
        // wenn ja, dann überweisen
        // wenn nein, wantDissolveCompany für member auf true

        if (addressMember[msg.sender].wantDissolveCompany == false){
            addressMember[msg.sender].wantDissolveCompany = true;
            amountWantDissolveCompany[companyId]++;
        }
        //return all left money
        if (amountWantDissolveCompany[companyId] == memberAmount[companyId]){
            uint256 i = 0;
            while (i < memberAmount[companyId]){ //array starts from 0
                address returnAddress = memberAddresses[companyId][i];
                uint256 returnAmount = calcReturnAmount(returnAddress, companyId);
                transfer(payable(returnAddress), returnAmount);
                i++;
            }

            // delete all memberData
            uint256 j = 0;
            address deleteMember;
            while (j< memberAmount[companyId]){
                deleteMember = memberAddresses[companyId][j];
                delete addressMember[deleteMember];
                memberOfCertainCompany[companyId][deleteMember] = false;
                j++;
            }
            //delete all members of the one company
            delete memberAddresses[companyId];
            //set memberAmount to 0 of this company
            memberAmount[companyId] = 0;
            amountWantDissolveCompany[companyId] = 0;

            //delete company
            companyExists[names[companyId]] = false;
            names[companyId] = '';
            foundingCapitalGoal[companyId] = 0;
            payedCapital[companyId] = 0;
        }

        emit Dissolved(companyId, companyName, msg.sender);

    }

    //returns memberAddresses
    function getMembersById(uint256 companyId) external view returns  (address[] memory) {
        require(companyExists[names[companyId]] == true, "no company with this ID");
        return(memberAddresses[companyId]);
    }

    function getAllCompanies() external view returns (string[] memory) {
        return company;
    }

    function getCompanyById(uint256 companyId) external view returns (string memory) {
        require(companyExists[names[companyId]] == true, "no company with this ID");
        return names[companyId];
    }
    function getCompanyBalanceById(uint256 companyId) external view returns (uint256) {
        require(companyExists[names[companyId]] == true, "no company with this ID");
        return payedCapital[companyId];
    }

    function getBalanceOfContract() external view returns (uint256)  {
        return address(this).balance;
    }
}