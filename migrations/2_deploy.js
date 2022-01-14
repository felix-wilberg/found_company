const simpleStorage = artifacts.require("SimpleStorage");

module.exports = async(deployer) => {
    await deployer.deploy(simpleStorage);

};