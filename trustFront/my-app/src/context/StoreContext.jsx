import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

//Create Context
export const StoreContext = createContext();

//Create Provider Component
export const StoreProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //Fetch user info from backend after login/signup
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    axios
      .get("http://localhost:5000/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data.user); // backend should return user info
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user info:", err);
        setLoading(false);
      });
  }, []);

  // Function to update user info manually (e.g., after signup)
  const updateUser = (userData) => {
    setUser(userData);
  };

  // Function to clear user info (e.g., on logout)
  const clearUser = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <StoreContext.Provider value={{ user, setUser, updateUser, clearUser, loading }}>
      {children}
    </StoreContext.Provider>
  );
};
