import React, {useState, useEffect} from "react";
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ISelect} from "interfaces";
import styles from "./styles.module.scss";
import {IValues} from "./types";
import Input from "components/Input";
import Button from "components/Button";
import Select from "components/Select";
import SupportsServices from "services/supportServices";


const Support = () => {
	const [type, setType] = useState<any>();
	const [typeOptions, setTypeOptions] = useState<ISelect[]>([]);
	const [openSelectType, setOpenSelectType] = useState<boolean>(false);
	const { data: types, isLoading, isError } = useQuery(["types"], SupportsServices.getSupportsTypes);

	useEffect(() => {
		if (types !== undefined) {
			documentTypeOptionsData();
		}
	}, [types]);

  	// Create array of options for documentType
	const documentTypeOptionsData = () => {
		const typeOptionsData = types?.data?.map((item: any) => ({label: item.name, value: item.id}));
		setTypeOptions(typeOptionsData);
		if(typeOptionsData !== undefined) {
			setType(typeOptionsData[0]);
		}
	};

	const { mutate } = useMutation(SupportsServices.addSupports, {
		onSuccess: (data) => {
			toast.success("Ticket enviado exitosamente", {
				position: "top-right",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
			});
		},
		onError: (error: any) => {
			toast.error("Hubo un error", {
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

	// Handle Open type select
	const handleOpenType = () => setOpenSelectType(true);

	// Validataions
	const validationSchema = {
		addRealtors : Yup.object({
			name: Yup.string().required("Requerido"),
			email: Yup.string().email("Correo Invalido").required("Requerido"),
			message: Yup.string().required("Requerido"),
		})
	};

	// Initial values
	const INITIAL_VALUES = {
		name: '',
		message: '',
		email: '',
	};

	const onSubmit = (values: IValues, {resetForm}: any) => {
		const {
			name,
			message,
			email,
		} = values;
		mutate({
			name,
			email,
			message,
			typeId: type.value,
		});
		resetForm({ values: ''});
	};

	return (
		<div className={styles.support}>
			<div className={styles["support-top"]}>
				<h2 className={styles["support-title"]}>Soporte</h2>
			</div>
			<Formik
				initialValues={INITIAL_VALUES}
				validationSchema={validationSchema.addRealtors}
				onSubmit={onSubmit}
				clasName={styles["form-container"]}
			>
				{({ errors, touched, isValid, dirty}) => (
					<Form className={styles["support-form"]}>
						<div className={styles["support-column"]}>
							<div className={styles["support-row"]}>
								<Select
									options={typeOptions}
									label="Tipo de Documento"
									required
									selectedOption={type}
									setSelectedOption={setType}
									open={openSelectType}
									setOpen={setOpenSelectType}
									handleOpenSelect={handleOpenType}
								/>
							</div>
						</div>
						<div className={styles["support-column"]}>
							<div className={styles["support-row"]}>
								<Field
									type="text"
									name="name"
									placeholder="Ingrese su Nombre"
									required
									label="Nombre"
									component={Input}
									error={errors.name && touched.name ? errors.name : null}
								/>
							</div>
							<div className={styles["business-row"]}>
								<Field
									type="email"
									name="email"
									placeholder="Ingrese su Email"
									required
									label="Email"
									component={Input}
									error={errors.email && touched.email ? errors.email : null}
								/>
							</div>
						</div>
						<div className={styles["support-column"]}>
							<div className={styles["support-row"]}>
								<Field
									name="message"
									placeholder="Ingrese su descripcion"
									required
									label="Description"
									component={Input}
									error={errors.message && touched.message ? errors.message : null}
									textarea
								/>
							</div>
						</div>
						<div className={styles["support-column"]}>
							<div className={styles["support-save"]}>
								<Button type='submit' disabled={!isValid || !dirty}>Enviar</Button>
							</div>
						</div>
					</Form>
				)}
			</Formik>
			<ToastContainer />
		</div>
	);
};

export default Support;
