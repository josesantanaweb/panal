import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import Button from "components/Button";
import Modal from "components/Modal";
import Select from "components/Select";
import Input from "components/Input";
import Checkbox from "components/Checkbox";

import styles from "./styles.module.scss";
import {GenerateOrderProps, IValues} from "./types";
import CustomersServices from 'services/customersServices';

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

const GenerateOrder:React.FC<GenerateOrderProps> = ({setOpenModal, openModal}) => {
	const [documentType, setDocumentType] = useState(documentTypeOptions[0]);
	const [openSelectDocumentType, setOpenSelectDocumentType] = useState<boolean>(false);
	const queryClient = useQueryClient();
	const { mutate } = useMutation(CustomersServices.addCustomer, {
		onSuccess: (data) => {
			toast.success("Cliente registrado exitosamente", {
				position: "top-right",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
			});
			queryClient.invalidateQueries(['customers']);
			setTimeout(() => {
				return setOpenModal(false);
			}, 3000);
		},
		onError: (error: any) => {
			toast.error(error.response.data.message === "This user already exists" && "Cliente ya existe", {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
			});
		}
	});

  	// Handle Open limit select
	const handleOpenDocumentType = () => setOpenSelectDocumentType(true);

	// Validataions
	const validationSchema = {
		addCustomer : Yup.object({
			// name: Yup.string().required("Requerido"),
			// lastName: Yup.string().required("Requerido"),
			// email: Yup.string().email("Correo Invalido").required("Requerido"),
			// documentNumber: Yup.string().required("Requerido"),
		})
	};

	// Initial values
	const INITIAL_VALUES = {
		name: '',
		lastName: '',
		email: '',
		documentType: '',
		documentNumber: '',
		localPhone: '',
		phone: '',
		address: '',
		cashPayment: false,
		mortgage: false,
		comments: ''
	};

	const onSubmit = (values: IValues, {resetForm}: any) => {
		const {
			name,
			lastName,
			email,
			documentNumber,
			localPhone,
			phone,
			address,
			cashPayment,
		  mortgage,
			comments
		} = values;
		mutate({
			name,
			lastName,
			email,
			documentType: documentType.value,
			documentNumber,
			localPhone,
			phone,
			address,
			cashPayment,
		  mortgage,
			comments
		});
		resetForm({ values: ''});
	};

	return (
		<Modal openModal={openModal} setOpenModal={setOpenModal} title="Generar orden de visita">
			<Formik
				initialValues={INITIAL_VALUES}
				validationSchema={validationSchema.addCustomer}
				onSubmit={onSubmit}
			>
				{({ errors, touched, isValid, dirty}) => (
					<Form className={styles["form-container"]}>
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
							<Select
								options={documentTypeOptions}
								label="Tipo de Documento"
								required
								selectedOption={documentType}
								setSelectedOption={setDocumentType}
								open={openSelectDocumentType}
								setOpen={setOpenSelectDocumentType}
								handleOpenSelect={handleOpenDocumentType}
							/>
							<Field
								type="text"
								name="documentNumber"
								placeholder="Ingrese su Numero de Documento"
								label="Numero de Documento"
								required
								component={Input}
								error={errors.documentNumber && touched.documentNumber ? errors.documentNumber : null}
							/>
						</div>
						<div className={styles["form-rows"]}>
							<Field
								type="text"
								name="localPhone"
								placeholder="Ingrese su Teléfono"
								label="Teléfono"
								component={Input}
								error={errors.localPhone && touched.localPhone ? errors.localPhone : null}
							/>
							<Field
								type="email"
								name="email"
								required
								placeholder="Ingrese su Correo Electronico"
								label="Correo Electronico"
								component={Input}
								error={errors.email && touched.email ? errors.email : null}
							/>
						</div>
						<div className={styles["form-section"]}>
							<div className={styles["form-label"]}>
								<p>Información de la orden</p>
							</div>
						</div>
						<div className={styles["form-rows"]}>
							<Select
								options={documentTypeOptions}
								label="Ejecutivo"
								required
								selectedOption={documentType}
								setSelectedOption={setDocumentType}
								open={openSelectDocumentType}
								setOpen={setOpenSelectDocumentType}
								handleOpenSelect={handleOpenDocumentType}
							/>
							<Field
								type="date"
								name="email"
								date
								required
								label="Fecha y hora*"
								component={Input}
								error={errors.email && touched.email ? errors.email : null}
							/>
						</div>
						<div className={styles["form-section"]}>
							<div className={styles["form-label"]}>
								<p>Propiedad</p>
							</div>
						</div>
						<div className={styles["form-single"]}>
							<Field
								type="text"
								name="address"
								required
								label="Direccion*"
								component={Input}
							/>
						</div>
						<div className={styles["form-checkbox"]}>
							<Field
								name="mortgage"
								type="checkbox"
								label="Mostrar direccion exacta"
								component={Checkbox}
							/>
						</div>
						<div className={styles["form-footer"]}>
							<Button type='submit' variant="outline">Atras</Button>
							<div className={styles["form-button-group"]}>
								<Button type='button' variant="outline">Vista Previa</Button>
								<Button type='submit' variant="tertiary" disabled={!isValid || !dirty}>Generar</Button>
							</div>
						</div>
					</Form>
				)}
			</Formik>
			<ToastContainer />
		</Modal>
	);

};

export default GenerateOrder;
