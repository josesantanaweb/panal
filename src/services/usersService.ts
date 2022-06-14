import api from 'config/api';
import { getValue } from 'utils';

const UsersServices = {
	getUsers: () =>
		api.get('users', {
			headers: { Authorization: `Bearer ${getValue('token')}` },
		}),
	getUser: async (id: number) =>
		api.get(`users/${id}`, {
			headers: { Authorization: `Bearer ${getValue('token')}` },
		}),
	addUser: async (data: any) =>
		api.post('users', data, {
			headers: { Authorization: `Bearer ${getValue('token')}` },
		}),
	editUser: async (id: number, data: any) =>
		api.patch(`users/${id}`, data, {
			headers: { Authorization: `Bearer ${getValue('token')}` },
		}),
	deleteUser: async (id: number) =>
		api.delete(`users/${id}`, {
			headers: { Authorization: `Bearer ${getValue('token')}` },
		}),
};

export default UsersServices;
