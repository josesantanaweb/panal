import React, {useState} from 'react';
import { BiArrowBack } from "react-icons/bi";
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

import Button from "components/Button";
import Modal from "components/Modal";
import Select from "components/Select";
import Input from "components/Input";

import {AddPropertyProps, IValues} from "./types";
import styles from "./styles.module.scss";

const documentTypeOptions = [
	{
		label: 'RUT',
		value: 'rut',
	},
	{
		label: 'Pasaporte',
		value: 'pasaporte',
	},
];

const AddProperty:React.FC<AddPropertyProps> = () => {
	const [documentType, setDocumentType] = useState(documentTypeOptions[0]);
	const [openSelectDocumentType, setOpenSelectDocumentType] = useState<boolean>(false);

  	// Validataions
	const validationSchema = {
		addProperty : Yup.object({
			name: Yup.string().required("Requerido"),
		})
	};

	// Initial values
	const INITIAL_VALUES = {
		name: '',
	};

	const onSubmit = (values: IValues, {resetForm}: any) => {
		const {
			name,
		} = values;
		resetForm({ values: ''});
	};

	// Handle Open limit select
	const handleOpenDocumentType = () => setOpenSelectDocumentType(true);
	return (
		<div className={styles["add-property"]}>
			<div className={styles["add-property-top"]}>
				<div className={styles["add-property-title"]}>
					<BiArrowBack/>
					<h3>Agregar Propiedades</h3>
				</div>
			</div>
			<Formik
				initialValues={INITIAL_VALUES}
				validationSchema={validationSchema.addProperty}
				onSubmit={onSubmit}
			>
				{({ errors, touched, isValid, dirty}) => (
					<Form className={styles["form-wrapper"]}>
						<div className={styles["section-title"]}>
							<h4>Operación</h4>
						</div>
						<div className={styles["form-row-3"]}>
							<Select
								options={documentTypeOptions}
								label="Operacion"
								required
								selectedOption={documentType}
								setSelectedOption={setDocumentType}
								open={openSelectDocumentType}
								setOpen={setOpenSelectDocumentType}
								handleOpenSelect={handleOpenDocumentType}
							/>
							<Field
								type="text"
								name="name"
								placeholder="Tipo de moneda"
								required
								label="Tipo de moneda"
								component={Input}
							/>
							<Field
								type="text"
								name="name"
								placeholder="Precio"
								required
								label="Precio"
								component={Input}
							/>
						</div>
						<div className={styles["section-title"]}>
							<h4>Asignación de Ejecutivo</h4>
						</div>
						<div className={styles["form-row-3"]}>
							<Select
								options={documentTypeOptions}
								label="Corredor Vendedor"
								required
								selectedOption={documentType}
								setSelectedOption={setDocumentType}
								open={openSelectDocumentType}
								setOpen={setOpenSelectDocumentType}
								handleOpenSelect={handleOpenDocumentType}
							/>
							<Select
								options={documentTypeOptions}
								label="Corredor Comprador"
								required
								selectedOption={documentType}
								setSelectedOption={setDocumentType}
								open={openSelectDocumentType}
								setOpen={setOpenSelectDocumentType}
								handleOpenSelect={handleOpenDocumentType}
							/>
							<Field
								type="text"
								name="name"
								placeholder="Comision"
								required
								label="Comision"
								component={Input}
							/>
						</div>
						<div className={styles["section-title"]}>
							<h4>Propiedad</h4>
						</div>
						<div className={styles["form-row-3"]}>
							<Field
								type="text"
								name="name"
								placeholder="Número de ROL"
								required
								label="Número de ROL"
								component={Input}
							/>
							<Select
								options={documentTypeOptions}
								label="Tipo de Propiedad"
								required
								selectedOption={documentType}
								setSelectedOption={setDocumentType}
								open={openSelectDocumentType}
								setOpen={setOpenSelectDocumentType}
								handleOpenSelect={handleOpenDocumentType}
							/>
							<Select
								options={documentTypeOptions}
								label="Cliente"
								required
								selectedOption={documentType}
								setSelectedOption={setDocumentType}
								open={openSelectDocumentType}
								setOpen={setOpenSelectDocumentType}
								handleOpenSelect={handleOpenDocumentType}
							/>
						</div>
						<div className={styles["form-single"]}>
							<Field
								name="comments"
								placeholder="Observación privadas"
								label="Observación privadas"
								textarea
								required
								component={Input}
							/>
						</div>
						<div className={styles["section-title"]}>
							<h4>Ubicación</h4>
						</div>
						<div className={styles["form-row-3"]}>
							<Field
								type="text"
								name="name"
								placeholder="Dirección"
								required
								label="Dirección"
								component={Input}
							/>
							<Field
								type="text"
								name="name"
								placeholder="N° Dpto/Casa/Of"
								required
								label="N° Dpto/Casa/Of"
								component={Input}
							/>
							<Select
								options={documentTypeOptions}
								label="Región"
								required
								selectedOption={documentType}
								setSelectedOption={setDocumentType}
								open={openSelectDocumentType}
								setOpen={setOpenSelectDocumentType}
								handleOpenSelect={handleOpenDocumentType}
							/>
						</div>
						<div className={styles["form-row-3"]}>
							<Field
								type="text"
								name="name"
								placeholder="Ciudad"
								required
								label="Ciudad"
								component={Input}
							/>
							<Select
								options={documentTypeOptions}
								label="Comuna"
								selectedOption={documentType}
								setSelectedOption={setDocumentType}
								open={openSelectDocumentType}
								setOpen={setOpenSelectDocumentType}
								handleOpenSelect={handleOpenDocumentType}
							/>
							<Field
								type="text"
								name="name"
								placeholder="Sector"
								label="Sector"
								component={Input}
							/>
						</div>
						<div className={styles["section-title"]}>
							<h4>Características</h4>
						</div>
						<div className={styles["form-row-4"]}>
							<Field
								type="text"
								name="name"
								placeholder="N° de suites"
								required
								label="N° de suites"
								component={Input}
							/>
							<Field
								type="text"
								name="name"
								placeholder="Habitaciones"
								required
								label="Habitaciones"
								component={Input}
							/>
							<Field
								type="text"
								name="name"
								placeholder="Habitaciones de Servicio"
								required
								label="Habitaciones de Servicio"
								component={Input}
							/>
							<Field
								type="text"
								name="name"
								disabled
								placeholder="2"
								label="Total de Habitaciones"
								component={Input}
							/>
						</div>
						<div className={styles["form-row-4"]}>
							<Field
								type="text"
								name="name"
								placeholder="N° Salas de estar"
								required
								label="N° Salas de estar"
								component={Input}
							/>
							<Field
								type="text"
								name="name"
								placeholder="Baños"
								required
								label="Baños"
								component={Input}
							/>
							<Field
								type="text"
								name="name"
								placeholder="Baños de servicio"
								required
								label="Baños de servicio"
								component={Input}
							/>
							<Field
								type="text"
								name="name"
								disabled
								placeholder="2"
								label="Total de Baños"
								component={Input}
							/>
						</div>
						<div className={styles["section-title"]}>
							<h4>Distribución</h4>
						</div>
						<div className={styles["section-subtitle"]}>
							<h5>Generales</h5>
						</div>
						<div className={styles["form-row-4"]}>
							<Field
								type="text"
								name="name"
								placeholder="Superficie total"
								required
								label="Superficie total"
								component={Input}
							/>
							<Field
								type="text"
								name="name"
								placeholder="Superficie util*"
								required
								label="Superficie util*"
								component={Input}
							/>
							<Select
								options={documentTypeOptions}
								label="Recepción final"
								required
								selectedOption={documentType}
								setSelectedOption={setDocumentType}
								open={openSelectDocumentType}
								setOpen={setOpenSelectDocumentType}
								handleOpenSelect={handleOpenDocumentType}
							/>
							<Select
								options={documentTypeOptions}
								label="Tipo de piso"
								required
								selectedOption={documentType}
								setSelectedOption={setDocumentType}
								open={openSelectDocumentType}
								setOpen={setOpenSelectDocumentType}
								handleOpenSelect={handleOpenDocumentType}
							/>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default AddProperty;
