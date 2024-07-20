import BASE_URL from "@/constants/Endpoint";
import axios from "axios";
import { toast } from "sonner";

export const getWorkspace = async (workspaceId: any) => {
  try {
    const token = localStorage.getItem("token");

    const { data } = await axios.get(`${BASE_URL}/workspaces/${workspaceId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

export const deleteWorkspace = async (workspaceId: any) => {
  try {
    const token = localStorage.getItem("token");

    const { data } = await axios.delete(
      `${BASE_URL}/workspaces/${workspaceId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

export const regenerateInviteCode = async (workspaceId: any) => {
  try {
    const token = localStorage.getItem("token");

    await axios.post(`${BASE_URL}/workspaces/${workspaceId}/invite-code`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: any) {
    console.error(error.response.data.message);
  }
};

export const getListById = async (listId: any) => {
  try {
    if (!listId) return;
    const token = localStorage.getItem("token");
    console.log(listId);

    const { data } = await axios.get(`${BASE_URL}/lists/${listId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(data);
    return data.data;
  } catch (error: any) {
    console.log(error);
  }
};
