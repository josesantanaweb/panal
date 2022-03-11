import React from "react";
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Button from "components/Button";
import Input from "components/Input";

import styles from "./styles.module.scss";
import { IValues } from './types';
import { isAuthenticatedSelector } from 'store/selectors';
import { setAuthenticated, setRole } from 'store/features/authSlice';
import logo from "../../assets/img/logo-small.svg";
import AuthServices from 'services/authServices';
import { saveValue } from "utils/localStorage";

const Login = () => {
	const isAuthenticated = useSelector(isAuthenticatedSelector);
	const dispatch = useDispatch();
	const { mutate, isLoading } = useMutation(AuthServices.login, {
		onSuccess: (data) => {
			dispatch(setAuthenticated(true));
			saveValue('token', data.access_token);
			saveValue('role', data.rol.name);
			dispatch(setRole(data.rol.name));
		},
		onError: () => {
			toast.error(`${"Credenciales Invalidas"}`, {
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

	// Validataions
	const validationSchema = {
		login : Yup.object({
			email: Yup.string().email("Email Invalid").required("Requirido"),
			password: Yup.string().required("Requirido").min(5).max(25),
		})
	};

	// Initial values
	const INITIAL_VALUES = {
		email: '',
		password: '',
	};

	const onSubmit = (values: IValues) => {
		mutate(values);
	};

	if (isAuthenticated)
		return <Navigate to="/" />;

	return (
		<div className={styles.login}>
			<div className={styles["login-welcome"]}>
				<h3>Bienvenido a Panal</h3>
				<p> Aliquam sodales pharetra diam vitae sagittis. </p>
			</div>
			<div className={styles["login-container"]}>
				<Formik
					initialValues={INITIAL_VALUES}
					validationSchema={validationSchema.login}
					onSubmit={onSubmit}
				>
					{({ errors, touched, isValid, dirty}) => (
						<Form className={styles["login-form"]}>
							<div className={styles["login-header"]}>
								<img src={logo} alt="logo"/>
								<h3>Login</h3>
							</div>
							<div className={styles["login-row"]}>
								<Field
									type="email"
									name="email"
									placeholder="Ingrese su Email"
									required
									component={Input}
									error={errors.email && touched.email ? errors.email : null}
								/>
							</div>
							<div className={styles["login-row"]}>
								<Field
									type="password"
									name="password"
									placeholder="Ingrese su Password"
									required
									component={Input}
									error={errors.password && touched.password ? errors.password : null}
								/>
							</div>
							<p className={styles["login-recover"]}>Olvidaste tu contraseña?</p>
							<div className={styles["login-row"]}>
								<Button type='submit'>Login</Button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
			<ToastContainer />
		</div>
	);
};

export default Login;
