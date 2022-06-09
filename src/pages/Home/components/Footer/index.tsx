import React from 'react';
import Logo from '../Logo';
import styles from './styles.module.scss';

const Footer = () => {
	return (
		<footer className={styles['footer']}>
			<div className={styles['footer__section']}>
				<Logo />
			</div>
			<div className={styles['footer__section']}>
				<p>Compyright 2021 Company All rights Reserved</p>
			</div>
		</footer>
	);
};

export default Footer;
