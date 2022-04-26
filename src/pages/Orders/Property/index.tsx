import React, { useState } from 'react';
import { BiMap } from "react-icons/bi";

import styles from "../SelectProperty/styles.module.scss";
import {PropertyProps} from "./types";

const Property:React.FC<PropertyProps> = ({property, handleSelectProperty, compareCode}) => {

	const itemClasses = [
		styles['select-property-item'],
		compareCode === property.code && styles['is-active']
	].join(' ');

	return (
		<div className={itemClasses} onClick={handleSelectProperty}>
			<div className={styles['property-info']}>
				<img src={property.imgUrl} alt="property" />
				<div>
					<h4 className={styles["property-title"]}>{property.title}</h4>
					<div className={styles["property-direction"]}>
						<BiMap/>
						<p>{property.city}</p>
					</div>
					<div className={styles["property-code"]}>
						<p>{property.code}</p>
					</div>
				</div>
			</div>
			<div className={styles["property-price"]}>
				<p>{property.price} USD</p>
			</div>
			<div className={styles["property-status"]}>
				<p>Activo</p>
			</div>
		</div>
	);

};

export default Property;
