require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url : "https://eth-sepolia.g.alchemy.com/v2/Nav6eU9iHkufsKeNYzjJ3TQSS0f6gnfM",
      accounts: ["4390dcda39201c27bec1a962b496c63e381f701c2b2b887bd17f79aab06e5b71"]
    }
  }
};
