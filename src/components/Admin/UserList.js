import React, { useState, useEffect } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]); // State to hold fetched users
  const [error, setError] = useState(''); // State to handle errors

  useEffect(() => {
    const initializeRecords = async () => {
      try {
        const response = await fetch('http://localhost:5050/api/users/');
        console.log("Response status:", response.status); // Log response status for debugging

        if (!response.ok) {
          console.error(`Error: ${response.statusText}`);
          setError('Failed to fetch users'); // Set error state
          return;
        }

        const data = await response.json();
        console.log("Fetched data:", data); // Log the fetched data

        setUsers(data); // Set users to state
      } catch (error) {
        console.error("Error initializing records:", error);
        setError('Error initializing users'); // Set error state
      }
    };

    initializeRecords();
  }, []); // Empty dependency array ensures this runs only on mount

  // Function to delete a user
  const deleteUser = async (userId) => {
    const confirmation = window.confirm('Are you sure you want to delete this user?');
    if (!confirmation) return;
    try {
      const response = await fetch(`http://localhost:5050/api/users/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      // Update the user state after deletion
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      setError('Error deleting user');
      console.error('Error:', error);
    }
  };

  const recordList = () => {
    return users.map((user, index) => (
      <tr key={index} className="transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
        <td className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
          {user._id} {/* Display user name */}
        </td>
        <td className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
          {user.Name} {/* Display user name */}
        </td>
        <td className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
          {user.Email} {/* Display user email */}
        </td>
        <td className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
          {user.PhoneNumber} {/* Display user phone number */}
        </td>
        <td className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
          {/* Delete Button */}
          <button
            onClick={() => {
              console.log("Deleting order with ID:", user._id);
              deleteUser(user._id);
            }
          }
            
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div>
      <h3 className="text-lg font-semibold p-4">User List</h3>
      <div className="border rounded-lg overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&amp;_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  User ID
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Name
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Email
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Phone Number
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>{recordList()}</tbody>
          </table>
        </div>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default UserList;
