"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { createContext, useContext } from "react";
type UserType = {
  email: string;
  address: string;
  role: string;
  _id: string;
  orderedFoods: string[];
};
type UserContextType = {
  user: UserType;
  handleLogout: () => void;
  updateUserInfo: (values: {
    id: string | null;
    phoneNumber?: number;
    address?: string;
    orderItem?: { food: string; quantity: number };
  }) => Promise<any>;
  isLoading: boolean;
};
const UserContext = createContext<UserContextType>({} as UserContextType);
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const storedUser = localStorage.getItem("user");
      const parsedUser = JSON.parse(storedUser!);
      try {
        const response = await axios.post("http://localhost:4000/user", {
          id: parsedUser.id,
        });
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/login");
  };

  const updateUserInfo = async (values: {
    id: string | null;
    phoneNumber?: number;
    address?: string;
    orderItem?: { food: string; quantity: number };
  }) => {
    try {
      await axios.put("http://localhost:4000/user", values);
      await refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user: user,
        handleLogout: handleLogout,
        updateUserInfo: updateUserInfo,
        isLoading: isLoading,
      }}
    >
      {isLoading && user ? <div>...loading</div> : children}
    </UserContext.Provider>
  );
};
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    console.log("context is not defined");
  }
  return context;
};
