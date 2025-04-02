const hre = require("hardhat");

async function main() {
  const contractAddress = require("/home/tabrez/project/blockchain-performance-appraisal/public/contractAddress.json").contractAddress;
  const PerformanceAppraisal = await hre.ethers.getContractFactory("PerformanceAppraisal");
  const contract = await PerformanceAppraisal.attach(contractAddress);

  const employeeCount = await contract.employeeCount();
  console.log("Total Employees:", employeeCount.toString());

  for (let i = 0; i < employeeCount; i++) {
    const rating = await contract.getEmployeeRating(i);
    console.log(`Employee ${i} Rating:`, rating.toString());
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
