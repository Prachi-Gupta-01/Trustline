import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create Context
export const StoreContext = createContext();

// Create Provider
export const StoreProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch user info from backend
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Handle both possible response formats
        const fetchedUser = res.data.user || res.data;

        // ✅ Store user in state
        setUser(fetchedUser);
      } catch (err) {
        console.error("Error fetching user info:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // ✅ Utility functions
  const updateUser = (userData) => setUser(userData);

  const clearUser = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // ✅ Direct variables for easier access
  const username = user?.username || "";
  const email = user?.email || "";
  const role = user?.role || "";
  const department = user?.department || "";
  const position = user?.position || "";
  const phone = user?.phone || "";

  // ✅ Provide everything globally
  return (
    <StoreContext.Provider
      value={{
        user,
        setUser,
        updateUser,
        clearUser,
        loading,
        username,
        email,
        role,
        department,
        position,
        phone,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
