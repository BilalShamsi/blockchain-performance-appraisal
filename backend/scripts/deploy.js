const fs = require("fs");
const hre = require("hardhat");

async function main() {
  const PerformanceAppraisal = await hre.ethers.getContractFactory("PerformanceAppraisal");
  const contract = await PerformanceAppraisal.deploy();

  await contract.waitForDeployment(); // Wait until deployed
  const contractAddress = await contract.getAddress();

  console.log("PerformanceAppraisal deployed to:", contractAddress);

  // Save the contract address to contractAddress.json
  const contractData = {
    contractAddress: contractAddress,
    network: "sepolia",
  };

  fs.writeFileSync(
    "/home/tabrez/project/blockchain-performance-appraisal/public/contractAddress.json", // Adjust path if needed
    JSON.stringify(contractData, null, 2)
  );

  console.log("✅ Contract address updated in contractAddress.json");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
