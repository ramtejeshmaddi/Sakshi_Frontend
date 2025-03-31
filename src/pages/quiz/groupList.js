// This component fetches a list of groups from the backend and displays them.
// It uses the API module to make the request and React hooks for state management.
// It is a simple functional component that uses useEffect to fetch data when the component mounts.
// It also handles errors by logging them to the console.
// The component is exported as the default export of the module.
import React, { useEffect, useState } from 'react';
import API from '../../api.js';

function GroupList() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    API.get('/groups')
      .then((res) => setGroups(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Available Groups</h2>
      <ul>
        {groups.map((group) => (
          <li key={group.id}>{group.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default GroupList;
