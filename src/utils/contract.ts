import { ethers } from "ethers";
import contractABI from "../abi/PerformanceAppraisal.json";
import contractAddressData from "../../public/contractAddress.json";

const CONTRACT_ADDRESS = contractAddressData.address; // ✅ Load address from JSON

export const getContract = async () => {
    if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({ method: "eth_requestAccounts" });

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        return new ethers.Contract(CONTRACT_ADDRESS, contractABI.abi, signer);
    } else {
        console.error("MetaMask not detected.");
        return null;
    }
};
