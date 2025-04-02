import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Star } from "lucide-react";
import contractABI from "../abi/PerformanceAppraisal.json";

// Dynamically fetch contract address
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

export default function RateColleagues() {
  const [contractAddress, setContractAddress] = useState("");
  const [contract, setContract] = useState(null);
  const [selectedUser, setSelectedUser] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [employees, setEmployees] = useState([]);
  const [newEmployeeName, setNewEmployeeName] = useState("");

  useEffect(() => {
    const initBlockchain = async () => {
      const address = await fetchContractAddress();
      if (!address) return;
      setContractAddress(address);

      if (!window.ethereum) {
        alert("MetaMask not detected!");
        return;
      }

      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contractInstance = new ethers.Contract(address, contractABI.abi, signer);
        setContract(contractInstance);
        fetchEmployees(contractInstance);
      } catch (error) {
        console.error("Error connecting to blockchain:", error);
      }
    };

    initBlockchain();
  }, []);

  const fetchEmployees = async (contractInstance) => {
    if (!contractInstance) return;

    try {
      console.log("Fetching employees...");
      
      const count = await contractInstance.employeeCount();
      console.log("Employee count from contract:", count.toString());

      let tempEmployees = [];
      for (let i = 0; i < count; i++) {
        const employee = await contractInstance.employees(i);
        console.log(`Fetched employee ${i}:`, employee);

        tempEmployees.push({
          id: Number(employee[0]),   // Employee ID (convert BigInt to number)
          name: employee[1],         // Employee name
          totalScore: Number(employee[2]), // Total score (convert BigInt to number)
          wallet: employee[3],       // Wallet address
        });
      }

      console.log("Final employee list:", tempEmployees);
      setEmployees(tempEmployees);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleAddEmployee = async () => {
    if (!newEmployeeName) {
      alert("Please enter a name.");
      return;
    }

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const tx = await contract.addEmployee(newEmployeeName);
      await tx.wait();
      alert(`Employee "${newEmployeeName}" added successfully!`);
      setNewEmployeeName(""); // Clear input
      fetchEmployees(contract); // Refresh list
    } catch (error) {
      console.error("Error adding employee:", error);
      alert("Failed to add employee.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedUser || rating === 0) {
      alert("Please select a colleague and give a rating.");
      return;
    }

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const tx = await contract.rateEmployee(selectedUser, rating);
      await tx.wait();
      alert("Rating submitted successfully!");
      fetchEmployees(contract);
    } catch (error) {
      console.error("Error submitting rating:", error);
      alert("Failed to submit rating.");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Rate Your Colleagues</h1>

      {/* Add Employee Section */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-medium">Add Employee</h2>
        <input
          type="text"
          placeholder="Enter employee name"
          value={newEmployeeName}
          onChange={(e) => setNewEmployeeName(e.target.value)}
          className="border rounded px-2 py-1 w-full mt-2"
        />
        <button
          onClick={handleAddEmployee}
          className="mt-2 w-full bg-indigo-600 text-white py-2 rounded"
        >
          Add Employee
        </button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="colleague" className="block text-sm font-medium text-gray-700">
                Select Colleague
              </label>
              <select
                id="colleague"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 rounded-md"
              >
                <option value="">Select a colleague</option>
                {employees.map((colleague) => (
                  <option key={colleague.id} value={colleague.id}>
                    {colleague.name} ({colleague.wallet.substring(0, 6)}...) {/* Display name & part of wallet */}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Rating</label>
              <div className="mt-1 flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRating(value)}
                    className={`p-1 rounded-full focus:outline-none ${
                      rating >= value ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    <Star className="h-8 w-8" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                Feedback Comment
              </label>
              <textarea
                id="comment"
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="shadow-sm border-gray-300 rounded-md block w-full"
                placeholder="Provide detailed feedback..."
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Submit Rating
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
