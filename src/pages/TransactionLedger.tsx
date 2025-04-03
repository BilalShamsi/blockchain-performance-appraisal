import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import contractABI from "../abi/PerformanceAppraisal.json";
import fetchContractAddress from "../utils/fetchContractAddress";

export default function TransactionLedger() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const address = await fetchContractAddress();
      if (!address) return;

      if (!window.ethereum) {
        alert("MetaMask not detected!");
        return;
      }

      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(address, contractABI.abi, provider);

        const filter = contract.filters.EmployeeRated();
        const events = await contract.queryFilter(filter);

        let txs = events.map((event) => ({
          id: event.transactionHash,
          timestamp: event.blockNumber ? new Date(event.blockNumber * 1000).toLocaleString() : "N/A",
          employeeId: Number(event.args.id),
          ratedBy: event.args.ratedBy,
          newScore: Number(event.args.newScore),
        }));

        setTransactions(txs.reverse());
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Transaction Ledger</h1>
      <ul>
        {transactions.map((tx) => (
          <li key={tx.id}>
            Employee {tx.employeeId} rated by {tx.ratedBy}: {tx.newScore} ⭐
          </li>
        ))}
      </ul>
    </div>
  );
}
