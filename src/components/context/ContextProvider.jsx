import React, { useState } from "react";
import NotilyContext from "./Context";

const NotilyContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <NotilyContext.Provider
      value={{ user, setUser, loading, setLoading, error, setError }}
    >
      {children}
    </NotilyContext.Provider>
  );
};

export default NotilyContextProvider;
