import { ethers } from "hardhat";
import fs from "fs";
import path from "path";

async function main() {
  const PerformanceAppraisal = await ethers.getContractFactory("PerformanceAppraisal");
  const contract = await PerformanceAppraisal.deploy();
  await contract.waitForDeployment();

  const contractAddress = await contract.getAddress();
  console.log("✅ Contract deployed to:", contractAddress);

  // 📌 Save the contract address to `backend/contractAddress.json`
  const contractData = { contractAddress, network: "localhost" };
  const backendPath = path.join(__dirname, "../contractAddress.json"); // <== UPDATED PATH

  fs.writeFileSync(backendPath, JSON.stringify(contractData, null, 2));

  console.log("✅ Contract address saved to:", backendPath);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
