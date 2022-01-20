import api from '../config/api';
import { getValue, removeItem } from '../utils/localStorage';

const AuthServices = {
	login: async (data: any) => {
		const response = await api.post('/auth/login', data);
		return response.data;
	},
	testSession: async () => {
		const response = await api.get('auth/test', {
			headers: {Authorization:  `Bearer ${getValue('token')}`}
		});

		return response.data;
	},
};

export default AuthServices;
