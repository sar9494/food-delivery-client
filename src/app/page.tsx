"use client";
import { Header } from "@/components/header/Header";
import { Categories } from "./_features/Categories";
import { Foods } from "./_features/Foods";
export default function Home() {
  return (
    <div className=" w-screen bg-gray-700 flex flex-col items-center">
      <Header />
      <img
        src="https://res.cloudinary.com/dszot6j60/image/upload/v1742291965/BG_ejsubm.png"
        alt="main image"
      />
      <div className="w-4/5 p-5 flex flex-col gap-5">
        <Categories />
        <Foods />
      </div>
    </div>
  );
}
