import { FoodCard } from "@/components/FoodCard";
import { useFood } from "@/provider/FoodProvider";
import { useCategory } from "@/provider/CategoryProvider";
export const Foods = () => {
  const { foods } = useFood();
  const { categories } = useCategory();
  return (
    <div className="w-full text-white text-xl font-bold ">
      {categories
        ?.filter((category) => category.foodCount !== 0)
        .map((category, index) => {
          return (
            <div key={index}>
              {category.categoryName}
              <div className="flex gap-5 py-5 flex-wrap">
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
