import React from 'react';
import Sidebar from 'layout/Sidebar';
import Header from 'layout/Header';

const Layout: React.FC = ({ children }) => {
	return (
		<div className="main">
			<Sidebar />
			<div className="wrap">
				<Header />
				{children}
			</div>
		</div>
	);
};

export default Layout;
