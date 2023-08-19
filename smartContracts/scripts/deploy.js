
const hre = require("hardhat");

const main = async () => {
  const Transaction = await hre.ethers.getContractFactory("Transactions")
  const transactions = await Transaction.deploy()
  await transactions.deploymentTransaction()
  console.log("Transaction Deployed to: "+ await transactions.getAddress())
}

const runMain = async () => {
  try {
    await main()
    process.exit(0)
  }catch (e) {
    console.error(e)
    process.exit(1)
  }
}
runMain()
    .then()
