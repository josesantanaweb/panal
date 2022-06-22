import * as Yup from 'yup';

export const validationSchema = {
	addProperty: Yup.object({
		price: Yup.number().required('Requirido'),
	}),
};
