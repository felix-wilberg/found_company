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

    //every Member of a company is a shareholder
    // a member consists of address, amount of coins investested and boolean for polling if company should be dissolved
    struct Member{
        address member;
        uint256 amount;
        uint256 companyId;
        bool wantDissolveCompany;
    }



    ///////////////////////////
    /////////MAPPINGS//////////
    ///////////////////////////

    //company and member specific
    mapping(address => Member) internal addressMember; //map address to the member
    //mapping(uint256 => Member[]) internal members; // map
    mapping(uint256 => address[]) internal memberAddresses;
    mapping(uint256 => uint256) internal memberAmount; // map amount company id to amount of members
    mapping(uint256 => uint256) internal amountWantDissolveCompany; //map company id to amount of members who want to dissolve the company

    //memberregister
    mapping(address => bool) internal memberOfAnyCompany; //all addresses who are members to any company
    mapping(uint256 => mapping(address => bool)) memberOfCertainCompany; //member of a certain company

    //companyregister
    mapping(uint256 => string) internal names; // map company id to name of company
    mapping(string => bool) internal companyExists; //map company name to bool

    //companycapitalrelated
    mapping(uint256 => uint256) internal foundingcapitalgoal; //starting capital per companyId
    mapping(uint256 => uint256) internal payedCapital; //payedCapital per company


    ///////////////////////////
    /////////EVENTS////////////
    ///////////////////////////

    event Received(uint256 value, address sender);
    event Founded(uint256 companyId, string name, uint256 foundingcapitalgoal, uint256 memberAmount);
    event Dissolved(uint256 companyId, string name);


    ///////////////////////////
    /////////FUNCTIONS/////////
    ///////////////////////////

    function found(string memory _name, uint256 _foundingcapitalgoal, uint256 _memberAmount) external returns (uint256) {
        require(!companyExists[_name], 'Company already exists');
        // keine Namenssperre vorhanden?

        //company anlegen
        company.push(_name);
        uint256 companyId = company.length -1;
        names[companyId] = _name;
        memberAmount[companyId] = _memberAmount;
        foundingcapitalgoal[companyId] = _foundingcapitalgoal;
        payedCapital[companyId] = 0;
        companyExists[_name] = true;
        amountWantDissolveCompany[companyId]=0;

        //msg.sender is first founder
        createMember(msg.sender, companyId);
        emit Founded(companyId, _name, _foundingcapitalgoal, _memberAmount);
        return companyId;
    }

    function createMember(address newAddress , uint256 companyId) internal {
        addressMember[newAddress].member = newAddress;
        addressMember[newAddress].companyId = companyId;
        memberAddresses[companyId].push(newAddress);
        memberOfCertainCompany[companyId][newAddress] = true;
        memberOfAnyCompany[newAddress] = true;
    }

    function payShare(uint256 companyId) external payable returns(uint256) {   //external means less gas fees
        // value needs to be more than expected companyfoundingcapital devided by amount of founders
        require(msg.value >= foundingcapitalgoal[companyId]/memberAmount[companyId], 'value is not enough');

        //if member is new, create member and assign to company
        if (memberOfCertainCompany[companyId][msg.sender] = false){
            createMember(msg.sender, companyId);
        }
        //save payed amount in correct member
        addressMember[msg.sender].amount = msg.value;
        payedCapital[companyId] += msg.value;

        //return 1 for success and missing capital
        //uint256 missing = foundingcapitalgoal[companyId] - payedCapital[companyId];

        emit Received(msg.value, msg.sender);
        return(1);
    }


    function leaveCompany(uint256 companyId) external returns (uint256) {
        //check, if user is part of the company
        require(memberOfCertainCompany[companyId][msg.sender] = true, 'Address is not member of the company.');
        //check, if company has more than one member
        require(memberAddresses[companyId].length >1, 'Company just has one member. Please dissolve Company.');
        //evtl. dissokve automatisch aufrufen
        require(addressMember[msg.sender].amount > 0, 'No shares payed.');
        //variable for the returnmoney
        uint256 returnMoney = calcReturnAmount(msg.sender, companyId);

        //if payed amount is smaller than part of payedcapital --> return amount payed, else return part of capital

        payedCapital[companyId] = payedCapital[companyId] - returnMoney;
        transfer(payable(msg.sender), returnMoney); //msg.sender needs to be casted to payable to receive ETH

        //remove address from all mappings
        delete addressMember[msg.sender];
        memberAmount[companyId] -= 1;
        memberOfCertainCompany[companyId][msg.sender] = false;
        memberOfAnyCompany[msg.sender] = false;
        removeFromMemberAddresses(companyId, msg.sender);
        return(1);
    }

    function calcReturnAmount(address returnAddress, uint256 companyId) internal view returns(uint256){
        uint256 returnMoney = 0;
        if (addressMember[returnAddress].amount < payedCapital[companyId]/memberAmount[companyId]){
            returnMoney =  addressMember[returnAddress].amount;
        } else {
            returnMoney = payedCapital[companyId]/memberAmount[companyId];
        }
        return returnMoney;
    }

    function removeFromMemberAddresses(uint256 companyId, address removeAddress) internal {
        uint i = 0;
        while (memberAddresses[companyId][i] != removeAddress) {
            i++;
        }
        while (i<memberAddresses[companyId].length-1) {
            memberAddresses[companyId][i] = memberAddresses[companyId][i+1];
            i++;
        }
        //memberAddresses[companyId].length --; // not needed cause of dynamic array
    }

    //transfer function
    function transfer(address payable to, uint256 amount) internal {
        to.transfer(amount);
    }



    //every of the members need to run this function
    function dissolveCopany(uint256 companyId) public {
        require(memberOfCertainCompany[companyId][msg.sender] = true, 'Address is not member of any company.');
        require(companyExists[names[companyId]] = true, 'company does not exist');
        //ob msg.sender ist der letzte
        // wenn ja, dann überweisen
        // wenn nein, wantDissolveCompany für member auf true

        if (addressMember[msg.sender].wantDissolveCompany = false){
            addressMember[msg.sender].wantDissolveCompany = true;
            amountWantDissolveCompany[companyId]++;
        }
        if (amountWantDissolveCompany[companyId] == memberAmount[companyId]){
            uint256 i = 0;
            while (i < memberAmount[companyId]){ //array starts from 0
                address returnAddress =memberAddresses[companyId][i];
                uint256 returnAmount = calcReturnAmount(returnAddress, companyId);
                transfer(payable(returnAddress), returnAmount);
                i++;
            }

            // delete everything

            // return erfolgreich
        }
        // 1 Jahr Sperre für Namen
        emit Dissolved(companyId, names[companyId]);

    }

    //returns memberAddresses
    function getMembers(uint256 companyId) external view returns  (address[] memory) {
        return(memberAddresses[companyId]);
    }

    function getAllCompanies() external view returns (string[] memory) {
        return company;
    }

    function getMyCompany() external view returns (string memory) {
        uint256 companyId = addressMember[msg.sender].companyId;
        return names[companyId];
    }
    function getCompanyBalance() external view returns (uint256) {
        uint256 companyId = addressMember[msg.sender].companyId;
        return payedCapital[companyId];
    }
}