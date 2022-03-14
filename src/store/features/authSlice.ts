import { createSlice } from "@reduxjs/toolkit";
import { getValue } from '../../utils/localStorage';

const initialState = {
	isAuthenticated: !getValue('token') ? false : true,
	role: !getValue('role') ? '' : getValue('role'),
	username: !getValue('username') ? '' : getValue('username'),
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
		setUsername: (state, action) => {
			state.username = action.payload;
		},
	},
});

export const { setAuthenticated, setRole, setUsername } = authSlice.actions;

export default authSlice.reducer;
