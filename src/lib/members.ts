import BASE_URL from "@/constants/Endpoint";
import axios from "axios";
import { toast } from "sonner";

export const getMembers = async (workspaceId: string) => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(`${BASE_URL}/members/?workspaceId=${workspaceId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    return data.data;
  } catch (error: any) {
    console.log(error.response.data.message);
  }
};
