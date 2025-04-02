import { Button } from "@/components/ui/button";
import { useCategory } from "@/provider/CategoryProvider";

export const Categories = () => {
  const { categories } = useCategory();
  return (
    <div className="w-full flex gap-2  ">
      {categories
        ?.filter((category) => category.foodCount > 0)
        ?.map((category, index) => {
          return (
            <Button key={index} className="rounded-full bg-white text-black ">
              {category.categoryName}
            </Button>
          );
        })}
    </div>
  );
};
