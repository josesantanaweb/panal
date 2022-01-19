import React from "react";
import { BiCog, BiLockAlt } from "react-icons/bi";

import user from "../../assets/img/user.jpg";
import styles from "./styles.module.scss";
import Input from "components/Input";
import Button from "components/Button";

const Profile = () => {
	return (
		<div className={styles.profile}>
			<div className={styles["profile-top"]}>
				<div className={styles["profile-avatar"]}>
					<img src={user} alt="user" />
				</div>
				<div className={styles["profile-name"]}>
					<h5>Jonh Doe</h5>
					<p>Administrador</p>
				</div>
			</div>
			<div className={styles["profile-tabs"]}>
				<div className={styles["profile-tabs-items"]}>
					<div className={`${styles["profile-tab"]} ${styles.active}`}>
						<BiCog/>
						<h5>General</h5>
					</div>
					<div className={styles["profile-tab"]}>
						<BiLockAlt/>
						<h5>Contraseña</h5>
					</div>
				</div>
				<div className={styles["profile-form"]}>
					<h5>Informacion de Perfil</h5>
					<div className={styles["profile-column"]}>
						<div className={styles["profile-row"]}>
							<Input
								label="Nombre"
								required
								type="text"
								placeholder="Ingrese su Nombre"
							/>
						</div>
						<div className={styles["profile-row"]}>
							<Input
								label="Apellido"
								required
								type="text"
								placeholder="Ingrese su Apellido"
							/>
						</div>
					</div>
					<div className={styles["profile-column"]}>
						<div className={styles["profile-row"]}>
							<Input
								label="Tipo de Documento"
								required
								type="text"
								placeholder="Ingrese su Tipo de Documento"
							/>
						</div>
						<div className={styles["profile-row"]}>
							<Input
								label="Numero"
								required
								type="text"
								placeholder="Ingrese su Numero"
							/>
						</div>
					</div>
					<div className={styles["profile-column"]}>
						<div className={styles["profile-row"]}>
							<Input
								label="Email"
								required
								disabled
								value="admin@gmail.com"
								type="text"
							/>
						</div>
						<div className={styles["profile-row"]}>
							<Input
								label="Telefono"
								type="text"
								placeholder="Ingrese su Numero"
							/>
						</div>
					</div>
					<div className={styles["profile-column"]}>
						<div className={styles["profile-row"]}>
							<Input
								label="Cargo"
								required
								type="text"
								placeholder="Cargo"
							/>
						</div>
					</div>
					<div className={styles["profile-column"]}>
						<div className={styles["profile-save"]}>
							<Button full>Guardar</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
