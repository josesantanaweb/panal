import * as Yup from 'yup';

export const validationSchema = {
	editUser: Yup.object({
		name: Yup.string().required('Requirido'),
		lastName: Yup.string().required('Requirido'),
		email: Yup.string().email('Email es invalido').required('Requirido'),
	}),
};
