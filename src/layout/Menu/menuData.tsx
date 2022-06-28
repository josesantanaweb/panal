import React from 'react';
import {
	FaUsers,
	FaUserTag,
	FaClipboardList,
	FaUserFriends,
	FaHome,
	FaHandshake,
	FaHouseUser,
	FaUserClock,
} from 'react-icons/fa';

export const menu = [
	{
		link: '/users',
		text: 'Usuarios',
		icon: <FaUsers />,
	},
	{
		link: '/customers',
		text: 'Clientes',
		icon: <FaUserTag />,
	},
	{
		link: '/realtors',
		text: 'Asesores',
		icon: <FaUserFriends />,
	},
	{
		link: '/orders',
		text: 'Ordenes',
		icon: <FaClipboardList />,
	},
	{
		link: '/properties',
		text: 'Propiedades',
		icon: <FaHome />,
	},
	{
		link: '/customer-find',
		text: 'Clientes busca',
		icon: <FaHouseUser />,
	},
	{
		link: '/customer-find-list',
		text: 'Lista de Clientes busca',
		icon: <FaUserClock />,
	},
];
