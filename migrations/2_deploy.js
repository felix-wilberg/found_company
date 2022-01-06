const company = artifacts.require("Company");

module.exports = async(deployer) => {
    await deployer.deploy(company);

};