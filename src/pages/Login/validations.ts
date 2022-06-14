import * as Yup from 'yup';

export const validationSchema = {
	login: Yup.object({
		email: Yup.string().email('Email es invalido').required('Requirido'),
		password: Yup.string()
			.required('Requirido')
			.min(5, 'La contraseña debe tener al menos 5 caracteres'),
	}),
};
