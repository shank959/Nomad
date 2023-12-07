// REACT CONTEXT FOR USER ID

import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext(null);
const URL = "http://172.20.10.11:3000";  // ! SET YOUR LOCAL NETWORK IP ADDRESS HERE

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const backendURL = URL;

  return (
    <UserContext.Provider value={{ userId, setUserId, backendURL }}>
      {children}
    </UserContext.Provider>
  );
};