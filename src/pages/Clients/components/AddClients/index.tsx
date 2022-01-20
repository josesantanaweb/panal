import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useMutation } from 'react-query';

import Button from "components/Button";
import Modal from "components/Modal";
import Input from "components/Input";
import Checkbox from "components/Checkbox";

import styles from "./styles.module.scss";
import {AddClientsProps, IValues} from "./types";
import ClientsServices from 'services/clientsServices';

const AddClients:React.FC<AddClientsProps> = ({setOpenModal, openModal}) => {
	const [mortgage, setmortgage] = useState<boolean>(false);
	const { mutate, isLoading } = useMutation(ClientsServices.addClient, {
		onSuccess: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.log(error);
		}
	});

	const handleMortgage = () => setmortgage(!mortgage);

	// Validataions
	const validationSchema = {
		addClient : Yup.object({
			email: Yup.string().email("Email Invalid").required("Requirido"),
			password: Yup.string().required("Requirido").min(5).max(25),
		})
	};

	// Initial values
	const INITIAL_VALUES = {
		name: '',
		lastName: '',
		email: '',
		documentType: '',
		documentNumber: '',
		phone: '',
	};

	const onSubmit = (values: IValues) => {
		// mutate(values);
		console.log(values);
		setOpenModal(false);
		alert("wdaw");
	};


	return (
		<Modal openModal={openModal} setOpenModal={setOpenModal} title="Crea Clientes">
			<div className={styles["form-label"]}>
				<p>Información del cliente</p>
			</div>
			<Formik
				initialValues={INITIAL_VALUES}
				// validationSchema={validationSchema.addClient}
				onSubmit={onSubmit}
			>
				{({ errors, touched, isValid, dirty}) => (
					<Form>
						<div className={styles["form-rows"]}>
							<Field
								type="text"
								name="name"
								placeholder="Ingrese su Nombre"
								required
								label="Nombre"
								component={Input}
								error={errors.name && touched.name ? errors.name : null}
							/>
							<Field
								type="text"
								name="lastName"
								placeholder="Ingrese su Apellido"
								label="Apellido"
								required
								component={Input}
								error={errors.lastName && touched.lastName ? errors.lastName : null}
							/>
						</div>
						<div className={styles["form-rows"]}>
							<Field
								type="text"
								name="documentType"
								placeholder="Ingrese su Numero de Documento"
								label="Numero de Documento"
								required
								component={Input}
								error={errors.documentType && touched.documentType ? errors.documentType : null}
							/>
							<Field
								type="text"
								name="documentNumber"
								placeholder="Ingrese su Tipo de Documento"
								label="Tipo de Documento"
								required
								component={Input}
								error={errors.documentNumber && touched.documentNumber ? errors.documentNumber : null}
							/>
						</div>
						<div className={styles["form-rows"]}>
							<Field
								type="text"
								name="phone"
								placeholder="Ingrese su Teléfono"
								label="Teléfono"
								component={Input}
								error={errors.phone && touched.phone ? errors.phone : null}
							/>
							<Field
								type="text"
								name="phone"
								placeholder="Ingrese su Teléfono celular"
								label="Teléfono celular"
								component={Input}
								error={errors.phone && touched.phone ? errors.phone : null}
							/>
						</div>
						<div className={styles["form-rows"]}>
							<Field
								type="email"
								name="email"
								placeholder="Ingrese su Correo Electronico"
								label="Correo Electronico"
								component={Input}
								error={errors.email && touched.email ? errors.email : null}
							/>
							<Field
								type="text"
								name="phone"
								placeholder="Ingrese su Domicilio"
								label="Domicilio"
								component={Input}
								// error={errors.phone && touched.phone ? errors.phone : null}
							/>
						</div>
						<div className={styles["form-single"]}>
							<Field
								name="phone"
								placeholder="Ingrese Comentario"
								label="Comentario"
								textarea
								component={Input}
								// error={errors.phone && touched.phone ? errors.phone : null}
							/>
						</div>
						<div className={styles["form-rows"]}>
							<Checkbox
								label="Hipotecario"
								value={mortgage}
								handleToggle={handleMortgage}
							/>
							<Checkbox
								label="Pago al contado"
								value={mortgage}
								handleToggle={handleMortgage}
							/>
						</div>
						<div className={styles["form-footer"]}>
							<Button type='submit'>Guardar Cliente</Button>
						</div>
					</Form>
				)}
			</Formik>
		</Modal>
	);

};

export default AddClients;
