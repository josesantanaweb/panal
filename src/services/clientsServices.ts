import api from '../config/api';
import { getValue } from '../utils/localStorage';

const ClientsServices = {
	getClients: async () => {
		const response = await api.get('realtors', {
			headers: {Authorization:  `Bearer ${getValue('token')}`}
		});
		return response.data;
	},
	addClient: async (data: any) => {
		const response = await api.post('/realtors', data, {
			headers: {Authorization:  `Bearer ${getValue('token')}`}
		});
		return response.data;
	},
};

export default ClientsServices;
