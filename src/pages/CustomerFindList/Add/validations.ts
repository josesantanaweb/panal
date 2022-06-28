import * as Yup from 'yup';

export const validationSchema = {
	addCustomer: Yup.object({
		name: Yup.string()
			.min(2, 'Nombre muy corto')
			.max(50, 'Nombre muy largo')
			.required('Nombre requerido'),
		lastName: Yup.string()
			.min(2, 'Apellido muy corto')
			.max(50, 'Apellido muy largo')
			.required('Apellido requerido'),
		identityDocumentType: Yup.string(),
		identityDocumentNumber: Yup.string()
			.min(9, 'Número de documento Inválido')
			.max(9, 'Recuerda: xxx xxx xxx sin espacios')
			.required('Número de documento inválido'),
		contactPhone: Yup.string()
			.min(8, 'Valor inválido')
			.max(9, 'Máximo 9 dígitos'),
		whatsappPhone: Yup.string()
			.min(8, 'Valor inválido')
			.max(9, 'Máximo 9 dígitos'),
		email: Yup.string()
			.email('Formato de email inválido')
			.required('Email requerido'),
		location: Yup.string().required('Ubicación requerida'),
		propertytypeId: Yup.string(),
	}),
};

/**
 * 
 * export const initialValues = {
	name: '',
	lastName: '',
	email: '',
	contactPhone: '',
	whatsappPhone: '',
	identityDocumentType: '',
	identityDocumentNumber: '',
	operationId: '',
	location: [
		{
			stateId: '',
			detailedAddress: {
				commune: '',
			},
		},
		{
			stateId: '',
			detailedAddress: {
				commune: '',
			},
		},
	],
	characteristics: {
		minPrice: '',
		maxPrice: '',
		propertytypeId: '',
		currencyId: '',
		bedrooms: '',
		bathrooms: '',
	},
};

 * 
 */
