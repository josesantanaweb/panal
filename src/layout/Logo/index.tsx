import React from 'react';
import LogoLight from 'assets/images/logo.svg';
import LogoSmall from '../../assets/images/logo.svg';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
	return (
		<Link to="/users" className="sidebar-logo">
			<img src={LogoLight} alt="" className="logo" />
			<img src={LogoSmall} alt="" className="logo logo-small" />
		</Link>
	);
};

export default Logo;
