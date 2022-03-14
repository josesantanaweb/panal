import React from "react";
import { BiChevronDown, BiUser, BiCog, BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import user from "assets/img/user.jpg";
import styles from "./styles.module.scss";
import {UserMenuProps} from "./types";
import { removeItem } from "utils/localStorage";
import { setAuthenticated } from 'store/features/authSlice';
import { usernameSelector } from 'store/selectors';

const UserMenu: React.FC<UserMenuProps> = ({ openUserMenu, handleOpenUserMenu }) => {
	const username = useSelector(usernameSelector);
	const dispatch = useDispatch();
	const userMenuClasses = [
		styles['user-options'],
		openUserMenu ? styles['user-options-open'] : "",
	].join(' ');

	const logout = () => {
		removeItem('token');
		dispatch(setAuthenticated(false));
	};

	return (
		<div className={styles['user-menu']} onClick={handleOpenUserMenu}>
			<div className={styles['user-dropdown']}>
				<img src={user} alt="user" />
				<p>{username}</p>
				<BiChevronDown />
			</div>
			<div className={userMenuClasses}>
				<Link to="/profile">
					<BiUser />
					<p>Mi Perfil</p>
				</Link>
				<li>
					<BiCog />
					<p>Configuracion</p>
				</li>
				<li onClick={logout}>
					<BiLogOut />
					<p>Salir</p>
				</li>
			</div>
		</div>
	);
};

export default UserMenu;
