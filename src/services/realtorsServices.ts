import api from '../config/api';
import { getValue } from '../utils/localStorage';

const RealtorsServices = {
	getRealtors: async ({ queryKey }: any) => {
		const response = await api.get(`realtors`, {
			headers: {Authorization:  `Bearer ${getValue('token')}`}
		});
		return response.data;
	},
	addRealtors: async (data: any) => {
		const response = await api.post('/realtors', data, {
			headers: {Authorization:  `Bearer ${getValue('token')}`}
		});
		return response.data;
	},
};

export default RealtorsServices;
