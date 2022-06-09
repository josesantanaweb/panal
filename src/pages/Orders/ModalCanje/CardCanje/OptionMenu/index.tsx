import React, { useState, useEffect } from 'react';
import {
	AiFillEye,
	AiOutlineMail,
	AiOutlineEdit,
	AiOutlineStar,
	AiOutlineDelete,
} from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import user from 'assets/img/user.jpg';
import styles from './styles.module.scss';

const UserMenu: React.FC = (
	{
		// options,
	}
) => {
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
				<BsThreeDots></BsThreeDots>
			</div>
			<div className={userMenuClasses}>
				<div className={styles['user-menu-item']}>
					<Link to="/profile">
						<AiFillEye />
						<p>Ver propiedad</p>
					</Link>
				</div>
				<div className={styles['user-menu-item']}>
					<Link to="/profile">
						<AiOutlineMail />
						<p>Enviar por Email</p>
					</Link>
				</div>
				<div className={styles['user-menu-item']}>
					<Link to="/profile">
						<AiOutlineEdit />
						<p>editar</p>
					</Link>
				</div>
				<div className={styles['user-menu-item']}>
					<Link to="/profile">
						<AiOutlineStar />
						<p>Evaluar</p>
					</Link>
				</div>
				<div className={styles['user-menu-item']}>
					<Link className={styles['danger']} to="/profile">
						<AiOutlineDelete />
						<p className={styles['danger']}>Borrar</p>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default UserMenu;
