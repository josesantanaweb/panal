export const initialValues = {
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
