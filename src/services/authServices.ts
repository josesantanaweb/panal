import api from '../config/api';

const AuthServices = {
	login: async (data: any) => {
		const response = await api.post('/auth/login', data);
		return response.data;
	}
};

export default AuthServices;
