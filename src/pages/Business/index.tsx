import React from "react";
import { BiCog, BiCreditCard } from "react-icons/bi";

import styles from "./styles.module.scss";
import Input from "components/Input";
import Button from "components/Button";

const Business = () => {
	return (
		<div className={styles.business}>
			<div className={styles["business-top"]}>
				<div className={styles["business-avatar"]}>B</div>
				<div className={styles["business-name"]}>
					<p>Empresa</p>
					<h5>Grupo casa</h5>
				</div>
			</div>
			<div className={styles["business-tabs"]}>
				<div className={styles["business-tabs-items"]}>
					<div className={`${styles["business-tab"]} ${styles.active}`}>
						<BiCog/>
						<h5>General</h5>
					</div>
					<div className={styles["business-tab"]}>
						<BiCreditCard/>
						<h5>Mi plan</h5>
					</div>
				</div>
				<div className={styles["business-form"]}>
					<h5>Informacion de Empresa</h5>
					<div className={styles["business-column"]}>
						<div className={styles["business-row"]}>
							<Input
								label="Nombre de la empresa"
								required
								type="text"
								placeholder="Ingrese el nombre de la empresa"
							/>
						</div>
						<div className={styles["business-row"]}>
							<Input
								label="Email de la empresa"
								required
								type="email"
								placeholder="Ingrese el email de la empresa"
							/>
						</div>
					</div>
					<div className={styles["business-column"]}>
						<div className={styles["business-row"]}>
							<Input
								label="Direccion de la empresa"
								required
								type="text"
								placeholder="Ingrese la direccion de la empresa"
							/>
						</div>
						<div className={styles["business-row"]}>
							<Input
								label="Telefono de la empresa"
								required
								type="text"
								placeholder="Ingrese el telefono de la empresa"
							/>
						</div>
					</div>
					<div className={styles["business-column"]}>
						<div className={styles["business-row"]}>
							<Input
								label="RUT de la empresa"
								type="text"
								placeholder="Ingrese el rut de la empresa"
							/>
						</div>
						<div className={styles["business-row"]}>
							<Input
								label="Giro de la empresa"
								type="text"
								placeholder="Ingrese el giro de la empresa"
							/>
						</div>
					</div>
					<div className={styles["business-column"]}>
						<div className={styles["business-save"]}>
							<Button full>Guardar</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Business;
