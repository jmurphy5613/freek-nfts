/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();


module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: {
      chainId: 1337
    }
  }
};
