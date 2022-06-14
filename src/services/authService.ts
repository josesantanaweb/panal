import api from 'config/api';

const AuthServices = {
	login: async (data: any) => api.post('/auth/login', data),
};

export default AuthServices;
