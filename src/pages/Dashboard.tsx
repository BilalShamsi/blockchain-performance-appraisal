import React, { useEffect, useState } from "react";
import { Star, Users } from "lucide-react";
import { getContract } from "../utils/contract"; // ✅ Import blockchain contract

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [employeeCount, setEmployeeCount] = useState<number | null>(null); // ✅ Blockchain Employee Count

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
    if (loggedInUser.username) {
      setUser(loggedInUser);
      fetchRatings();
      fetchEmployees();  // 🔄 Keep for now
      fetchBlockchainData(); // ✅ Fetch from blockchain
    }
  }, []);

  // 🔗 Fetch ratings from the API
  const fetchRatings = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/ratings");
      const data = await response.json();
      setRatings(data);
    } catch (error) {
      console.error("Failed to fetch ratings:", error);
    }
  };

  // 🔗 Fetch employees from the API (keep this for now)
  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/employees");
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    }
  };

  // 🚀 Fetch data from the blockchain
  const fetchBlockchainData = async () => {
    try {
      const contract = await getContract();
      if (contract) {
        const count = await contract.getEmployeeCount();
        setEmployeeCount(Number(count));
      }
    } catch (error) {
      console.error("Blockchain fetch error:", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Welcome, {user.username}!</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        {/* ⭐ User Rating */}
        <div className="bg-white shadow p-4 rounded-lg">
          <Star className="h-6 w-6 text-yellow-400 mb-2" />
          <p className="text-sm font-medium text-gray-500">Your Rating</p>
          <p className="text-2xl font-semibold">
            {ratings.find((r) => r.employeeId === user.id)?.rating || "N/A"}
          </p>
        </div>

        {/* 🏆 Leaderboard */}
        <div className="bg-white shadow p-4 rounded-lg">
          <Users className="h-6 w-6 text-blue-400 mb-2" />
          <p className="text-sm font-medium text-gray-500">Leaderboard</p>
          <ul>
            {ratings.map((r) => (
              <li key={r.employeeId} className="text-gray-700">
                {r.username}: {r.rating}
              </li>
            ))}
          </ul>
        </div>

        {/* 📊 Blockchain Employee Count */}
        <div className="bg-white shadow p-4 rounded-lg">
          <p className="text-sm font-medium text-gray-500">Total Employees (Blockchain)</p>
          <p className="text-2xl font-semibold">{employeeCount !== null ? employeeCount : "Loading..."}</p>
        </div>
      </div>

      {/* 📝 Feedback Section */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Give Feedback</h2>
        <select className="border p-2 rounded mt-2 w-full" disabled={user.username === "bilal"}>
          <option value="">Select an employee</option>
          {employees
            .filter((emp) => emp.username !== user.username)
            .map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.username}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
}
