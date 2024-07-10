import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  token: null | string;
  user: null | string;
  loading: boolean;
}

const initialState: UserState = {
  token: "shfuhshuf",
  user: null,
  loading: false,
};

const slice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    token: (state, action) => {
      state.token = action.payload;
    },
  },
});

export default slice.reducer;
