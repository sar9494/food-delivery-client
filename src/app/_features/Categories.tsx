import { Button } from "@/components/ui/button";
import { Category } from "@/utils/types";
export const Categories = ({ categories }: { categories: Array<Category> }) => {
  return (
    <div className="w-full flex gap-2  ">
      {categories.map((category, index) => {
        return (
          <Button key={index} className="rounded-full bg-white text-black">
            {category.categoryName}
          </Button>
        );
      })}
    </div>
  );
};
