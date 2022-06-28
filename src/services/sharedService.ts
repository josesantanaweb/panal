import api from 'config/api';
import { getValue } from 'utils';

const SharedServices = {
	getDocuments: async () =>
		api.get('/identity-documents', {
			headers: { Authorization: `Bearer ${getValue('token')}` },
		}),
	getCountries: async () =>
		api.get('countries', {
			headers: {
				Authorization: `Bearer ${getValue('token')}`,
			},
		}),
	getStates: async () =>
		api.get('states', {
			headers: {
				Authorization: `Bearer ${getValue('token')}`,
			},
		}),
	getOperations: async () =>
		api.get('operations', {
			headers: {
				Authorization: `Bearer ${getValue('token')}`,
			},
		}),
	getCommunes: async () =>
		api.get('communes', {
			headers: {
				Authorization: `Bearer ${getValue('token')}`,
			},
		}),
	getPropertyTypes: async () =>
		api.get('properties/new-property', {
			headers: {
				Authorization: `Bearer ${getValue('token')}`,
			},
		}),
};

export default SharedServices;
