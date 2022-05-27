import React from "react";
import { BiMap, BiHotel, BiBath, BiCar, BiFilterAlt, BiListUl } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

import Button from 'components/Button';

import { PropertyProps } from './types';
import styles from './styles.module.scss';

const Property: React.FC<PropertyProps> = ({ property }) => {
	const navigate = useNavigate();
	const statusClasses = [
		styles['properties-status'],
		property.status === 'EN ESPERA'
			? styles['is-sold']
			: styles['is-published'],
	].join(' ');

	const hanleDetail = (property: any) => {
		navigate('/property-details', {
			state: {
				property: property,
			}
		});
	};

	return (
		<div className={styles.property}>
			<div className={styles['properties-thumb']}>
				<img src={property.imgUrl} alt="thumb1" />
				<div className={styles['properties-code']}>
					<p>{property.title}</p>
					<p>NIN24185</p>
				</div>
				<div className={statusClasses}>
					<p>{property.status}</p>
				</div>
			</div>
			<h4 className={styles['properties-title']}>{property.title}</h4>
			<div className={styles['properties-direction']}>
				<BiMap />
				<p>{property.city}</p>
			</div>
			<div className={styles['properties-row']}>
				<div className={styles['properties-services']}>
					<li>
						<BiHotel />
						<p>1</p>
					</li>
					<li>
						<BiBath />
						<p>1</p>
					</li>
					<li>
						<BiCar />
						<p>1</p>
					</li>
				</div>
				<h4 className={styles['properties-price']}>$ {property.price}</h4>
			</div>
			<p className={styles['properties-meters']}>Sup: total 5000 mt2</p>
			<Button onClick={() => hanleDetail(property)} full>
				Ver Detalles
			</Button>
		</div>
	);
};

export default Property;
