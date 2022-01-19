import React from "react";
import { BiMap, BiHotel, BiBath, BiCar, BiFilterAlt, BiListUl } from "react-icons/bi";

import Button from "components/Button";

import { PropertyProps } from "./types";
import styles from "./styles.module.scss";
import thumb1 from "../../assets/img/thumb1.jpg";
import thumb2 from "../../assets/img/thumb2.jpg";
import thumb3 from "../../assets/img/thumb3.jpg";
import thumb4 from "../../assets/img/thumb4.jpg";

const Property:React.FC<PropertyProps> = ({property}) => {
	const isSold = true; //! <======= ELIMINAR ========>
	const statusClasses = [
		styles["properties-status"],
		isSold ? styles["is-sold"] : "",
	].join(' ');

	return (
		<div className={styles.property}>
			<div className={styles["properties-thumb"]}>
				<img src={thumb1} alt="thumb1" />
				<div className={styles["properties-code"]}>
					<p>CASA - VENTA NIN24185</p>
					<p>NIN24185</p>
				</div>
				<div className={statusClasses}>
					<p>Vendida</p>
				</div>
			</div>
			<h4 className={styles["properties-title"]}>Casa en Las Condes</h4>
			<div className={styles["properties-direction"]}>
				<BiMap/>
				<p>Santiago de Chile</p>
			</div>
			<div className={styles["properties-row"]}>
				<div className={styles["properties-services"]}>
					<li>
						<BiHotel/>
						<p>1</p>
					</li>
					<li>
						<BiBath/>
						<p>1</p>
					</li>
					<li>
						<BiCar/>
						<p>1</p>
					</li>
				</div>
				<h4 className={styles["properties-price"]}>$ 8.312.312</h4>
			</div>
			<p className={styles["properties-meters"]}>Sup: total 5000 mt2</p>
			<Button full>Ver Detalles</Button>
		</div>
	);
};

export default Property;
