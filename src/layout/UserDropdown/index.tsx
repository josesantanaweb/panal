import React, { useState, useRef, useEffect } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { FaArrowLeft, FaCog, FaUserAlt } from 'react-icons/fa';
import { useOnClickOutside } from 'usehooks-ts';
import { findFirstLetter } from 'utils';
import useAuth from 'hooks/useAuth';

const UserDropdown: React.FC = () => {
	const ref = useRef(null);
	const [openDropdown, setOpenDropdown] = useState<boolean>(false);

	const { logout, user }:any = useAuth();

	const onLogout = () => {
		logout();
	};

	// Close dropdown wheen click outside
	const handleClickOutside = () => setOpenDropdown(false);

	useOnClickOutside(ref, handleClickOutside);

	return (
		<li className="header-dropdown" ref={ref}>
			<div className="user-toggle" onClick={() => setOpenDropdown(!openDropdown)}>
				<div className="user-avatar">{findFirstLetter(user?.name)}</div>
				<div className="user-info">
					<div className="user-role">{user?.session_type === 'REALTOR' ? 'Asesor' : 'Admin'}</div>
					<div className="user-name">
						{user?.name} {user?.lastName}
						<span>
							<BiChevronDown />
						</span>
					</div>
				</div>
			</div>
			{
				openDropdown &&
        <div className="user-dropdown" >
        	<div>
        		<div className="user-avatar">
        			<span>{findFirstLetter(user?.name)}</span>
        		</div>
        		<div className="user-info">
        			<h6>{user?.name} {user?.lastName}</h6>
        			<span>{user?.email}</span>
        		</div>
        	</div>
        	<ul className="user-options">
        		<li>
        			<div>
        				<FaUserAlt/>
        				<span>Perfil</span>
        			</div>
        		</li>
        		<li>
        			<div>
        				<FaCog/>
        				<span>Configuracion</span>
        			</div>
        		</li>
        	</ul>
        	<ul className="user-options">
        		<li>
        			<div onClick={onLogout}>
        				<FaArrowLeft/>
        				<span>Salir</span>
        			</div>
        		</li>
        	</ul>
        </div>
			}
		</li>
	);
};

export default UserDropdown;
