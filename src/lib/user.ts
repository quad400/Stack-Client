import BASE_URL from "@/constants/Endpoint";
import axios from "axios";
import { toast } from "sonner";

export const getUser = async (userId: string) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/users/${userId}`);

    return data.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};
