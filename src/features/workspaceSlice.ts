import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import { IBoard, ICard, IList, IWorkspace } from "@/lib/interfaces";
import axios from "axios";
import BASE_URL from "@/constants/Endpoint";
import { toast } from "sonner";
import queryString from "query-string";

type ModalType =
  | "createWorkspace"
  | "createBoard"
  | "cardModal"
  | "manageMember"
  | null;

interface WorkspaceState {
  showModal: boolean;
  modalType: ModalType;
  card: ICard | undefined;
  data: string | undefined;
  loading: boolean;
  workspace: IWorkspace | null;
  board: IBoard | null;
  workspaces: IWorkspace[] | [];
  lists: IList[] | [];
}

const initialState: WorkspaceState = {
  showModal: false,
  modalType: null,
  data: undefined,
  card: undefined,
  workspace: null,
  loading: false,
  board: null,
  lists: [],
  workspaces: [],
};

const slice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    showModal: (state, action: PayloadAction<boolean>) => {
      state.showModal = action.payload;
    },
    loading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    modalType: (state, action: PayloadAction<ModalType>) => {
      state.modalType = action.payload;
    },
    data: (state, action: PayloadAction<string | undefined>) => {
      state.data = action.payload;
    },
    card: (state, action: PayloadAction<ICard | undefined>) => {
      state.card = action.payload;
    },
    workspace: (state, action: PayloadAction<IWorkspace | null>) => {
      state.workspace = action.payload;
    },
    board: (state, action: PayloadAction<IBoard | null>) => {
      state.board = action.payload;
    },
    workspaces: (state, action: PayloadAction<IWorkspace[] | []>) => {
      state.workspaces = action.payload;
    },
    lists: (state, action: PayloadAction<IList[] | []>) => {
      state.lists = action.payload;
    },
  },
});

export default slice.reducer;

export const ShowModal = (
  payload: boolean,
  type: ModalType,
  card?: ICard | undefined,
  data?: string | undefined
) => {
  return (dispatch: AppDispatch) => {
    dispatch(slice.actions.showModal(payload));
    dispatch(slice.actions.modalType(type));
    dispatch(slice.actions.card(card));
    dispatch(slice.actions.data(data));
  };
};

export const CloseModal = () => {
  return (dispatch: AppDispatch) => {
    dispatch(slice.actions.showModal(false));
    dispatch(slice.actions.modalType(null));
    dispatch(slice.actions.card(undefined));
    dispatch(slice.actions.data(undefined));
  };
};

export const WorkspaceDispatch = (data: IWorkspace) => {
  return (dispatch: AppDispatch) => {
    dispatch(slice.actions.workspace(data));
  };
};

export const GetWorkspacesDispatch = () => {
  return async (dispatch: AppDispatch) => {
    const token = localStorage.getItem("token");

    try {
      dispatch(slice.actions.loading(true));

      const { data } = await axios.get(`${BASE_URL}/workspaces`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(slice.actions.workspaces(data.data));
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    } finally {
      dispatch(slice.actions.loading(false));
    }
  };
};

export const GetWorkspaceDispatch = (workspaceId: string) => {
  return async (dispatch: AppDispatch) => {
    const token = localStorage.getItem("token");

    try {
      dispatch(slice.actions.loading(true));

      const { data } = await axios.get(
        `${BASE_URL}/workspaces/${workspaceId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(slice.actions.workspace(data.data));
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      dispatch(slice.actions.loading(false));
    }
  };
};

export const UpdateWorkspaceDispatch = (workspaceId: string, body: any) => {
  return async (dispatch: AppDispatch) => {
    const token = localStorage.getItem("token");

    try {
      dispatch(slice.actions.loading(true));
      await axios.patch(`${BASE_URL}/workspaces/${workspaceId}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(GetWorkspaceDispatch(workspaceId));
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    } finally {
      dispatch(slice.actions.loading(false));
    }
  };
};

export const GetBoardDispatch = (boardId: string, bypass: boolean = false) => {
  return async (dispatch: AppDispatch) => {
    const token = localStorage.getItem("token");

    try {
      if (!bypass) {
        dispatch(slice.actions.loading(true));
      }

      const { data } = await axios.get(`${BASE_URL}/boards/${boardId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(slice.actions.board(data.data));
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    } finally {
      dispatch(slice.actions.loading(false));
    }
  };
};

export const ListDispatch = (body: IList[]) => {
  return async (dispatch: AppDispatch, getState: any) => {
    const token = localStorage.getItem("token");

    dispatch(slice.actions.lists(body));

    const { board } = getState().workspace;
    const url = queryString.stringifyUrl({
      url: `${BASE_URL}/lists/reorder`,
      query: {
        boardId: board?._id,
        workspaceId: board?.workspaceId,
      },
    });

    try {
      const { data } = await axios.post(url, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    } finally {
      dispatch(slice.actions.loading(false));
    }
  };
};

export const CardDispatch = (body: IList[]) => {
  return async (dispatch: AppDispatch, getState: any) => {
    const token = localStorage.getItem("token");

    dispatch(slice.actions.lists(body));

    const { board } = getState().workspace;
    const url = queryString.stringifyUrl({
      url: `${BASE_URL}/cards/reorder`,
      query: {
        workspaceId: board?.workspaceId,
      },
    });

    try {
      const { data } = await axios.post(url, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    } finally {
      dispatch(slice.actions.loading(false));
    }
  };
};

export const GetListCardDispatch = (boardId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(`${BASE_URL}/lists?boardId=${boardId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(slice.actions.lists(data.data));
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
};

// export const UpdateListDispatch = (data: Record<string, any>, )
