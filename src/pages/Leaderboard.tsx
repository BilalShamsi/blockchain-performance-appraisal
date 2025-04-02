import React, { useState, useEffect } from "react";
import { Trophy, TrendingUp, TrendingDown } from "lucide-react";
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

export default function Leaderboard() {
  const [topPerformers, setTopPerformers] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const address = await fetchContractAddress();
      if (!address) return;

      if (!window.ethereum) {
        alert("MetaMask not detected!");
        return;
      }

      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(address, contractABI.abi, provider);

        const count = await contract.getEmployeeCount(); // Ensure function exists in contract
        let employees = [];

        for (let i = 0; i < count; i++) {
          const [id, name, totalScore, ratingCount] = await contract.getEmployee(i);

          const avgRating = ratingCount > 0 ? Number(totalScore) / Number(ratingCount) : 0;

          employees.push({
            id: Number(id),
            name,
            department: "N/A",
            rating: isNaN(avgRating) ? 0 : avgRating.toFixed(1), // Prevent NaN issue
            reviews: Number(ratingCount),
          });
        }

        employees.sort((a, b) => b.rating - a.rating);

        const rankedEmployees = employees.map((emp, index) => ({
          ...emp,
          change: index < employees.length / 2 ? "up" : "down",
        }));

        setTopPerformers(rankedEmployees);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Performance Leaderboard</h1>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <div className="flex items-center">
            <Trophy className="h-6 w-6 text-yellow-400" />
            <h3 className="ml-2 text-lg leading-6 font-medium text-gray-900">
              Top Performers
            </h3>
          </div>
        </div>
        <div className="border-t border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rank</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reviews</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trend</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topPerformers.map((person, index) => (
                <tr key={person.id}>
                  <td className="px-6 py-4 whitespace-nowrap">#{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{person.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{person.rating}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{person.reviews}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {person.change === "up" ? <TrendingUp className="h-5 w-5 text-green-500" /> : <TrendingDown className="h-5 w-5 text-red-500" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
