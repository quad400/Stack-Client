import BASE_URL from "@/constants/Endpoint";
import axios from "axios";

export const getActivities = async (workspaceId: any) => {
  try {
    const token = localStorage.getItem("token");

    const { data } = await axios.get(
      `${BASE_URL}/activity-logs/?workspaceId=${workspaceId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data.data;
  } catch (error: any) {
    console.log(error);
  }
};
