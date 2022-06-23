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
		characteristics: Yup.object().shape({
			numberOfSuites: Yup.number().required('Requirido'),
			bedrooms: Yup.number().required('Requirido'),
			serviceBedroom: Yup.number().required('Requirido'),
			bathrooms: Yup.number().required('Requirido'),
			landArea: Yup.string().required('Requirido'),
			constructedSurface: Yup.string().required('Requirido'),
			numberOfCoveredParkingSpaces: Yup.number().required('Requirido'),
			numberOfUncoveredParkingSpaces: Yup.number().required('Requirido'),
		}),
		observations: Yup.object().shape({
			publicTitle: Yup.string().required('Requirido'),
			description: Yup.string().required('Requirido'),
		}),
	}),
};
