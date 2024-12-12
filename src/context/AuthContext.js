import { createContext, useState, useContext } from "react";

// Create the context
const AuthContext = createContext();

// Custom hook to use the Auth context
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap the app and provide context values
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User state to track logged-in user

  // Function to log in the user
  const login = (userData) => {
    console.log("Login Data: ", userData);

    // Store each piece of user data under a separate key
    sessionStorage.setItem("userId", userData._id); // Store user ID
    sessionStorage.setItem("userName", userData.Name); // Store user Name
    sessionStorage.setItem("userPhoneNumber", userData.PhoneNumber); // Store user Phone Number

    // Set user data in state for context (if needed)
    setUser({
      userId: userData._id,
      userName: userData.Name,
      userPhoneNumber: userData.PhoneNumber,
    });
  };

  // Function to log out the user
  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("userId"); // Clear user ID from sessionStorage
    sessionStorage.removeItem("userName"); // Clear user Name from sessionStorage
    sessionStorage.removeItem("userPhoneNumber"); // Clear user Phone Number from sessionStorage
  };

  // Check if user is logged in on initial load (from sessionStorage)
  const getInitialUser = () => {
    const userId = sessionStorage.getItem("userId");
    const userName = sessionStorage.getItem("userName");
    const userPhoneNumber = sessionStorage.getItem("userPhoneNumber");

    // If all three fields are present, return them as a user object
    if (userId && userName && userPhoneNumber) {
      return {
        userId,
        userName,
        userPhoneNumber,
      };
    }

    return null;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
