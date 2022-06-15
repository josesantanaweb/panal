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
};

export default SharedServices;