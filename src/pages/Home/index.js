import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Layout from './components/Layout';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Main from './components/Main';
import Info from './components/Sections/Info';
import Customers from './components/Sections/Customers';
import Portals from './components/Sections/Portals';
import Contact from './components/Sections/Contact';
import Services from './components/Sections/Services';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

const Home = () => {
	return (
		<Layout>
			<Header>
				<Navbar />
				<Hero />
			</Header>
			<Main>
				<Info />
				<Customers />
				<Services />
				<Portals />
				<Contact />
				<Footer />
			</Main>
		</Layout>
	);
};

export default Home;
