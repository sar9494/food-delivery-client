"use client";
import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";
import { createContext, useContext } from "react";
import { useUser } from "./UserProvider";
export type FoodOrder = {
  createdAt: string;
  foodOrderItems: { foodName: string; quantity: number }[];
  status: string;
  totalPrice: number;
};
type FoodOrderContextType = {
  orders: FoodOrder[];
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<unknown, Error>>;
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
        const response = await axios.post(
          "https://food-delivery-service-bx3v.onrender.com/userfoodOrders",
          { id: user?._id }
        );
        console.log(response);

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
    const response = await axios.post(
      "https://food-delivery-service-bx3v.onrender.com/foodOrders",
      {
        user: user._id,
        totalPrice: parseFloat(localStorage.getItem("totalPrice") || "0"),
        foodOrderItems: newOrder,
      }
    );
    await refetch();
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
