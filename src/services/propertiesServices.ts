import api from '../config/api';
import { getValue } from '../utils/localStorage';

const PropertiesServices = {
	getProperties: async () => {
		const response = await api.get(`properties`, {
			headers: {Authorization:  `Bearer ${getValue('token')}`}
		});
		return response.data;
	},
	addProperties: async (data: any) => {
		const response = await api.post('/properties', data, {
			headers: {Authorization:  `Bearer ${getValue('token')}`}
		});
		return response.data;
	},
	uploadImagen: async (data: any, id: number) => {
		const response = await api.post(`/properties/${id}/images`, data, {
			headers: {Authorization:  `Bearer ${getValue('token')}`}
		});
		return response.data;
	},
};

export default PropertiesServices;
