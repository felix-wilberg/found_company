// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;


contract Company {

    struct Member{
        address member;
        uint256 amount;
    }

    mapping(uint256 => Member) internal members;

    string[] public company;

    mapping(uint256 => uint256) shareholders; // map amount  of shareholders to company id
    mapping(uint256 => string) names; // map company id to name of company
    mapping(string => bool) companyExists; //map company name to bool
    mapping(uint256 => uint256) capital; //starting capital per companyId
    mapping(uint256 => uint256) payedCapital; //payedCapital per company

    event Receive(uint256 value, address sender);

    function found(string memory _name, uint256 _capital, uint256 _shareholders) external  {
        require(!companyExists[_name], 'Company already exists');
        company.push(_name);
        uint256 _id = company.length -1;
        names[_id] = _name;
        shareholders[_id] = _shareholders;
        capital[_id] = _capital;

    }

    function payShare() payable external {
        emit Receive(msg.value, msg.sender);
        Member memory newMember;
        newMember.member = msg.sender;

    }

}