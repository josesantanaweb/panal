import React, {useState} from "react";

import styles from "./styles.module.scss";
import Input from "components/Input";
import Button from "components/Button";
import Select from "components/Select";

const typeOptions = [
	{
		label: "Soporte",
		value: "soporte",
	},
	{
		label: "Contacto",
		value: "contacto",
	},
];

const Support = () => {
	const [type, setType] = useState(typeOptions[0]);
	const [openSelectType, setOpenSelectType] = useState<boolean>(false);

  	// Handle Open type select
	const handleOpenType = () => setOpenSelectType(true);

	return (
		<div className={styles.support}>
			<div className={styles["support-top"]}>
				<h2 className={styles["support-title"]}>Soporte</h2>
			</div>
			<div className={styles["support-form"]}>
				<div className={styles["support-column"]}>
					<div className={styles["support-row"]}>
						<Select
							options={typeOptions}
							selectedOption={type}
							setSelectedOption={setType}
							open={openSelectType}
							label="Tipo"
							required
							setOpen={setOpenSelectType}
							handleOpenSelect={handleOpenType}
						/>
					</div>
				</div>
				<div className={styles["support-column"]}>
					<div className={styles["support-row"]}>
						<Input
							label="Nombre"
							required
							type="text"
							placeholder="Ingrese el nombre"
						/>
					</div>
					<div className={styles["business-row"]}>
						<Input
							label="Email"
							required
							type="email"
							placeholder="Ingrese el email"
						/>
					</div>
				</div>
				<div className={styles["support-column"]}>
					<div className={styles["support-row"]}>
						<Input
							label="Descripcion"
							required
							textarea
						/>
					</div>
				</div>
				<div className={styles["support-column"]}>
					<div className={styles["support-save"]}>
						<Button full>Enviar</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Support;
