import React from 'react';
import ContactForm from './Form';

import { IoLocationSharp, IoMailSharp } from 'react-icons/io5';
import { FaPhoneAlt } from 'react-icons/fa';

import styles from './styles.module.scss';

const Contact = () => {
	return (
		<section className={styles['section__contact']}>
			<h2>Contacto</h2>
			<p>¿Cómo podemos ayudarte?</p>
			<div className={styles['content__contact']}>
				<div className={styles['section__address']}>
					<ul className={styles['items-list']}>
						<li className={styles['item-list']}>
							<span>
								<IoLocationSharp />
							</span>
							<div>
								<h5>Dirección</h5>
								<p>Lorem ipsum dolor sit amet </p>
							</div>
						</li>

						<li className={styles['item-list']}>
							<span>
								<FaPhoneAlt />
							</span>
							<div>
								<h5>Teléfono</h5>
								<p>Lorem ipsum dolor sit amet </p>
							</div>
						</li>

						<li className={styles['item-list']}>
							<span>
								<IoMailSharp />
							</span>
							<div>
								<h5>Email</h5>
								<p>Lorem ipsum dolor sit amet </p>
							</div>
						</li>
					</ul>
				</div>

				<div>
					<ContactForm />
				</div>
			</div>
		</section>
	);
};

export default Contact;
