import api from '../config/api';
import { getValue } from '../utils/localStorage';

const SupportsServices = {
	getSupportsTypes: async () => {
		const response = await api.get(`supports/types`, {
			headers: { Authorization: `Bearer ${getValue('token')}` },
		});
		return response.data;
	},
	addSupports: async (data: any) => {
		const response = await api.post('/supports', data, {
			headers: { Authorization: `Bearer ${getValue('token')}` },
		});
		return response.data;
	},
};

export default SupportsServices;