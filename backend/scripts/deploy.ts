import { ethers } from "hardhat";

async function main() {
  const PerformanceAppraisal = await ethers.getContractFactory("PerformanceAppraisal");
  const contract = await PerformanceAppraisal.deploy();
  await contract.waitForDeployment();

  console.log("PerformanceAppraisal deployed to:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
