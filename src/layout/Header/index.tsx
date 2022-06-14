import React from 'react';
import { BiSearch, BiChevronDown } from 'react-icons/bi';
import UserDropdown from '../UserDropdown';

const Header: React.FC = () => {
	return (
		<div className="header header-fixed">
			<div className="header-wrap">
				<div className="header-search">
					<span className="header-search-icon">
						<BiSearch />
					</span>
					<input type="text" className="input" placeholder="Search.." />
				</div>
				<div className="header-tools">
					<ul className="header-nav">
						<UserDropdown />
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Header;
