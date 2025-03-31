import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MockLogin = () => {
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("student");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!userId) {
      alert("Please enter a user ID");
      return;
    }
    navigate(`/redirect?user_id=${userId}&role=${role}`);
  };

  return (
    <div className="p-6 max-w-md mx-auto text-center">
      <h2 className="text-2xl font-bold mb-4">Mock Login</h2>
      <input
        type="text"
        placeholder="Enter User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="border p-2 w-full mb-4"
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border p-2 w-full mb-4"
      >
        <option value="student">Student</option>
        <option value="admin">Admin</option>
      </select>

      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-6 py-2 w-full"
      >
        Login
      </button>
    </div>
  );
};

export default MockLogin;
