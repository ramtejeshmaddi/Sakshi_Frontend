import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from "../../api";

const StudentDashboard = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("user_id");
  const [groupIdInput, setGroupIdInput] = useState("");
  const [groups, setGroups] = useState([]);
  const [loading] = useState(false);

  const navigate = useNavigate();

  // ✅ Load joined groups from backend
  useEffect(() => {
    API.get(`/groups/user/${userId}`)
      .then((res) => setGroups(res.data))  // now contains group_id & group_name
      .catch((err) => console.error("Failed to fetch groups", err));
  }, [userId]);
  

  const handleJoinGroup = async () => {
    if (!groupIdInput) return;
  
    try {
      // ✅ Check if group exists (throws 404 if not)
      await API.get(`/groups/${groupIdInput}/quizzes`);
  
      // ✅ Now safe to try joining
      await API.post("/groups/join", {
        user_id: userId,
        group_id: parseInt(groupIdInput),
      });
  
      // ✅ Fetch updated group list
      const res = await API.get(`/groups/user/${userId}`);
      setGroups(res.data);
      setGroupIdInput("");
    } catch (err) {
      const msg = err.response?.data?.detail || "Something went wrong";
  
      if (err.response?.status === 404) {
        alert("Group does not exist!");
      } else if (err.response?.status === 400) {
        alert("You already joined this group.");
      } else {
        alert(msg);
      }
    }
  };
  
  
  const handleLeaveGroup = async (groupId) => {
    try {
      await API.delete("/groups/leave", {
        data: { user_id: userId, group_id: groupId }
      });
      setGroups(groups.filter((g) => g.group_id !== groupId));
    } catch (err) {
      alert("Failed to leave group");
    }
  };
  

  const goToQuizzes = (groupId) => {
    navigate(`/quiz?group_id=${groupId}&user_id=${userId}&role=student`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Welcome, {userId}</h2>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Enter Group ID to Join"
          value={groupIdInput}
          onChange={(e) => setGroupIdInput(e.target.value)}
          className="border p-2 mr-2"
        />
        <button
          onClick={handleJoinGroup}
          className="bg-green-600 text-white px-4 py-2"
        >
          Join Group
        </button>
        {loading && <p className="text-sm text-gray-500">Joining group...</p>}

      </div>

      <h3 className="text-lg font-semibold mb-2">Your Groups</h3>
      <ul className="list-disc pl-6">
      {groups.map((group, idx) => (
        <li key={idx} className="mb-2 flex items-center justify-between">
            <button
            onClick={() => goToQuizzes(group.group_id)}
            className="text-blue-600 underline"
            >
            {group.group_name} (ID: {group.group_id})
            </button>

            <button
            onClick={() => handleLeaveGroup(group.group_id)}
            className="text-red-600 text-sm ml-4"
            >
            Leave ❌
            </button>
        </li>
        ))}

      </ul>
    </div>
  );
};

export default StudentDashboard;
