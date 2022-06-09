import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

const LogoSite = () => {
	return (
		<Link to="/">
			<img
				src="https://res.cloudinary.com/panal/image/upload/v1653949052/Media-panal/logo-panal_ruzttf.png"
				alt="logo-accion-panal"
				className={styles['logo-site']}
			/>
		</Link>
	);
};

export default LogoSite;
