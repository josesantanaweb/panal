import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { dataPortals } from './data';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './styles.module.scss';

const Portals = () => {
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
		<div className={styles['section__portals']}>
			<div className={styles['section__title']}>
				<h2>Portales</h2>
			</div>
			<div>
				<Slider {...settings}>
					{dataPortals.map((data: any) => (
						<div key={data.id} className={styles['content_portals']}>
							<img src={data.linkAddress} className={styles['img-portals']} />
						</div>
					))}
				</Slider>
			</div>
		</div>
	);
};

export default Portals;
