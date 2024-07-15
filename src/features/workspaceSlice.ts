import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./store";
import { IBoard, ICard, IWorkspace } from "@/lib/interfaces";
import axios from "axios";
import BASE_URL from "@/constants/Endpoint";
import { toast } from "sonner";

type ModalType = "createWorkspace" | "createBoard" | "cardModal" | null;

type ModalData = ICard | undefined;

interface WorkspaceState {
  showModal: boolean;
  modalType: ModalType;
  data: ModalData;
  workspace: IWorkspace | null;
  board: IBoard | null;
  workspaces: IWorkspace[] | [];
}

const initialState: WorkspaceState = {
  showModal: false,
  modalType: null,
  data: undefined,
  workspace: null,
  board: null,
  workspaces: [],
};

const slice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    showModal: (state, action: PayloadAction<boolean>) => {
      state.showModal = action.payload;
    },
    modalType: (state, action: PayloadAction<ModalType>) => {
      state.modalType = action.payload;
    },
    data: (state, action: PayloadAction<ModalData>) => {
      state.data = action.payload;
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
  },
});

export default slice.reducer;

export const ShowModal = (
  payload: boolean,
  type: ModalType,
  data?: ModalData
) => {
  return (dispatch: AppDispatch) => {
    dispatch(slice.actions.showModal(payload));
    dispatch(slice.actions.modalType(type));
    dispatch(slice.actions.data(data));
  };
};

export const CloseModal = () => {
  return (dispatch: AppDispatch) => {
    dispatch(slice.actions.showModal(false));
    dispatch(slice.actions.modalType(null));
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
      const { data } = await axios.get(`${BASE_URL}/workspaces`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(slice.actions.workspaces(data.data));
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
};

export const GetWorkspaceDispatch = (workspaceId: string) => {
  return async (dispatch: AppDispatch) => {
    const token = localStorage.getItem("token");

    try {
      const { data } = await axios.get(`${BASE_URL}/workspaces/${workspaceId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(slice.actions.workspace(data.data));
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
};

export const GetBoardDispatch = (boardId: string) => {
  return async (dispatch: AppDispatch) => {
    const token = localStorage.getItem("token");

    try {
      const { data } = await axios.get(`${BASE_URL}/boards/${boardId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(slice.actions.board(data.data));
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
};
