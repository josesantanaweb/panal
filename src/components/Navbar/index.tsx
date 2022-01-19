import React, { useState } from "react";
import { BiMenu } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

import UserMenu from "./components/UserMenu";

import { setOpenSidebar } from "store/features/sidebarSlice";
import { openSidebarSelector } from 'store/selectors';
import styles from "./styles.module.scss";

const Navbar = () => {
	const dispatch = useDispatch();
	const openSidebar = useSelector(openSidebarSelector);
	const [openUserMenu, setOpenUserMenu] = useState<boolean>(false);

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
