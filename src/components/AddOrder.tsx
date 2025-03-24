import { Food } from "@/utils/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Minus } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

export const AddOrder = ({ food }: { food: Food }) => {
  const [foodCount, setFoodCount] = useState(1);
  const [chosenFoods, setChosenFoods] = useState<
    { food: Food; count: number }[]
  >(() => {
    const savedFoods = localStorage.getItem("chosenFoods");
    return savedFoods ? JSON.parse(savedFoods) : [];
  });
  console.log(chosenFoods);

  const addToCart = () => {
    console.log(chosenFoods);

    const isChosenBefore = chosenFoods.filter((el) => el.food._id === food._id);
    if (isChosenBefore.length === 0) {
      const updatedFoods = [...chosenFoods, { food, count: foodCount }];
      setChosenFoods(updatedFoods);
      localStorage.setItem("chosenFoods", JSON.stringify(updatedFoods));
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
          <div className="rounded-lg h-[360px] overflow-hidden">
            <img src={food.image} alt="food image" />
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
                <div className="flex gap-2 items-center">
                  <Button
                    className="bg-white border-gray-500 rounded-full border p-3"
                    onClick={() => setFoodCount(foodCount - 1)}
                    disabled={foodCount === 1}
                  >
                    <Minus color="black" />
                  </Button>
                  <p>{foodCount}</p>
                  <Button
                    className="bg-white border-gray-500 rounded-full border p-3"
                    onClick={() => setFoodCount(foodCount + 1)}
                  >
                    <Plus color="black" />
                  </Button>
                </div>
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
