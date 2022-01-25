import api from '../config/api';
import { getValue } from '../utils/localStorage';

const CustomersServices = {
	getCustomers: async ({ queryKey }: any) => {
		const response = await api.get(`customers/?limit=${queryKey[1]}`, {
			headers: {Authorization:  `Bearer ${getValue('token')}`}
		});
		return response.data;
	},
	getCustomer: async ({ queryKey }: any) => {
		const response = await api.get(`customers/${queryKey[1]}`, {
			headers: {Authorization:  `Bearer ${getValue('token')}`}
		});
		return response.data;
	},
	addCustomer: async (data: any) => {
		const response = await api.post('/customers', data, {
			headers: {Authorization:  `Bearer ${getValue('token')}`}
		});
		return response.data;
	},
	editCustomer: async ({ userId, ...data }: any) => {
		const response = await api.patch(`/customers/${userId}`, data, {
			headers: {Authorization:  `Bearer ${getValue('token')}`}
		});
		return response.data;
	},
	deleteCustomer: async (id: number) => {
		const response = await api.delete(`/customers/${id}`, {
			headers: {Authorization:  `Bearer ${getValue('token')}`}
		});
		return response.data;
	},
};

export default CustomersServices;
