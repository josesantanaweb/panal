import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { dataCustomers } from './data';
import styles from './styles.module.scss';

const Customers = () => {
	const settings = {
		dots: true,
		infinite: true,
		slidesToShow: 5,
		slidesToScroll: 1,
		autoplay: true,
		speed: 2500,
		autoplaySpeed: 1000,
		cssEase: 'linear',
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};
	return (
		<div className={styles['section__ourcustomers']}>
			<div className={styles['section__title']}>
				<h2>Nuestros Clientes</h2>
			</div>
			<Slider {...settings}>
				{dataCustomers.map((customer: any) => (
					<div key={customer.id} className={styles['content_customers']}>
						<img src={customer.linkAddress} />
					</div>
				))}
			</Slider>
		</div>
	);
};

export default Customers;
