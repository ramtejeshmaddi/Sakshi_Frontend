import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const RoleRedirect = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("user_id");
  const role = searchParams.get("role");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId || !role) {
      alert("Missing user ID or role.");
      navigate("/");
      return;
    }

    if (role === "admin") {
      navigate(`/admin/dashboard?user_id=${userId}`);
    } else if (role === "student") {
      navigate(`/student/dashboard?user_id=${userId}`);
    } else {
      alert("Unknown role.");
      navigate("/");
    }
  }, [userId, role, navigate]);

  return <p>Redirecting...</p>;
};

export default RoleRedirect;
