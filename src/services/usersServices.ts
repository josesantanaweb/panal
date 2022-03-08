import api from '../config/api';
import { getValue } from '../utils/localStorage';

const UsersServices = {
	getUsers: async ({ queryKey }: any) => {
		const response = await api.get(`users`, {
			headers: {Authorization:  `Bearer ${getValue('token')}`}
		});
		return response.data;
	},
	addUsers: async (data: any) => {
		const response = await api.post('/users', data, {
			headers: {Authorization:  `Bearer ${getValue('token')}`}
		});
		return response.data;
	},
};

export default UsersServices;
