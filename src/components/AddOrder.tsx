import { Food } from "@/utils/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { IncreaseDecreaseButton } from "./increaseDecreaseButton";

export const AddOrder = ({ food }: { food: Food }) => {
  const [foodCount, setCount] = useState(1);

  const addToCart = () => {
    const chosenFoods = JSON.parse(localStorage.getItem("chosenFoods") || "[]");
    const isChosenBefore = chosenFoods.filter(
      (el: { food: Food; count: string }) => el.food._id === food._id
    );
    if (isChosenBefore.length === 0) {
      const updatedFoods = [...chosenFoods, { food, count: foodCount }];
      localStorage.setItem("chosenFoods", JSON.stringify(updatedFoods));
      const totalPrice = parseInt(localStorage.getItem("totalPrice") || "0");
      const price = food.price * foodCount;
      localStorage.setItem("totalPrice", (totalPrice + price).toString());
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="absolute bg-white rounded-full p-2 bottom-4 right-4">
          <Plus color="red" size={16} />
        </div>
      </DialogTrigger>
      <DialogContent className="bg-white rounded p-5 sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex gap-5 ">
          <div className="rounded-lg h-[360px] overflow-hidden ">
            <img
              src={food.image}
              alt="food image"
              className=" h-full object-cover"
            />
          </div>
          <div className="h-full flex flex-col justify-between">
            <div>
              <p className="text-red-500 text-xl font-bold">{food.foodName}</p>
              <p>{food.ingredients}</p>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex gap-3 w-[300px] justify-between">
                <div>
                  <p>Total price</p>
                  <p>{food.price * foodCount}</p>
                </div>
                <IncreaseDecreaseButton
                  foodInfo={{ food, count: foodCount }}
                  setCount={setCount}
                />
              </div>
              <Button className="w-full rounded-full" onClick={addToCart}>
                Add to card
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
