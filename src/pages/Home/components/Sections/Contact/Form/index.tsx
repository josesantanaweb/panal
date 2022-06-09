import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import styles from './styles.module.scss';

const SignupSchema = Yup.object().shape({
	names: Yup.string()
		.min(2, 'Muy corto!')
		.max(50, 'Demasiado largo!')
		.required('Campo requerido'),
	phone: Yup.string()
		.min(2, 'Muy corto!')
		.max(50, 'Demasiado largo!')
		.required('Campo requerido'),
	company: Yup.string()
		.min(2, 'Muy corto!')
		.max(50, 'Demasiado largo!')
		.required('Campo requerido'),
	email: Yup.string().email('Email inválido').required('Campo Requerido'),
	message: Yup.string()
		.min(2, 'Muy corto!')
		.max(50, 'Demasiado largo!')
		.required('Campo requerido'),
});

const ContactForm = () => {
	return (
		<React.Fragment>
			<form className={styles['form']}>
				<div className={styles['form-group']}>
					<label className={styles['form-label']}>Nombre</label>
					<input
						className={styles['form-control']}
						type="text"
						placeholder="Ingrese sú nombre"
					/>
				</div>
				<div className={styles['form-group']}>
					<label className={styles['form-label']}>Teléfono</label>
					<input
						className={styles['form-control']}
						type="text"
						placeholder="56 0 0000 0000"
					/>
				</div>
				<div className={styles['form-group']}>
					<label className={styles['form-label']}>Empresa</label>
					<input
						className={styles['form-control']}
						type="text"
						placeholder="Ingrese sú empresa"
					/>
				</div>
				<div className={styles['form-group']}>
					<label className={styles['form-label']}>Email</label>
					<input
						className={styles['form-control']}
						type="text"
						placeholder="Ingrese sú email"
					/>
				</div>
				<div className={styles['textarea__section']}>
					<label className={styles['form-label']}>Mensaje</label>
					<textarea
						className={styles['textarea']}
						placeholder="Deje sú mensaje"
					/>
				</div>
				<div className={styles['btn__submit__section']}>
					<div>
						<input type="submit" className={styles['btn__submit']} />
					</div>
				</div>
			</form>
		</React.Fragment>
	);
};

export default ContactForm;
