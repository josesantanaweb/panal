import React from 'react';
import {
	BrowserRouter,
	Routes,
	Route,
	Outlet,
	Navigate,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import mapboxgl from 'mapbox-gl';

import Layout from 'components/Layout';
import Profile from 'pages/Profile';
import Properties from 'pages/Properties';
import Users from 'pages/Users';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Customers from 'pages/Customers';
import Orders from 'pages/Orders';
import Details from 'pages/Orders/Details';
import Support from 'pages/Support';
import SupportList from 'pages/Support/SupportList';
import Realtors from 'pages/Realtors';
import AddProperty from 'pages/Properties/AddProperty';
import Law from 'pages/Law';
import PropertyDetail from 'pages/Properties/Details';
import CustomerSeeks from 'pages/CustomerSeeks';

import { isAuthenticatedSelector } from 'store/selectors';
import { ROUTES } from 'constants/routes';
import Company from 'pages/Company';

mapboxgl.accessToken =
	'pk.eyJ1Ijoic2VyZ2lvdmVyYWhlcm5hbmRlemJpZGF0YSIsImEiOiJjbDMwZHc4cmswMDdqM2NydmIzYWF0cGl4In0.hsYQFPebleAB4j6mRckMzQ';

const AppLayout = () => {
	const isAuthenticated = useSelector(isAuthenticatedSelector);
	return isAuthenticated ? (
		<Layout>
			<Outlet />
		</Layout>
	) : (
		<Navigate to={ROUTES.LOGIN} />
	);
};

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path={ROUTES.HOME} element={<Home />} />
					<Route path={ROUTES.LOGIN} element={<Login />} />
					<Route path="/" element={<AppLayout />}>
						<Route path="/" element={<Properties />} />
						<Route path={ROUTES.PROFILE} element={<Profile />} />
						<Route path={ROUTES.PROPERTIES} element={<Properties />} />
						<Route path={ROUTES.ADDPROPERTY} element={<AddProperty />} />
						<Route path={ROUTES.USERS} element={<Users />} />
						<Route path={ROUTES.CUSTOMERS} element={<Customers />} />
						<Route path={ROUTES.ORDERS} element={<Orders />} />
						<Route path={ROUTES.COMPANY} element={<Company />} />
						<Route path={ROUTES.SUPPORT} element={<Support />} />
						<Route path={ROUTES.DETAILS} element={<Details />} />
						<Route path={ROUTES.PROPERTYDETAILS} element={<PropertyDetail />} />
						<Route path={ROUTES.SUPPORTLIST} element={<SupportList />} />
						<Route path={ROUTES.REALTORS} element={<Realtors />} />
						<Route path={ROUTES.LAW} element={<Law />} />
						<Route path={ROUTES.CUSTOMERSEEKS} element={<CustomerSeeks />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
