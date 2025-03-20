import axios from "axios";
export const updateUserInfo = async (values: {
  token: string | null;
  phoneNumber?: number;
  address?: string;
}) => {
  console.log(values);

  try {
    const response = await axios.put("http://localhost:4000/user", values);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
