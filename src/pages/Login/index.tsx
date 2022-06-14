import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Input, Button } from 'components';
import logo from 'assets/images/logo.svg';
import AuthServices from 'services/authService';
import { toastError } from 'utils/libs/toast';
import { validationSchema } from './validations';
import { initialValues } from './initialValues';
import useAuth from 'hooks/useAuth';

const Login = () => {
	const { login, user }: any = useAuth();

	const onSubmit = async (values: any) => {
		try {
			const response = await AuthServices.login(values);
			login(response.data);
		} catch (error) {
			toastError('Credenciales Invalidas');
		}
	};

	if (user) return <Navigate to="/" />;

	return (
		<div className="login">
			<div className="login-picture"></div>
			<section className="login-content">
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema.login}
					onSubmit={onSubmit}>
					{({ errors, touched, isValid, dirty }) => (
						<Form className="login-form">
							<div className="login-logo">
								<img src={logo} alt="" />
							</div>
							<h4 className="login-title">Login</h4>
							<div className="input-group">
								<Field
									type="email"
									name="email"
									label="Email"
									placeholder="Ingrese su Email"
									component={Input}
									error={errors.email && touched.email ? errors.email : null}
								/>
							</div>
							<div className="input-group">
								<Field
									type="password"
									name="password"
									label="Contraseña"
									placeholder="Ingrese su Contraseña"
									component={Input}
									error={
										errors.password && touched.password ? errors.password : null
									}
								/>
							</div>
							<div className="mt-4">
								<Button block disabled={!isValid || !dirty}>
									Guardar
								</Button>
							</div>
						</Form>
					)}
				</Formik>
				<ToastContainer />
			</section>
		</div>
	);
};

export default Login;
