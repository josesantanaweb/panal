import React from 'react';
import styles from './styles.module.scss';

type Props = {
	children: React.ReactNode;
};

const Header = ({ children }: Props) => {
	return <header className={styles['header']}>{children}</header>;
};

export default Header;
