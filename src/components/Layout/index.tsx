import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";

import styles from "./styles.module.scss";
import { setOpenSidebar } from "store/features/sidebarSlice";
import useOnClickOutside from 'hooks/useOnClickOutside';
import { openSidebarSelector } from 'store/selectors';


const Layout:React.FC = ({children}) => {
	const openSidebar = useSelector(openSidebarSelector);
	const dispatch = useDispatch();

	const ref = useRef(null);

	const handleClickOutside = () => {
		dispatch(setOpenSidebar(false));
	};

	useOnClickOutside(ref, handleClickOutside);

	const layoutClasses = [
		styles["layout-main"],
		openSidebar ? styles["is-open"] : "",
	].join(' ');

	return (
		<div className={styles.layout}>
			<Sidebar/>
			{/* <div ref={ref}>
				<Navbar/>
			</div> */}
			<Navbar/>
			<div className={layoutClasses}>
				<div className={styles["layout-content"]}>
					{children}
				</div>
			</div>
		</div>
	);
};

export default Layout;
