"use client";
import axios from "axios";
import React, { useState, createContext, useContext, useEffect } from "react";
export type Category = {
  categoryName: string;
  _id: string;
  foodCount: number;
};
type CategoryContextType = {
  categories: Category[];
  getCategories: () => void;
};
const CategoryContext = createContext<CategoryContextType>(
  {} as CategoryContextType
);
export const CategoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [categories, setCategories] = useState<Category[]>([]);

  const getCategories = async () => {
    const response = await axios.get("http://localhost:4000/category");
    setCategories(response.data);
  };
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        categories: categories,
        getCategories: getCategories,
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
