import React, { useEffect, useState } from 'react';
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
import {EditCustomersProps, IValues} from "./types";
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

const EditCustomers:React.FC<EditCustomersProps> = ({setOpenModal, openModal, userId}) => {
	const [documentType, setDocumentType] = useState(documentTypeOptions[0]);
	const [mortgage, setMortgage] = useState<boolean>(false);
	const [cashPayment, setCashPayment] = useState<boolean>(false);
	const [openSelectDocumentType, setOpenSelectDocumentType] = useState<boolean>(false);
	const queryClient = useQueryClient();
	const hasUserId = userId > 0;
	const { data, isLoading } = useQuery(["customer", userId], CustomersServices.getCustomer, { enabled: hasUserId });

	const { mutate } = useMutation(CustomersServices.editCustomer, {
		onSuccess: (data) => {
			toast.success("Cliente editado exitosamente", {
				position: "top-right",
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
			});
			queryClient.invalidateQueries(['customers']);
			setTimeout(() => {
				// window.location.reload();
			}, 2000);
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

	const handleMortgage = () => setMortgage(!mortgage);

	const handleCashPayment = () => setCashPayment(!cashPayment);

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
		cashPayment: true,
		mortgage: true,
		comments: ''
	};

	const onSubmit = (values: IValues) => {
		const {
			name,
			lastName,
			documentNumber,
			localPhone,
			phone,
			address,
			cashPayment,
		  mortgage,
			comments
		} = values;

		mutate({
			userId,
			name,
			lastName,
			documentType: documentType.value,
			documentNumber,
			localPhone,
			phone,
			address,
			cashPayment,
		  mortgage,
			comments
		});
	};

	return (
		<Modal openModal={openModal} setOpenModal={setOpenModal} title="Editar Cliente">
			<div className={styles["form-label"]}>
				<p>Información del cliente</p>
			</div>
			{
				isLoading ?
					<SkeletonTheme
        	baseColor="#E8F6FC"
        	highlightColor="#DDF4FF"
        	borderRadius={2}
					>
        	<div className={styles["form-container"]}>
        		<div className={styles["form-rows"]}>
        			<Skeleton width="100%" height="35px" />
        			<Skeleton width="100%" height="35px" />
        		</div>
        		<div className={styles["form-rows"]}>
        			<Skeleton width="100%" height="35px" />
        			<Skeleton width="100%" height="35px" />
        		</div>
        		<div className={styles["form-rows"]}>
        			<Skeleton width="100%" height="35px" />
        			<Skeleton width="100%" height="35px" />
        		</div>
        		<div className={styles["form-rows"]}>
        			<Skeleton width="100%" height="35px" />
        			<Skeleton width="100%" height="35px" />
        		</div>
        		<div className={styles["form-footer"]}>
        			<Skeleton width="230px" height="35px" />
        		</div>
        	</div>
					</SkeletonTheme>
					:
					<Formik
						initialValues={data || INITIAL_VALUES}
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
										disabled
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
								<div className={styles["form-rows"]}>
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
			}
			<ToastContainer />
		</Modal>
	);

};

export default EditCustomers;