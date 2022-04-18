import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
	open: true,
};

export const sidebarSlice = createSlice({
	name: 'sidebar',
	initialState,
	reducers: {
		setOpenSidebar: (state, action) => {
			state.open = action.payload;
		},
	},
});

export const { setOpenSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
