import React, { useState, useEffect } from 'react';
import { BiChevronDown, BiUser, BiCog, BiLogOut } from 'react-icons/bi';
import { AiFillEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import user from 'assets/img/user.jpg';
import styles from './styles.module.scss';
import { UserMenuProps } from './types';

const UserMenu: React.FC<UserMenuProps> = ({
	title,
	// options,
}) => {
	const [openMenu, setOpen] = useState<boolean>(false);
	const handleOpen = () => {
		setOpen(!openMenu);
	};
	const userMenuClasses = [
		styles['user-options'],
		openMenu ? styles['user-options-open'] : '',
	].join(' ');

	return (
		<div className={styles['user-menu']} onClick={handleOpen}>
			<div className={styles['user-dropdown']}>
				<p>{title}</p>
			</div>
			<div className={userMenuClasses}>
				<Link to="/profile">
					<AiFillEye />
					<p>Ver informacion</p>
				</Link>
			</div>
		</div>
	);
};

export default UserMenu;
