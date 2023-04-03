const Operations = artifacts.require("FieldOperations");
module.exports = async function (deployer) {
    await deployer.deploy(Operations);
}
