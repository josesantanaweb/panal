import React, { useState } from 'react';
import { dataServices } from './data';
import styles from './styles.module.scss';

const Services = () => {
	const [services, setServices] = useState(!dataServices);
	const [showItem, setShowItem] = useState(false);

	const hanleShowItem = (itemId) => {
		const findedItem = dataServices.find((item) => item.id == itemId);
		console.log(findedItem);
		setServices([findedItem]);
		setShowItem(!showItem);
	};

	console.log(services);

	return (
		<React.Fragment>
			<div className={styles['section__services']}>
				<div className={styles['section__services']}>
					<h2>Servicios</h2>
					<p>Lorem ipsum dolor</p>
				</div>
				<div>
					<div className={styles['services-content']}>
						<section className={styles['section-content__service']}>
							{services &&
								services.map((item) => (
									<div className={styles['service-item']} key={item.key}>
										<div>
											<h2>{item.title}</h2>
											<p>{item.description}</p>
										</div>
										<div className={styles['service-item__content-img']}>
											<img src={item.largeImg} alt={item.title} />
										</div>
									</div>
								))}
						</section>

						<ul className={styles['honeycomb']} lang="es">
							{dataServices.map((item) => (
								<li
									className={styles['honeycomb-cell']}
									key={item.id}
									onClick={() => hanleShowItem(item.id)}
								>
									<div className={styles['honeycomb-cell__content']}>
										<span>
											<i>{item.icon}</i>
											<p>{item.iconText}</p>
										</span>
										<div className={styles['honeycomb-cell__title']}>
											{item.iconText}
										</div>
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Services;
