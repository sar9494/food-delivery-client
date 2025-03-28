"use client";
import axios from "axios";
import React, { useState, createContext, useContext, useEffect } from "react";
export type Food = {
  _id: string;
  foodName: string;
  price: number;
  ingredients: string;
  image: string;
  category: {
    name: string;
    id: string;
  };
};
type FoodOrderContextType = {
  foods: Food[];
  getFoods: () => void;
};
const FoodOrderContext = createContext<FoodOrderContextType>(
  {} as FoodOrderContextType
);
export const FoodProvider = ({ children }: { children: React.ReactNode }) => {
  const [foods, setFoods] = useState<Food[]>([]);

  const getFoodInfo = async () => {
    const response = await axios.get("http://localhost:4000/foodOrders");
    setFoods(response.data);
  };
  useEffect(() => {
    getFoodInfo();
  }, []);
  return (
    <FoodOrderContext.Provider
      value={{
        foods: foods,
        getFoods: getFoodInfo,
      }}
    >
      {children}
    </FoodOrderContext.Provider>
  );
};
export const useFood = () => {
  const context = useContext(FoodOrderContext);
  if (!context) {
    console.log("context is not defined");
  }
  return context;
};
