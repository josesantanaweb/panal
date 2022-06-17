import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

const Hero = () => {
	return (
		<div className={styles['hero']}>
			<section className={styles['hero__content']}>
				<div>
					<h1>Publica propiedades de forma rápida y sencilla</h1>
				</div>
				<div>
					<p>
						Te ofrecemos un sistema intuitivo y rápido para que puedas mantener
						todo de forma organizada y así ahorres tiempo
					</p>
				</div>
				<div className={styles['hero__content__link']}>
					<Link to="/" className={styles['nav-link']}>
						Publica una propiedad
					</Link>
				</div>
			</section>
			<section className={styles['content__img']}>
				<img
					className={styles['img-hero']}
					src="https://res.cloudinary.com/panal/image/upload/v1654527813/Media-panal/Dise%C3%B1o_sin_t%C3%ADtulo_1_rvm4or.png"
					alt="hero-img"
					style={{ zIndex: '2' }}
				/>
			</section>
		</div>
	);
};

export default Hero;
