import { createContext, useState } from "react";
import { AUTH_TOKEN } from "../utils/constants";

const AuthContext = createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  // localStorage is a synchronous API

  const tokenData = localStorage.getItem(AUTH_TOKEN);

  const [token, setToken] = useState(tokenData);

  const isLoggedIn = !!token;

  const handleLogin = (token) => {
    setToken(token);
    localStorage.setItem(AUTH_TOKEN, token);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem(AUTH_TOKEN);
  };

  const contextValue = {
    token,
    isLoggedIn,
    login: handleLogin,
    logout: handleLogout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
