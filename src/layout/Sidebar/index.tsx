import React, { useState } from 'react';
import classNames from 'classnames';
import Logo from 'layout/Logo';
import Menu from 'layout/Menu';
import Toggle from '../Toggle';
import { BiMenu } from 'react-icons/bi';

interface SidebarProps {
	className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
	const [collapseSidebar, setSidebar] = useState(false);

	const toggleCollapse = () => setSidebar(!collapseSidebar);

	const classes = classNames({
		sidebar: true,
		'sidebar-fixed': true,
		'is-compact': collapseSidebar,
		[`${className}`]: className,
	});

	return (
		<div className={classes}>
			<div className="sidebar-element sidebar-header">
				<div className="sidebar-brand">
					<Logo />
					<p>Acción Panal</p>
				</div>
				<Toggle className="sidebar-collapse-icon" onClick={toggleCollapse}>
					<BiMenu />
				</Toggle>
			</div>
			<div className="sidebar-element">
				<div className="sidebar-content">
					<Menu />
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
