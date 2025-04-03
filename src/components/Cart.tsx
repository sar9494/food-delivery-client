import { Food } from "@/provider/FoodProvider";
import { ChosenFoodCard } from "./ChosenFoodCard";
import { Dispatch, SetStateAction } from "react";

export const Cart = (props: {
  foodsInCart: {
    food: Food;
    count: number;
  }[];
  setFoodsInCart: Dispatch<
    SetStateAction<
      {
        food: Food;
        count: number;
      }[]
    >
  >;
}) => {
  const { foodsInCart, setFoodsInCart } = props;
  return (
    <div className="flex flex-col py-5 gap-5">
      {foodsInCart &&
        foodsInCart?.map((el: { food: Food; count: number }, index: number) => {
          return (
            <ChosenFoodCard
              key={index}
              food={el.food}
              count={el.count}
              setFoodsInCart={setFoodsInCart}
              foodsInCart={foodsInCart}
            />
          );
        })}
    </div>
  );
};
