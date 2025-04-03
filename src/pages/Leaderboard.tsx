import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import contractABI from "../abi/PerformanceAppraisal.json";
import fetchContractAddress from "../utils/fetchContractAddress";

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

        const count = await contract.getEmployeeCount();
        let employees = [];

        for (let i = 0; i < count; i++) {
          const [id, name, totalScore, ratingCount] = await contract.getEmployee(i);
          const avgRating = ratingCount > 0 ? Number(totalScore) / Number(ratingCount) : 0;

          employees.push({
            id: Number(id),
            name,
            rating: isNaN(avgRating) ? 0 : avgRating.toFixed(1),
            reviews: Number(ratingCount),
          });
        }

        employees.sort((a, b) => b.rating - a.rating);

        setTopPerformers(employees);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Leaderboard</h1>
      <ul>
        {topPerformers.map((emp) => (
          <li key={emp.id}>
            {emp.name}: {emp.rating} ⭐ ({emp.reviews} reviews)
          </li>
        ))}
      </ul>
    </div>
  );
}
