import React, { useState, useEffect } from "react";
import { Clock, User } from "lucide-react";
import { ethers } from "ethers";
import contractABI from "../abi/PerformanceAppraisal.json";

const fetchContractAddress = async () => {
  try {
    const response = await fetch("/contractAddress.json");
    const data = await response.json();
    return data.contractAddress;
  } catch (error) {
    console.error("Error fetching contract address:", error);
    return null;
  }
};

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

        // 🔹 Fetch past "EmployeeRated" events
        const filter = contract.filters.EmployeeRated();
        const events = await contract.queryFilter(filter);

        let txs = events.map((event) => ({
          id: event.transactionHash, // Unique TX Hash
          timestamp: event.blockNumber ? new Date(event.blockNumber * 1000).toLocaleString() : "N/A",
          employeeId: event.args.id.toNumber(),
          ratedBy: event.args.ratedBy,
          newScore: event.args.newScore.toNumber(),
        }));

        setTransactions(txs.reverse());
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Transaction Ledger</h1>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {transactions.map((transaction, index) => (
            <li key={transaction.id || index}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-indigo-600 truncate">
                    Transaction: {transaction.id}
                  </div>
                  <div className="ml-2 flex-shrink-0 flex">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      New Score: {transaction.newScore}
                    </span>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      {transaction.timestamp}
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                      <User className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      Employee ID: {transaction.employeeId}
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  Rated By: {transaction.ratedBy}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
