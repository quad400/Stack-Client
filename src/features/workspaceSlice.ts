import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import { ICard } from "@/lib/interfaces";

type ModalType = "createWorkspace" | "createBoard" | "cardModal" | null;

type ModalData = ICard | undefined;

interface WorkspaceState {
  showModal: boolean;
  modalType: ModalType;
  data: ModalData;
}

const initialState: WorkspaceState = {
  showModal: false,
  modalType: null,
  data: undefined,
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
