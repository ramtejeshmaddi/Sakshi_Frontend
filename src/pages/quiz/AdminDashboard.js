import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import API from "../../api";

const AdminDashboard = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("user_id");
  const [groupName, setGroupName] = useState("");
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  // Fetch groups created by the admin
  useEffect(() => {
    if (!userId) return;

    API.get("/groups")
      .then((res) => {
        const myGroups = res.data.filter((group) => group.created_by === userId);
        setGroups(myGroups);
      })
      .catch((err) => console.error("Failed to fetch groups", err));
  }, [userId]);

  const handleCreateGroup = async () => {
    try {
      const res = await API.post("/groups", {
        name: groupName,
        created_by: userId,
      });

      setGroups((prev) => [...prev, res.data]);
      setGroupName("");
    } catch (err) {
      console.error(err);
      alert("Group creation failed");
    }
  };

  const goToGroup = (groupId) => {
    navigate(`/quiz?group_id=${groupId}&user_id=${userId}&role=admin`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Create New Group</h3>
        <input
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="border p-2 mr-2"
        />
        <button
          onClick={handleCreateGroup}
          className="bg-blue-600 text-white px-4 py-2"
        >
          + Create Group
        </button>
      </div>

      <h3 className="text-lg font-semibold mb-2">Your Groups</h3>
      <ul className="list-disc pl-6">
        {groups.map((group) => (
          <li key={group.id} className="mb-2">
            <button
              onClick={() => goToGroup(group.id)}
              className="text-blue-600 underline"
            >
              {group.name} (ID: {group.id})
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
