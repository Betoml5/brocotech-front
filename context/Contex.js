import React, { useEffect, useState } from "react";
export const Context = React.createContext({});

const AuthProvider = ({ children }) => {
  const [jwt, setJwt] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // check if jwt is in localstorage
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    const user = localStorage.getItem("user");
    if (token) {
      setJwt(token);
    }
    if (user) {
      setUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  return (
    <Context.Provider
      value={{
        jwt,
        setJwt,
        user,
        setUser,
        loading,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default AuthProvider;
