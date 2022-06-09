import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';
import { GiHamburgerMenu } from 'react-icons/gi';
import styles from './styles.module.scss';

import { boolean } from 'yup/lib/locale';
import PropTypes from 'prop-types';

const Navbar = () => {
	return (
		<nav className={styles['nav']}>
			<div>
				<Logo />
			</div>
			<ul className={styles['navbar-nav']}>
				<li className={styles['navbar-item']}>
					<Link to="/" className={styles['navbar-link']}>
						Inicio
					</Link>
				</li>
				<li className={styles['navbar-item']}>
					<Link to="/" className={styles['navbar-link']}>
						Nosotros
					</Link>
				</li>
				<li className={styles['navbar-item']}>
					<Link to="/" className={styles['navbar-link']}>
						Servicios
					</Link>
				</li>
				<li className={styles['navbar-item']}>
					<Link to="/" className={styles['navbar-link']}>
						Portales
					</Link>
				</li>
				<li className={styles['navbar-item']}>
					<Link to="/" className={styles['navbar-link']}>
						Contacto
					</Link>
				</li>
				<li className={styles['navbar-item']}>
					<Link to="/" className={styles['navbar-link__signIn']}>
						Registrate
					</Link>
				</li>
				<li className={styles['navbar-item']}>
					<Link to="/login" className={styles['navbar-link__login']}>
						Ingresar
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
