"use client";
import { Header } from "@/components/header/Header";
import { Categories } from "./_features/Categories";
import { useEffect, useState } from "react";
import { getCategories, getFoods } from "@/utils/getDataFunctions";
import { Category, Food } from "@/utils/types";
import { Foods } from "./_features/Foods";
import { useUser } from "@/provider/UserProvider";
export default function Home() {
  const [categories, setCategories] = useState(Array<Category>);
  const [foods, setFoods] = useState(Array<Food>);
  // const { email } = useUser();
  // console.log(email);

  useEffect(() => {
    const fetchData = async () => {
      const categories = await getCategories();
      setCategories(categories);
      const foods = await getFoods();
      setFoods(foods);
    };
    fetchData();
  }, []);
  return (
    <div className=" w-screen bg-gray-700 flex flex-col items-center">
      <Header />
      <img
        src="https://res.cloudinary.com/dszot6j60/image/upload/v1742291965/BG_ejsubm.png"
        alt=""
      />
      <div className="w-4/5 p-5 flex flex-col gap-5">
        <Categories categories={categories} />
        <Foods categories={categories} foods={foods} />
      </div>
    </div>
  );
}
