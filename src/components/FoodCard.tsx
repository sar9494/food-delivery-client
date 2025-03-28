import { Food } from "@/provider/FoodProvider";
import { AddOrderModal } from "./AddOrderModal";

export const FoodCard = ({ food }: { food: Food }) => {
  return (
    <div className="p-4 w-[300px] h-[270px] rounded-lg  border border-gray-200 flex flex-col gap-3 bg-white">
      <div className="w-full h-3/5 rounded-lg flex  gap-5 relative">
        <img
          src={food.image}
          alt=""
          className="rounded-lg w-full object-cover"
        />
        <AddOrderModal food={food} />
      </div>
      <div>
        <div className="flex justify-between">
          <p className="text-red-500">{food.foodName}</p>
          <p>${food.price}</p>
        </div>
        <p className="text-sm text-black">{food.ingredients}</p>
      </div>
    </div>
  );
};
