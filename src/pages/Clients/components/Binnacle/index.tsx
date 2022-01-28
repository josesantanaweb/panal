import React from 'react';

import Button from "components/Button";
import Modal from "components/Modal";

import {BinnacleProps} from "./types";

import styles from "./styles.module.scss";

const Binnacle:React.FC<BinnacleProps> = ({setOpenModal, openModal}) => {

	return (
		<Modal openModal={openModal} setOpenModal={setOpenModal} title="Bitacora">
			<div className={styles["binnacle-label"]}>
				<p>Información del cliente</p>
			</div>
			<div className={styles["binnacle-info"]}>
				<p>Jonh Doe</p>
				<span>jonh@gmail.com</span>
			</div>
			<div className={styles["binnacle-property"]}>
				<div className={styles["binnacle-item"]}>
					<div>
						<i className={styles["binnacle-mark"]}></i>
						<p>Aulen propiedades <span>09-11-2021 14:19 hrs</span></p>
					</div>
					<li>Emisión de orden de visita n° 12.412</li>
					<li>Enviada a: Juanito.perez@gmail.com</li>
					<li>Asunto: Orden de visita n° 12.412</li>
					<li>Dirección Propiedad: Enviada sin dirección exacta</li>
				</div>
				<div className={styles["binnacle-item"]}>
					<div>
						<i className={styles["binnacle-mark"]}></i>
						<p>Depatarmento <span>09-11-2021  15:19 hrs</span></p>
					</div>
					<li>Emisión de orden de visita n° 12.412</li>
				</div>
			</div>
			<div className={styles["binnacle-footer"]}>
				<Button type='button'>Propiedades en Canje</Button>
				<Button type='button' variant="primary">Propiedades Enviadas</Button>
			</div>
		</Modal>
	);

};

export default Binnacle;
