const LandContract = artifacts.require("LandContract");

module.exports = function(deployer) {
  deployer.deploy(LandContract);
};
