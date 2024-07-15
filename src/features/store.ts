import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import workspaceReducer from "./workspaceSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        workspace: workspaceReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch