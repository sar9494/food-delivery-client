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
  }) => Promise<unknown>;
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
      console.log(parsedUser.id);

      try {
        const response = await axios.post(
          "https://food-delivery-service-bx3v.onrender.com/user",
          {
            id: parsedUser.id,
          }
        );
        console.log(response.data);

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
      await axios.put(
        "https://food-delivery-service-bx3v.onrender.com/user",
        values
      );
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
