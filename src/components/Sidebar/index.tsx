import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
	BiCategory,
	BiBuildings,
	BiHome,
	BiDetail,
	BiGroup,
	BiUser,
	BiClipboard,
} from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";

import logo from "../../assets/img/logo-small.svg";
import { openSidebarSelector } from 'store/selectors';
import logoWhite from "../../assets/img/logo-white.svg";
import styles from "./styles.module.scss";


const Sidebar = () => {
	// const open = false;
	const openSidebar = useSelector(openSidebarSelector);
	const location = useLocation();
	const { pathname } = location;
	const splitLocation = pathname.split("/");
	const sidebarClasses = [
		styles.sidebar,
		openSidebar ? styles["is-open"] : "",
	].join(' ');

	return (
		<aside className={sidebarClasses}>
			<div className={styles["sidebar-children"]}>
				<div className={styles["sidebar-logo"]}>
					<img src={openSidebar ? logoWhite : logo} alt="logo" />
				</div>
				<div className={styles["sidebar-logo-movil"]}>
					<img src={logo} alt="logo" />
				</div>
				<ul className={styles["sidebar-menu"]}>
					<li className={styles["sidebar-item"]}>
						<Link to="/" className={`${styles['sidebar-link']}`}>
							<BiCategory />
							<span>Dashboard</span>
						</Link>
					</li>
					<li className={styles["sidebar-item"]}>
						<Link to="/" className={`${styles['sidebar-link']} ${splitLocation[1] === "company" ? styles.active : ""}`}>
							<BiBuildings />
							<span>Empresa</span>
						</Link>
					</li>
					<li className={styles["sidebar-item"]}>
						<Link to="/properties" className={`${styles['sidebar-link']} ${splitLocation[1] === "properties" ? styles.active : ""}`}>
							<BiHome />
							<span>Propiedades</span>
						</Link>
					</li>
					<li className={styles["sidebar-item"]}>
						<Link to="/orders" className={`${styles['sidebar-link']} ${splitLocation[1] === "properties" ? styles.active : ""}`}>
							<BiDetail />
							<span>Ordenes</span>
						</Link>
					</li>
					<li className={styles["sidebar-item"]}>
						<Link to="/" className={styles["sidebar-link"]}>
							<BiClipboard />
							<span>Reportes</span>
						</Link>
					</li>

					<li className={`${styles['sidebar-item']} ${splitLocation[1] === "clients" ? styles.active : ""}`}>
						<Link to="/clients" className={`${styles['sidebar-link']} ${splitLocation[1] === "clients" ? styles.active : ""}`}>
							<BiGroup />
							<span>Clientes</span>
						</Link>
					</li>
					<li className={`${styles['sidebar-item']} ${splitLocation[1] === "users" ? styles.active : ""}`}>
						<Link to="/users" className={`${styles['sidebar-link']} ${splitLocation[1] === "users" ? styles.active : ""}`}>
							<BiUser />
							<span>Usuarios</span>
						</Link>
					</li>
				</ul>
			</div>
		</aside>
	);
};

export default Sidebar;
