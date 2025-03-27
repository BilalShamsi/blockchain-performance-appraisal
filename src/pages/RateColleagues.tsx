import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Star } from "lucide-react";
import contractABI from "../abi/PerformanceAppraisal.json"; // Make sure to generate ABI after deployment

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Update this after deployment

export default function RateColleagues() {
  const [selectedUser, setSelectedUser] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, contractABI.abi, provider);

      const employeeCount = await contract.employeeCount();
      const tempEmployees = [];

      for (let i = 0; i < employeeCount; i++) {
        const [name, totalScore, ratingCount] = await contract.getEmployee(i);
        tempEmployees.push({ id: i, name, totalScore, ratingCount });
      }

      setEmployees(tempEmployees);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedUser || rating === 0) {
      alert("Please select a colleague and give a rating.");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI.abi, signer);

      const tx = await contract.rateEmployee(selectedUser, rating);
      await tx.wait();

      alert("Rating submitted successfully!");
      fetchEmployees();
    } catch (error) {
      console.error("Error submitting rating:", error);
      alert("Failed to submit rating.");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Rate Your Colleagues</h1>

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
                    {colleague.name}
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
