import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import axios from "axios";
import BASE_URL from "@/constants/Endpoint";
import { IUser } from "@/lib/interfaces";

interface UserState {
  token: null | string;
  user: null | IUser;
  loading: boolean;
  appLoadingState: boolean;
  isAuthenticated: boolean;
  redirectTo: string;
}

const initialState: UserState = {
  token: null,
  user: null,
  loading: false,
  appLoadingState: true,
  isAuthenticated: false,
  redirectTo: "",
};

const slice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    loading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    appLoadingState: (state, action: PayloadAction<boolean>) => {
      state.appLoadingState = action.payload;
    },
    token: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    user: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
    },
    isAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    redirectTo: (state, action: PayloadAction<string>) => {
      state.redirectTo = action.payload;
    },
  },
});

export default slice.reducer;

export const Token = () => {
  return (dispatch: AppDispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(slice.actions.token(token));
      dispatch(slice.actions.isAuthenticated(true));
    }
    dispatch(slice.actions.appLoadingState(false));
  };
};

export const RedirectedTo = (pathname: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(slice.actions.redirectTo(pathname));
  };
};

export const UserDetails = (token: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(Token());
      dispatch(slice.actions.user(data?.data));
    } catch (error: any) {
      console.log(error.message)
      // dispatch(Logout());
    }
  };
};

export const Logout = () => {
  return (dispatch: AppDispatch) => {
    dispatch(slice.actions.token(null));
    dispatch(slice.actions.isAuthenticated(false));
    localStorage.removeItem("token");
  };
};
