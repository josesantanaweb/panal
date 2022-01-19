import { RootState } from '..';

export const openSidebarSelector = (state: RootState) => state.sidebar.open;
export const isAuthenticatedSelector = (state: RootState) => state.auth.isAuthenticated;
