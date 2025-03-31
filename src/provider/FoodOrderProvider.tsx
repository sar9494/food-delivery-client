"use client";
import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";
import React, { createContext, useContext } from "react";
import { useUser } from "./UserProvider";
export type FoodOrder = {
  food: string;
  quantity: number;
};
type FoodOrderContextType = {
  orders: FoodOrder[];
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>;
  updateFoodOrders: (
    newOrder: {
      food: string;
      quantity: number;
    }[]
  ) => Promise<void>;
};
const FoodOrderContext = createContext<FoodOrderContextType>(
  {} as FoodOrderContextType
);
export const FoodOrderProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useUser();
  const {
    data: orders,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["foodOrders"],
    queryFn: async () => {
      try {
        const response = await axios.get("http://localhost:4000/foodOrders");
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
  const updateFoodOrders = async (
    newOrder: {
      food: string;
      quantity: number;
    }[]
  ) => {
    const response = await axios.post("http://localhost:4000/foodOrders", {
      user: user._id,
      totalPrice: parseFloat(localStorage.getItem("totalPrice") || "0"),
      foodOrderItems: newOrder,
    });
    return response.data;
  };
  return (
    <FoodOrderContext.Provider
      value={{
        orders: orders,
        refetch: refetch,
        updateFoodOrders: updateFoodOrders,
      }}
    >
      {isLoading && children ? <div>...Loading</div> : children}
    </FoodOrderContext.Provider>
  );
};
export const useFoodOrder = () => {
  const context = useContext(FoodOrderContext);
  if (!context) {
    console.log("context is not defined");
  }
  return context;
};
