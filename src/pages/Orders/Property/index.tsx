import React, { useState } from 'react';
import { BiMap } from "react-icons/bi";

import styles from "../SelectProperty/styles.module.scss";
import {PropertyProps} from "./types";

import thumb1 from "assets/img/thumb1.jpg";

const Property:React.FC<PropertyProps> = ({property}) => {

	return (
		<div className={styles['select-property-item']}>
			<div className={styles['property-info']}>
				<img src={thumb1} alt="property" />
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
