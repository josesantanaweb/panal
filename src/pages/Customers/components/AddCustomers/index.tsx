import React, { useState, useEffect } from 'react';
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
import {AddCustomersProps, IValues} from "./types";
import {ISelect} from "interfaces";
import CustomersServices from 'services/customersServices';
import DocumentsServices from 'services/documentsServices';

const AddCustomers:React.FC<AddCustomersProps> = ({setOpenModal, openModal}) => {
	const [documentTypeOptions, setDocumentTypeOptions] = useState<ISelect[]>([]);
	const [documentType, setDocumentType] = useState<any>();
	const [mortgage, setMortgage] = useState<boolean>(false);
	const [cashPayment, setCashPayment] = useState<boolean>(false);
	const [openSelectDocumentType, setOpenSelectDocumentType] = useState<boolean>(false);
	const { data: documents, isLoading, isError } = useQuery(["documents"], DocumentsServices.getDocuments);
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

	const handleMortgage = () => setMortgage(!mortgage);

	const handleCashPayment = () => setCashPayment(!cashPayment);

	// Validataions
	const validationSchema = {
		addCustomer : Yup.object({
			name: Yup.string().required("Requerido"),
			lastName: Yup.string().required("Requerido"),
			email: Yup.string().email("Correo Invalido").required("Requerido"),
			identityDocumentNumber: Yup.string().required("Requerido"),
		})
	};

	// Initial values
	const INITIAL_VALUES = {
		name: '',
		lastName: '',
		email: '',
		identityDocumentId: 1,
		identityDocumentNumber: '',
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
			identityDocumentNumber,
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
			identityDocumentId: documentType.value,
			identityDocumentNumber,
			localPhone,
			phone,
			address,
			cashPayment,
		  mortgage,
			comments
		});
		resetForm({ values: ''});
		setCashPayment(false);
		setMortgage(false);
	};

	return (
		<Modal openModal={openModal} setOpenModal={setOpenModal} title="Crear Cliente">
			<div className={styles["form-label"]}>
				<p>Información del cliente</p>
			</div>
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
						<div className={styles["form-single"]}>
							<Field
								name="comments"
								placeholder="Ingrese Comentario"
								label="Comentario"
								textarea
								component={Input}
							/>
						</div>
						<div className={styles["form-checkbox"]}>
							<Field
								name="mortgage"
								type="checkbox"
								label="Hipotecario"
								component={Checkbox}
							/>
							<Field
								name="cashPayment"
								type="checkbox"
								label="Pago al contado"
								component={Checkbox}
							/>
						</div>
						<div className={styles["form-footer"]}>
							<Button type='submit' disabled={!isValid || !dirty}>Guardar Cliente</Button>
						</div>
					</Form>
				)}
			</Formik>
			<ToastContainer />
		</Modal>
	);

};

export default AddCustomers;