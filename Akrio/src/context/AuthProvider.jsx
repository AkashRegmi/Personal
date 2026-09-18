import { useEffect, useState } from "react";
// createContext() creates a place where we will store: // // - user // - accessToken // - isAuthenticated // - login() // - logout()
import { AuthContext } from "./AuthContext";
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      return null;
    }
    try {
      return JSON.parse(savedUser);
    } catch (error) {
      localStorage.removeItem("user");

      return null;
    }
  });

  //for the accesstoken
  const [accessToken, setAccessToken] = useState(() => {
    return localStorage.getItem("accessToken");
  });
  const [refreshToken, setRefreshToken] = useState(() => {
    return localStorage.getItem("refreshToken");
  });
  //If we have the both f the user and the accessToken then we the frontend me the person is authentocares
  const isAuthenticated = Boolean(user && accessToken);
  const login = (newAccessToken, newRefreshToken, newUser) => {
    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken);
    setUser(newUser);
    localStorage.setItem("accessToken", newAccessToken);

    localStorage.setItem("refreshToken", newRefreshToken);

    localStorage.setItem("user", JSON.stringify(newUser));
  };
  const logout = () => {
    // Clear React state
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);

    // Clear localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    } else {
      localStorage.removeItem("accessToken");
    }

    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    } else {
      localStorage.removeItem("refreshToken");
    }
  }, [user, accessToken, refreshToken]);
  return (
    // Everything inside "value" becomes available to components
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        refreshToken,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
