export default async function fetchContractAddress(): Promise<string | null> {
  try {
    const response = await fetch("/contractAddress.json");
    const data = await response.json();
    return data.contractAddress || null;
  } catch (error) {
    console.error("Error fetching contract address:", error);
    return null;
  }
}
