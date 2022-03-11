import React from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import Layout from "components/Layout";
import Profile from "pages/Profile";
import Properties from 'pages/Properties';
import Users from 'pages/Users';
import Login from 'pages/Login';
import Customers from 'pages/Customers';
import Orders from 'pages/Orders';
import Support from 'pages/Support';
import Realtors from 'pages/Realtors';
import AddProperty from 'pages/Properties/AddProperty';

import { isAuthenticatedSelector } from 'store/selectors';
import { ROUTES } from "constants/routes";
import Business from 'pages/Business';

const AppLayout = () => {
	const isAuthenticated = useSelector(isAuthenticatedSelector);
	return  (
		isAuthenticated ?  (
			<Layout>
				<Outlet />
			</Layout>
		)
			: <Navigate to={ROUTES.LOGIN} />
	);
};


function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path={ROUTES.LOGIN} element={<Login />} />
					<Route path="/" element={<AppLayout />} >
						<Route path="/" element={<Properties />} />
						<Route path={ROUTES.PROFILE} element={<Profile />} />
						<Route path={ROUTES.PROPERTIES} element={<Properties />} />
						<Route path={ROUTES.ADDPROPERTY} element={<AddProperty />} />
						<Route path={ROUTES.USERS} element={<Users />} />
						<Route path={ROUTES.CUSTOMERS} element={<Customers />} />
						<Route path={ROUTES.ORDERS} element={<Orders />} />
						<Route path={ROUTES.BUSINESS} element={<Business />} />
						<Route path={ROUTES.SUPPORT} element={<Support />} />
						<Route path={ROUTES.REALTORS} element={<Realtors />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
