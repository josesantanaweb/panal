import api from '../config/api';
import { getValue } from '../utils/localStorage';

const UsersServices = {
	getUsers: async ({ queryKey }: any) => {
		const response = await api.get(`users`, {
			headers: {Authorization:  `Bearer ${getValue('token')}`}
		});
		return response.data;
	},
	getUser: async ({ queryKey }: any) => {
		const response = await api.get(`users/${queryKey[1]}`, {
			headers: {Authorization:  `Bearer ${getValue('token')}`}
		});
		return response.data;
	},
	addUser: async (data: any) => {
		const response = await api.post('/users', data, {
			headers: {Authorization:  `Bearer ${getValue('token')}`}
		});
		return response.data;
	},
	editUser: async ({ userId, ...data }: any) => {
		const response = await api.patch(`/users/${userId}`, data, {
			headers: {Authorization:  `Bearer ${getValue('token')}`}
		});
		return response.data;
	},
	deleteUser: async (id: number) => {
		const response = await api.delete(`/users/${id}`, {
			headers: {Authorization:  `Bearer ${getValue('token')}`}
		});
		return response.data;
	},
};

export default UsersServices;
