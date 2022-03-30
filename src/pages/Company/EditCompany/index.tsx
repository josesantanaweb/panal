import React from "react";
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import styles from "../styles.module.scss";
import Input from "components/Input";
import Button from "components/Button";

import {EditCompanyProps, IValues} from "./types";

import CompanyServices from 'services/companyServices';

const EditCompany:React.FC<EditCompanyProps> = ({data, isLoading}) => {
	const queryClient = useQueryClient();

	const { mutate } = useMutation(CompanyServices.editCompany, {
		onSuccess: (data) => {
			toast.success("Empresa editada exitosamente", {
				position: "top-right",
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
			});
			queryClient.invalidateQueries(['companies']);
		},
		onError: (error: any) => {
			toast.error("Error al guardar empresa", {
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

	const onSubmit = (values: IValues) => {
		const {
			name,
			email,
			phone,
			giro,
			rut,
		} = values;

		mutate({
			realtorId: 3,
			name,
			email,
			giro,
			phone,
			rut,
		});
		console.log(values);
	};

	return (
		isLoading ?
			<SkeletonTheme
				baseColor="#E8F6FC"
				highlightColor="#DDF4FF"
				borderRadius={2}
			>
				<div className={styles["business-form"]}>
					<h5>Informacion de Empresa</h5>
					<div className={styles["business-column"]}>
						<div className={styles["business-row"]}>
							<Skeleton width="100%" height="35px" />
						</div>
						<div className={styles["business-row"]}>
							<Skeleton width="100%" height="35px" />
						</div>
					</div>
					<div className={styles["business-column"]}>
						<div className={styles["business-row"]}>
							<Skeleton width="100%" height="35px" />
						</div>
						<div className={styles["business-row"]}>
							<Skeleton width="100%" height="35px" />
						</div>
					</div>
					<div className={styles["business-column"]}>
						<div className={styles["business-row"]}>
							<Skeleton width="100%" height="35px" />
						</div>
					</div>
				</div>
			</SkeletonTheme>
			:
			<>
				<Formik
					initialValues={data}
					onSubmit={onSubmit}
				>
					{({ errors, touched, isValid, dirty}) => (
						<Form className={styles["business-form"]}>
							<h5>Informacion de Empresa</h5>
							<div className={styles["business-column"]}>
								<div className={styles["business-row"]}>
									<Field
										type="text"
										name="name"
										placeholder="Ingrese el nombre de la empresa"
										required
										label="Nombre de la empresa"
										component={Input}
										error={errors.name && touched.name ? errors.name : null}
									/>
								</div>
								<div className={styles["business-row"]}>
									<Field
										type="email"
										name="email"
										placeholder="Ingrese el email de la empresa"
										required
										label="Email de la empresa"
										component={Input}
										error={errors.email && touched.email ? errors.email : null}
									/>
								</div>
							</div>
							<div className={styles["business-column"]}>
								<div className={styles["business-row"]}>
									<Field
										type="text"
										name="rut"
										placeholder="Ingrese el rut de la empresa"
										required
										label="Rut de la empresa"
										component={Input}
										error={errors.rut && touched.rut ? errors.rut : null}
									/>
								</div>
								<div className={styles["business-row"]}>
									<Field
										type="text"
										name="phone"
										placeholder="Ingrese el telefono de la empresa"
										required
										label="Telefono de la empresa"
										component={Input}
										error={errors.phone && touched.phone ? errors.phone : null}
									/>
								</div>
							</div>
							<div className={styles["business-column"]}>
								<div className={styles["business-row"]}>
									<Field
										type="text"
										name="giro"
										placeholder="Ingrese el giro"
										required
										label="Giro de la empresa"
										component={Input}
										error={errors.giro && touched.giro ? errors.giro : null}
									/>
								</div>
							</div>
							<div className={styles["business-column"]}>
								<div className={styles["business-save"]}>
									<Button full type='submit' disabled={!isValid || !dirty}>Guardar</Button>
								</div>
							</div>
						</Form>
					)}
				</Formik>
				<ToastContainer />
			</>
	);
};

export default EditCompany;
