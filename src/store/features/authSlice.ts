import { createSlice } from "@reduxjs/toolkit";
import { getValue } from '../../utils/localStorage';

const initialState = {
	isAuthenticated: !getValue('token') ? false : true,
	role: !getValue('role') ? '' : getValue('role'),
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAuthenticated: (state, action) => {
			state.isAuthenticated = action.payload;
		},
		setRole: (state, action) => {
			state.role = action.payload;
		},
	},
});

export const { setAuthenticated, setRole } = authSlice.actions;

export default authSlice.reducer;
