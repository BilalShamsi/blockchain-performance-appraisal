import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        alert(data.message || "Invalid credentials");
        return;
      }

      localStorage.setItem("loggedInUser", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Check your backend.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <div className="flex justify-center mb-4">
          <Shield className="h-12 w-12 text-indigo-600" />
        </div>
        <h2 className="text-center text-xl font-bold">Performance Chain</h2>
        <form className="mt-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="w-full border p-2 rounded my-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded my-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded mt-2"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
