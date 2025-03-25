import { IncreaseDecreaseButton } from "@/components/increaseDecreaseButton";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Food } from "@/utils/types";
import { ShoppingCart, X } from "lucide-react";
import { useEffect, useState } from "react";
import { number } from "yup";

export const ChosenFoods = () => {
  const foodsInCart = JSON.parse(localStorage.getItem("chosenFoods") || "[]");
  const [foodCount, setFoodCount] = useState(1);
  console.log("foodsInCart", foodsInCart);
  const totalPrice = parseInt(localStorage.getItem("totalPrice") || "0");

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="rounded-full py-3 px-3 bg-white">
          <ShoppingCart color="black" />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[480px] bg-[#404040] rounded-2xl">
        <SheetHeader>
          <SheetTitle>
            <div className="flex gap-2 text-white ">
              <ShoppingCart />
              <p>Order detail</p>
            </div>
          </SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-5">
          <div className="w-full flex p-2 bg-white rounded-full">
            <Button className="w-1/2 rounded-full ">Cart</Button>
            <Button className="w-1/2 rounded-full">Order</Button>
          </div>
          <div className="p-5 bg-white rounded-2xl">
            <p className="text-xl font-semibold">My cart</p>
            <div className="flex flex-col py-5 gap-5">
              {foodsInCart.map(
                (el: { food: Food; count: number }, index: number) => {
                  return (
                    <div key={index} className="flex gap-5 w-full">
                      <img
                        src={el.food.image}
                        alt="food image"
                        className="w-[125px] h-[125px] rounded-xl"
                      />
                      <div className="w-full flex flex-col justify-between">
                        <div className="flex justify-between w-full">
                          <div>
                            <p className="text-xl font-semibold text-red-500">
                              {el.food.foodName}
                            </p>
                            <p>{el.food.ingredients}</p>
                          </div>
                          <X
                            color="red"
                            size={40}
                            className="border-red-500 border rounded-full p-2"
                          />
                        </div>
                        <div className="flex justify-between">
                          <IncreaseDecreaseButton foodInfo={el} />
                          <p className="text-xl font-semibold">
                            ${el.food.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
            <Button className="w-full bg-white rounded-full hover:text-white hover:bg-red-500 border border-red-500 text-red-500">
              Add food
            </Button>
          </div>
          <div className="bg-white p-5 rounded-2xl">
            <p className="text-xl font-semibold">Payment info</p>
            <div className="flex">
              <p>items</p>
              <p>{totalPrice}</p>
            </div>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
