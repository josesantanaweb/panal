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

import styles from "./styles.module.scss";
import {ISelect} from "interfaces";
import {AddUsersProps, IValues} from "./types";
import UsersServices from 'services/usersServices';
import DocumentsServices from 'services/documentsServices';

const AddUsers:React.FC<AddUsersProps> = ({setOpenModal, openModal}) => {
	const [documentTypeOptions, setDocumentTypeOptions] = useState<ISelect[]>([]);
	const [documentType, setDocumentType] = useState<any>();
	const [openSelectDocumentType, setOpenSelectDocumentType] = useState<boolean>(false);
	const queryClient = useQueryClient();
	const { data: documents, isLoading, isError } = useQuery(["documents"], DocumentsServices.getDocuments);
	const { mutate } = useMutation(UsersServices.addUser, {
		onSuccess: (data) => {
			toast.success("Usuario registrado exitosamente", {
				position: "top-right",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
			});
			queryClient.invalidateQueries(['users']);
			setTimeout(() => {
				return setOpenModal(false);
			}, 3000);
		},
		onError: (error: any) => {
			toast.error(error.response.data.message === "This user already exists" && "Usuario ya existe", {
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
		addCustomer : Yup.object({
			name: Yup.string().required("Requerido"),
			lastName: Yup.string().required("Requerido"),
			email: Yup.string().email("Correo Invalido").required("Requerido"),
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
		password: '',
		confirm_password: '',
		phone: '',
		identityDocumentId: 1,
		identityDocumentNumber: '',
	};

	const onSubmit = (values: IValues, {resetForm}: any) => {
		const {
			name,
			lastName,
			email,
			identityDocumentNumber,
			phone,
			password,
		} = values;
		mutate({
			name,
			lastName,
			email,
			identityDocumentId: documentType.value,
			identityDocumentNumber,
			phone,
			password,
		});
		resetForm({ values: ''});
		console.log(values);
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
								name="phone"
								placeholder="Ingrese su Teléfono celular"
								label="Teléfono celular"
								component={Input}
								error={errors.phone && touched.phone ? errors.phone : null}
							/>
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
