import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Button from "components/Button";
import Modal from "components/Modal";
import Select from "components/Select";
import Input from "components/Input";
import Checkbox from "components/Checkbox";

import styles from "./styles.module.scss";
import {AddUsersProps, IValues} from "./types";
import CustomersServices from 'services/customersServices';
import portalInmobilario from "assets/img/portal-inmobilario.png";
import goplaceit from "assets/img/goplaceit.png";
import icasa from "assets/img/icasa.png";
import chilePropiedades from "assets/img/chile-propiedades.png";
import enlaceInmobilario from "assets/img/enlace-inmobilario.png";
import doomos from "assets/img/doomos.png";
import toctoc from "assets/img/toctoc.png";
import emol from "assets/img/emol.png";
import portalTerreno from "assets/img/portal-terreno.png";
import zoom from "assets/img/zoom.png";
import propiv from "assets/img/propiv.png";
import yapo from "assets/img/yapo.png";

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

const AddUsers:React.FC<AddUsersProps> = ({setOpenModal, openModal}) => {
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
			name: Yup.string().required("Requerido"),
			lastName: Yup.string().required("Requerido"),
			email: Yup.string().email("Correo Invalido").required("Requerido"),
			documentNumber: Yup.string().required("Requerido"),
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
		<Modal openModal={openModal} setOpenModal={setOpenModal} title="Crear Usuario">
			<div className={styles["form-label"]}>
				<p>Información del usuario</p>
			</div>
			<Formik
				initialValues={INITIAL_VALUES}
				validationSchema={validationSchema.addCustomer}
				onSubmit={onSubmit}
				clasName={styles["form-container"]}
			>
				{({ errors, touched, isValid, dirty}) => (
					<Form className={styles["form-wrapper"]}>
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
								required
								placeholder="Ingrese su Correo Electronico"
								label="Correo Electronico"
								component={Input}
								error={errors.email && touched.email ? errors.email : null}
							/>
							<Field
								type="text"
								name="address"
								placeholder="Ingrese su Domicilio"
								label="Domicilio"
								component={Input}
							/>
						</div>
						<div className={styles["form-section"]}>
							<div className={styles["form-label"]}>
								<p>Cargo y descripción</p>
							</div>
						</div>
						<div className={styles["form-single"]}>
							<Select
								options={documentTypeOptions}
								label="Cargo"
								required
								selectedOption={documentType}
								setSelectedOption={setDocumentType}
								open={openSelectDocumentType}
								setOpen={setOpenSelectDocumentType}
								handleOpenSelect={handleOpenDocumentType}
							/>
						</div>
						<div className={styles["form-section"]}>
							<div className={styles["form-label"]}>
								<p>Aplicación</p>
							</div>
						</div>
						<div className={styles["form-rows"]}>
							<Select
								options={documentTypeOptions}
								label="Cargo"
								required
								selectedOption={documentType}
								setSelectedOption={setDocumentType}
								open={openSelectDocumentType}
								setOpen={setOpenSelectDocumentType}
								handleOpenSelect={handleOpenDocumentType}
							/>
							<Field
								type="text"
								name="office"
								placeholder="Ingrese su Oficina"
								label="Oficina"
								component={Input}
							/>
						</div>
						<div className={styles["form-rows"]}>
							<Field
								type="text"
								name="password"
								placeholder="Ingrese su Contraseña"
								label="Oficina"
								component={Input}
							/>
							<Field
								type="text"
								name="confimr_password"
								placeholder="Repita su Contraseña"
								label="Confirme su Contraseña"
								component={Input}
							/>
						</div>
						<div className={styles["form-section"]}>
							<div className={styles["form-label"]}>
								<p>Perfil de evaluacion</p>
							</div>
						</div>
						<div className={styles["form-checkbox"]}>
							<Field
								name="mortgage"
								type="checkbox"
								label="Es Vendedor"
								component={Checkbox}
							/>
							<Field
								name="cashPayment"
								type="checkbox"
								label="Es Captador"
								component={Checkbox}
							/>
						</div>
						<div className={styles["form-section"]}>
							<div className={styles["form-label"]}>
								<p>Sitio web</p>
							</div>
						</div>
						<div className={styles["form-checkbox"]}>
							<Field
								name="mortgage"
								type="checkbox"
								label="Visible en web"
								component={Checkbox}
							/>
						</div>
						<div className={styles["form-section"]}>
							<div className={styles["form-label"]}>
								<p>VendeID</p>
							</div>
						</div>
						<div className={`${styles["form-checkbox"]} ${styles["width-imagen"]}`}>
							<Field
								name="mortgage"
								type="checkbox"
								imagen={portalInmobilario}
								component={Checkbox}
							/>
							<Field
								name="mortgage"
								type="checkbox"
								imagen={goplaceit}
								component={Checkbox}
							/>
						</div>
						<div className={`${styles["form-checkbox"]} ${styles["width-imagen"]}`}>
							<Field
								name="mortgage"
								type="checkbox"
								imagen={icasa}
								component={Checkbox}
							/>
							<Field
								name="mortgage"
								type="checkbox"
								imagen={chilePropiedades}
								component={Checkbox}
							/>
						</div>
						<div className={`${styles["form-checkbox"]} ${styles["width-imagen"]}`}>
							<Field
								name="mortgage"
								type="checkbox"
								imagen={enlaceInmobilario}
								component={Checkbox}
							/>
							<Field
								name="mortgage"
								type="checkbox"
								imagen={doomos}
								component={Checkbox}
							/>
						</div>
						<div className={`${styles["form-checkbox"]} ${styles["width-imagen"]}`}>
							<Field
								name="mortgage"
								type="checkbox"
								imagen={toctoc}
								component={Checkbox}
							/>
							<Field
								name="mortgage"
								type="checkbox"
								imagen={emol}
								component={Checkbox}
							/>
						</div>
						<div className={`${styles["form-checkbox"]} ${styles["width-imagen"]}`}>
							<Field
								name="mortgage"
								type="checkbox"
								imagen={zoom}
								component={Checkbox}
							/>
							<Field
								name="mortgage"
								type="checkbox"
								imagen={portalTerreno}
								component={Checkbox}
							/>
						</div>
						<div className={`${styles["form-checkbox"]} ${styles["width-imagen"]}`}>
							<Field
								name="mortgage"
								type="checkbox"
								imagen={propiv}
								component={Checkbox}
							/>
							<Field
								name="mortgage"
								type="checkbox"
								imagen={yapo}
								component={Checkbox}
							/>
						</div>
						<div className={styles["form-footer"]}>
							<Button type='submit' disabled={!isValid || !dirty}>Crear Usuario</Button>
						</div>
					</Form>
				)}
			</Formik>
			<ToastContainer />
		</Modal>
	);

};

export default AddUsers;
