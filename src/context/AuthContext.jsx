import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

// NOTE: This is a demo login (the assignment has no backend).
// We never store the password, only the username.
const loadUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadUser);

  const login = (username, password) => {
    // Dummy validation, replace with a real backend call if one exists
    if (username.trim().length < 3 || password.length < 6) {
      return { ok: false, message: "Invalid username or password." };
    }
    const newUser = { username: username.trim() };
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
    return { ok: true };
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);