import React, { useState, useEffect } from 'react';
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
import {AddRealtorsProps, IValues} from "./types";
import {ISelect} from "interfaces";
import RealtorsServices from 'services/realtorsServices';
import DocumentsServices from 'services/documentsServices';

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

const AddRealtors:React.FC<AddRealtorsProps> = ({setOpenModal, openModal}) => {
	const [documentTypeOptions, setDocumentTypeOptions] = useState<ISelect[]>([]);
	const [documentType, setDocumentType] = useState<any>();
	const [openSelectDocumentType, setOpenSelectDocumentType] = useState<boolean>(false);
	const queryClient = useQueryClient();
	const { data: documents, isLoading, isError } = useQuery(["documents"], DocumentsServices.getDocuments);
	const { mutate } = useMutation(RealtorsServices.addRealtors, {
		onSuccess: (data) => {
			toast.success("Agente registrado exitosamente", {
				position: "top-right",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
			});
			queryClient.invalidateQueries(['realtors']);
			setTimeout(() => {
				return setOpenModal(false);
			}, 3000);
		},
		onError: (error: any) => {
			toast.error(error.response.data.message === "This realtors already exists" && "Agente ya existe", {
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

	useEffect(() => {
		if (documents !== undefined) {
			documentTypeOptionsData();
		}
	}, [documents]);

	// Create array of options for documentType
	const documentTypeOptionsData = () => {
		const documentTypeOptionsData = documents?.data?.map((item: any) => ({label: item.name, value: item.id}));
		setDocumentTypeOptions(documentTypeOptionsData);
		if(documentTypeOptionsData !== undefined) {
			setDocumentType(documentTypeOptionsData[0]);
		}
	};

	// Handle Open limit select
	const handleOpenDocumentType = () => setOpenSelectDocumentType(true);

	// Validataions
	const validationSchema = {
		addRealtors : Yup.object({
			name: Yup.string().required("Requerido"),
			lastName: Yup.string().required("Requerido"),
			email: Yup.string().email("Correo Invalido").required("Requerido"),
			phone: Yup.string().required("Requerido"),
			identityDocumentNumber: Yup.string().required("Requerido"),
			password: Yup.string().required("Requirido").min(5).max(25),
			confirm_password: Yup.string().required("Requerido").oneOf([Yup.ref('password'), null], 'Contraseñas no coinciden'),
		})
	};

	// Initial values
	const INITIAL_VALUES = {
		name: '',
		lastName: '',
		email: '',
		identityDocumentId: 1,
		identityDocumentNumber: '',
		phone: '',
		address: '',
		password: '',
		confirm_password: ''
	};

	const onSubmit = (values: IValues, {resetForm}: any) => {
		const {
			name,
			lastName,
			email,
			identityDocumentNumber,
			phone,
			address,
			password,
		} = values;
		mutate({
			name,
			lastName,
			email,
			identityDocumentId: documentType.value,
			identityDocumentNumber,
			// phone,
			// address,
			password,
		});
		// resetForm({ values: ''});
	};

	return (
		<Modal openModal={openModal} setOpenModal={setOpenModal} title="Crear Agente">
			<div className={styles["form-label"]}>
				<p>Información del agente</p>
			</div>
			<Formik
				initialValues={INITIAL_VALUES}
				validationSchema={validationSchema.addRealtors}
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
								name="identityDocumentNumber"
								placeholder="Ingrese su Numero de Documento"
								label="Numero de Documento"
								required
								component={Input}
								error={errors.identityDocumentNumber && touched.identityDocumentNumber ? errors.identityDocumentNumber : null}
							/>
						</div>
						<div className={styles["form-rows"]}>
							<Field
								type="text"
								name="phone"
								required
								placeholder="Ingrese su Teléfono celular"
								label="Teléfono celular"
								component={Input}
								error={errors.phone && touched.phone ? errors.phone : null}
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
						<div className={styles["form-rows"]}>
							<Field
								type="text"
								name="address"
								placeholder="Ingrese su Direccion"
								label="Direccion"
								component={Input}
							/>
						</div>
						<div className={styles["form-section"]}>
							<div className={styles["form-label"]}>
								<p>Aplicación</p>
							</div>
						</div>
						<div className={styles["form-rows"]}>
							<Field
								type="text"
								name="password"
								placeholder="Ingrese su Contraseña"
								label="Contraseña"
								component={Input}
								error={errors.password && touched.password ? errors.password : null}
							/>
							<Field
								type="text"
								name="confirm_password"
								placeholder="Repita su Contraseña"
								label="Confirme su Contraseña"
								component={Input}
								error={errors.confirm_password && touched.confirm_password ? errors.confirm_password : null}
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
						{/* <div className={styles["form-section"]}>
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
						</div> */}
						<div className={styles["form-footer"]}>
							{/* <Button type='submit'>Crear Agente</Button> */}
							<Button type='submit' disabled={!isValid || !dirty}>Crear Agente</Button>
						</div>
					</Form>
				)}
			</Formik>
			<ToastContainer />
		</Modal>
	);

};

export default AddRealtors;
