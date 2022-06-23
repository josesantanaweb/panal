import React from 'react';
import { Routes, Route } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import PrivateRouter from 'router/PrivateRouter';
import Login from 'pages/Login';
import Users from 'pages/Users';
import Realtors from 'pages/Realtors';
import Customers from 'pages/Customers';
import Properties from 'pages/Properties';
import AddProperty from 'pages/Properties/Add';
import Orders from 'pages/Orders';
import Home from 'pages/Home';

mapboxgl.accessToken =
	'pk.eyJ1Ijoic2VyZ2lvdmVyYWhlcm5hbmRlemJpZGF0YSIsImEiOiJjbDMwZHc4cmswMDdqM2NydmIzYWF0cGl4In0.hsYQFPebleAB4j6mRckMzQ';

const App = () => {
	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route path="/home" element={<Home />} />
			<Route path="/" element={<PrivateRouter />}>
				<Route path="users" element={<Users />} />
				<Route path="realtors" element={<Realtors />} />
				<Route path="customers" element={<Customers />} />
				<Route path="properties" element={<Properties />} />
				<Route path="add-property" element={<AddProperty />} />
				<Route path="orders" element={<Orders />} />
			</Route>
		</Routes>
	);
};

export default App;
