import axios from "axios";
export const getCategories = async () => {
  const response = await axios.get("http://localhost:4000/category");
  return response.data;
};
export const getFoods = async () => {
  const response = await axios.get("http://localhost:4000/foods");
  return response.data;
};
