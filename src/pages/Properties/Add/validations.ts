import * as Yup from 'yup';

export const validationSchema = {
	addProperty: Yup.object({
		price: Yup.number().required('Requirido'),
		commission: Yup.string().required('Requirido'),
		ownerLessor: Yup.object().shape({
			name: Yup.string().required('Requirido'),
			lastName: Yup.string().required('Requirido'),
			rut: Yup.string().required('Requirido'),
			email: Yup.string().required('Requirido'),
		}),
		observations: Yup.object().shape({
			publicTitle: Yup.string().required('Requirido'),
			description: Yup.string().required('Requirido'),
		}),
	}),
};
