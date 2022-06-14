import api from 'config/api';
import { getValue } from 'utils';

const PropertiesServices = {
	getProperties: (name: string) =>
		api.get(`properties?titleOrId=${name || ''}`, {
			headers: { Authorization: `Bearer ${getValue('token')}` },
		}),
	getProperty: async (id: number) =>
		api.get(`properties/${id}`, {
			headers: { Authorization: `Bearer ${getValue('token')}` },
		}),
	addProperty: async (data: any) =>
		api.post('properties', data, {
			headers: { Authorization: `Bearer ${getValue('token')}` },
		}),
	editProperty: async (id: number, data: any) =>
		api.patch(`properties/${id}`, data, {
			headers: { Authorization: `Bearer ${getValue('token')}` },
		}),
	deleteProperty: async (id: number) =>
		api.delete(`properties/${id}`, {
			headers: { Authorization: `Bearer ${getValue('token')}` },
		}),
};

export default PropertiesServices;
