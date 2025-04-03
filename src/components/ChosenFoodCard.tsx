import { X, Minus, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Food } from "@/provider/FoodProvider";
import { Dispatch, SetStateAction, useState } from "react";

export const ChosenFoodCard = (props: {
  food: Food;
  count: number;
  setFoodsInCart: Dispatch<
    SetStateAction<
      {
        food: Food;
        count: number;
      }[]
    >
  >;
  foodsInCart: { food: Food; count: number }[];
}) => {
  const { food, count, setFoodsInCart, foodsInCart } = props;
  const [foodCount, setFoodCount] = useState(count);

  const handleFoodCount = (number: number) => {
    setFoodCount(foodCount + number);
    const foodw = foodsInCart.filter((el: { food: Food }) => {
      return el.food._id === food._id;
    });

    const updatedList = foodsInCart.filter((el: { food: Food }) => {
      return el.food._id !== food._id;
    });

    updatedList.push({ ...foodw[0], count: foodCount + number });
    setFoodsInCart(updatedList);
    localStorage.setItem("chosenFoods", JSON.stringify(updatedList));
  };

  const deleteFromCart = () => {
    const deletedList = foodsInCart.filter((el: { food: Food }) => {
      return el.food._id !== food._id;
    });
    setFoodsInCart(deletedList);

    localStorage.setItem("chosenFoods", JSON.stringify(deletedList));
  };

  return (
    <div className="flex gap-5 w-full">
      <div className="w-[150px] h-[125px] rounded-xl overflow-hidden">
        <img src={food.image} alt="food image" className="w-full h-full " />
      </div>

      <div className="w-full flex flex-col justify-between">
        <div className="flex justify-between w-full">
          <div>
            <p className="text-xl font-semibold text-red-500">
              {food.foodName}
            </p>
            <p>{food.ingredients}</p>
          </div>
          <div onClick={deleteFromCart} style={{ cursor: "pointer" }}>
            <X
              color="red"
              size={40}
              onClick={deleteFromCart}
              className="border-red-500 border rounded-full p-2 "
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <Button
              className="bg-white border-gray-500 rounded-full border p-3"
              onClick={() => handleFoodCount(-1)}
              disabled={foodCount === 1}
            >
              <Minus color="black" />
            </Button>
            <p>{foodCount}</p>
            <Button
              className="bg-white border-gray-500 rounded-full border p-3"
              onClick={() => handleFoodCount(1)}
            >
              <Plus color="black" />
            </Button>
          </div>
          <p className="text-xl font-semibold">${food.price * foodCount}</p>
        </div>
      </div>
    </div>
  );
};
