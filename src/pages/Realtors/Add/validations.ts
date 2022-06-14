import * as Yup from 'yup';

export const validationSchema = {
	addRealtor: Yup.object({
		name: Yup.string().required('Requirido'),
		lastName: Yup.string().required('Requirido'),
		email: Yup.string().email('Email es invalido').required('Requirido'),
		password: Yup.string().required('Requirido').min(5).max(25),
	}),
};
