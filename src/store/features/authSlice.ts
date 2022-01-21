import { createSlice } from "@reduxjs/toolkit";
import { getValue } from '../../utils/localStorage';

const initialState = {
	isAuthenticated: !getValue('token') ? false : true,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAuthenticated: (state, action) => {
			state.isAuthenticated = action.payload;
		},
	},
});

export const { setAuthenticated } = authSlice.actions;

export default authSlice.reducer;
