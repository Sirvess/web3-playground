const Migrations = artifacts.require("Migrations");
const Erc20 = artifacts.require("ERC20Basic");

const totalAmount = 1000;

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Erc20,totalAmount);
};
