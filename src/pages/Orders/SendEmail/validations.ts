import * as Yup from 'yup';

export const validationSchema = {
	sendEmail: Yup.object({
		subject: Yup.string().required('Requirido'),
		toEmail: Yup.string().email('Email es invalido').required('Requirido'),
	}),
};
