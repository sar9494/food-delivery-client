"use client";
import axios from "axios";
import React, { createContext, useContext } from "react";
import {
  useQuery,
  QueryObserverResult,
  RefetchOptions,
} from "@tanstack/react-query";

export type Category = {
  categoryName: string;
  _id: string;
  foodCount: number;
};
type CategoryContextType = {
  categories: Category[];
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<unknown, Error>>;
};
const CategoryContext = createContext<CategoryContextType>(
  {} as CategoryContextType
);
export const CategoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: categories, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axios.get(
        "https://food-delivery-service-bx3v.onrender.com/category"
      );
      return response.data;
    },
  });
  return (
    <CategoryContext.Provider
      value={{
        categories: categories,
        refetch: refetch,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    console.log("context is not defined");
  }
  return context;
};
