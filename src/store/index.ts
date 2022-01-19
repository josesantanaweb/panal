import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./features/sidebarSlice";
import authReducer from "./features/authSlice";

export const store = configureStore({
	reducer: {
		sidebar: sidebarReducer,
		auth: authReducer,
	},
	devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
