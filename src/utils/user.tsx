import axios from "axios";
export const updateUser = async (values: {
  token: string | null;
  phoneNumber?: number;
  address?: string;
}) => {
  try {
    const response = await axios.put(
      "http://localhost:4000/user/login",
      values
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
