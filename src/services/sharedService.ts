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
		api.get('states?countryId=1&limit=100', {
			headers: {
				Authorization: `Bearer ${getValue('token')}`,
			},
		}),
	getPortals: async () =>
		api.get('external-portals', {
			headers: {
				Authorization: `Bearer ${getValue('token')}`,
			},
		}),
};

export default SharedServices;
