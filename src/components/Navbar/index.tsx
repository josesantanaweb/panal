import React, { useState } from "react";
import { BiMenu } from "react-icons/bi";
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';

import UserMenu from "./components/UserMenu";

import { setOpenSidebar } from "store/features/sidebarSlice";
import { openSidebarSelector } from 'store/selectors';
import styles from "./styles.module.scss";
import AuthServices from 'services/authServices';
import { removeItem } from "utils/localStorage";
import { setAuthenticated } from 'store/features/authSlice';

const Navbar = () => {
	const dispatch = useDispatch();
	const openSidebar = useSelector(openSidebarSelector);
	const [openUserMenu, setOpenUserMenu] = useState<boolean>(false);
	const { data, isLoading, isError} = useQuery('test', AuthServices.testSession, {
		onError: (error: any) => {
			if(error.response.data.statusCode === 401) {
				removeItem('token');
				dispatch(setAuthenticated(false));
			}
		}
	});

	const headerClasses = [
		styles.header,
		openSidebar ? styles["is-open"] : "",
	].join(' ');

	const handleOpenSidebar = () => {
		dispatch(setOpenSidebar(!openSidebar));
	};

	const handleOpenUserMenu = () => {
		setOpenUserMenu(!openUserMenu);
	};

	return (
		<header className={headerClasses}>
			<div className={styles['header-toggle']} onClick={handleOpenSidebar}>
				<BiMenu />
			</div>
			<div className={styles['header-menu']}>
				<UserMenu handleOpenUserMenu={handleOpenUserMenu} openUserMenu={openUserMenu} />
			</div>
		</header>
	);
};

export default Navbar;
