"use client";
import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  use,
} from "react";
type UserContextType = {
  email: string | undefined;
  address: string | undefined;
  role: string | undefined;
};
const UserContext = createContext<UserContextType | undefined>(undefined);
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserContextType | undefined>(undefined);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // setUser(parsedUser.date);
        console.log(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
        setUser(undefined);
      }
    } else {
      setUser(undefined);
    }
  }, []);

  if (!window) {
    return null;
  }
  return (
    <UserContext.Provider
      value={{ email: user?.email, role: user?.role, address: user?.address }}
    >
      {/* {children} */}
      {user ? children : <div>...Loading</div>}
    </UserContext.Provider>
  );
};
export const useUser = () => {
  const context = useContext(UserContext);
  return context;
};
