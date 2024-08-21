import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const userContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Fetch user profile data on mount
    const fetchUser = async () => {
      try {
        const { data } = await axios.get('/profile');
        if (data && data.role) { // Ensure data has a role field
          setUser(data);
        } else {
          console.error("Unexpected user data format:", data);
        }
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
      } finally {
        setLoading(false); // Set loading to false after fetch is complete
      }
    };

    fetchUser();
  }, []); // Empty dependency array to only run on mount

  if (loading) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};
