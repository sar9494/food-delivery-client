import { Category, Food } from "@/utils/types";
import { FoodCard } from "@/components/FoodCard";
export const Foods = ({
  foods,
  categories,
}: {
  foods: Array<Food>;
  categories: Array<Category>;
}) => {
  return (
    <div className="w-full text-white text-xl font-bold">
      {categories.map((category, index) => {
        return (
          <div key={index}>
            {category.categoryName}
            <div className="flex gap-5 py-5">
              {foods
                .filter((el) => el.category.id === category._id)
                .map((el, index) => {
                  return <FoodCard key={index} food={el} />;
                })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
