import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { saveValue, getUserLocalStorage } from 'utils';

const initialState = {
	isAuthenticated: !getUserLocalStorage ? false : true,
	user: getUserLocalStorage || null,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setAuthenticated: (state, action) => {
			state.isAuthenticated = action.payload;
		},
		setUser: (state, action) => {
			state.isAuthenticated = action.payload;
			saveValue('user', action.payload);
		},
	},
});

export const { setAuthenticated, setUser } = userSlice.actions;

export default userSlice.reducer;
