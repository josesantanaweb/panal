export const initialValues = {
	price: 100,
	commission: 100,
	ownerLessor: {
		name: '',
		lastName: '',
		rut: '',
		email: '',
		fono: '',
		rolNumber: 0,
		newProperty: false,
		usedProperty: false,
		privateObservations: '',
		customerId: 1,
	},
	address: {
		detailedAddress: {
			commune: '',
			number: 0,
			cityId: '',
			sector: '',
		},
		latitude: '',
		longitude: '',
	},
	observations: {
		publicTitle: '',
		description: '',
	},
};
