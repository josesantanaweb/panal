import React from "react";
import { useSelector } from "react-redux";

import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";

import styles from "./styles.module.scss";
import { openSidebarSelector } from 'store/selectors';


const Layout:React.FC = ({children}) => {
	const openSidebar = useSelector(openSidebarSelector);
	const layoutClasses = [
		styles["layout-main"],
		openSidebar ? styles["is-open"] : "",
	].join(' ');

	return (
		<div className={styles.layout}>
			<Sidebar/>
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
