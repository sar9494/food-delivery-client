import { Minus, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Dispatch, MouseEventHandler, SetStateAction, useState } from "react";
import { Food } from "@/utils/types";

export const IncreaseDecreaseButton = (props: {
  foodInfo: {
    food: Food;
    count: number;
  };
  setCount?: Dispatch<SetStateAction<number>>;
}) => {
  const { foodInfo } = props;
  const [foodCount, setFoodCount] = useState(foodInfo.count);

  const handleFoodCount = (
    foodInfo: { food: Food; count: number },
    number?: number
  ) => {
    const chosenFoods = JSON.parse(
      localStorage.getItem("chosenFoods") || "[]"
    ).filter((el: { food: Food; count: number }) => {
      return el.food._id !== foodInfo.food._id;
    });
    console.log("handle", chosenFoods);

    // const isChosenBefore = chosenFoods.filter(
    //   (el: { food: Food; count: string }) => el.food._id === foodInfo.food._id
    // );
    // if (isChosenBefore) {
    //   // localStorage.setItem("chosenFoods", JSON.stringify(updatedFoods));
    //   const totalPrice = parseInt(localStorage.getItem("totalPrice") || "0");
    //   const price = foodInfo.food.price * (foodCount + number);
    //   localStorage.setItem("totalPrice", (totalPrice + price).toString());
    // }
  };
  return (
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
  );
};
