import React from 'react';
import { Link } from 'react-router-dom';
import { menu } from './menuData';

interface MenuHeadingProps {
	heading?: string;
}

interface MenuItemProps {
	item: {
    text: string,
    icon: string,
    link: string,
  }
}

const MenuHeading: React.FC<MenuHeadingProps> = ({ heading }) => {
	return <li className="menu-heading">{heading}</li>;
};

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
	return  (
		<li className="menu-item">
			<Link to={item.link} className="menu-link">
				<span className="menu-icon">
					{item.icon}
				</span>
				<span className="menu-text">{item.text}</span>
				{/* <span className="menu-badge"></span> */}
			</Link>
		</li>
	);
};

const Menu: React.FC = () => {
	return (
		<div className="sidebar-menu">
			<div className="sidebar-wrapper">
				<div className="sidebar-content">
					<ul className="menu">
						<MenuHeading heading="Menu" />
						{
							menu.map((item: any, index: number) => (
								<MenuItem item={item} key={index}/>
							))
						}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Menu;
