export type Food = {
  _id: string;
  foodName: string;
  price: number;
  ingredients: string;
  image: string;
  category: {
    name: string;
    id: string;
  };
};
export type Category = {
  categoryName: string;
  _id: string;
};
