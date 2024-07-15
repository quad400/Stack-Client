import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import axios from "axios";
import BASE_URL from "@/constants/Endpoint";
import { toast } from "sonner";
import { IUser } from "@/lib/interfaces";

interface UserState {
  token: null | string;
  user: null | IUser;
  loading: boolean;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  token: null,
  user: null,
  loading: false,
  isAuthenticated: false,
};

const slice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    token: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    user: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
    },
    isAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export default slice.reducer;

export const Token = () => {
  return (dispatch: AppDispatch) => {
    const token = localStorage.getItem("token");
    dispatch(slice.actions.token(token));
    dispatch(slice.actions.isAuthenticated(true));
  };
};

export const UserDetails = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(`${BASE_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(Token());
      dispatch(slice.actions.user(data?.data));
    } catch (error: any) {
      localStorage.removeItem("token");
    }
  };
};
