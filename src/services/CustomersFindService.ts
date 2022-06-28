import api from 'config/api';
import { getValue } from 'utils';

const CustomersFindServices = {
	getCustomers: (name?: string) =>
		api.get(`customers?nameOrLastName=${name || ''}`, {
			headers: { Authorization: `Bearer ${getValue('token')}` },
		}),
	// getCustomer: async (id: number) =>
	// 	api.get(`customers/${id}`, {
	// 		headers: { Authorization: `Bearer ${getValue('token')}` },
	// 	}),
	getCustomersFind: async () =>
		api.get('customer-find', {
			headers: { Authorization: `Bearer ${getValue('token')}` },
		}),
	getCustomerHistory: async (id: number) =>
		api.get(`customers/${id}/history`, {
			headers: { Authorization: `Bearer ${getValue('token')}` },
		}),
	addCustomerFind: async (data: any) =>
		api.post('customers', data, {
			headers: { Authorization: `Bearer ${getValue('token')}` },
		}),
	editCustomer: async (id: number, data: any) =>
		api.patch(`customers/${id}`, data, {
			headers: { Authorization: `Bearer ${getValue('token')}` },
		}),
	deleteCustomer: async (id: number) =>
		api.delete(`customers/${id}`, {
			headers: { Authorization: `Bearer ${getValue('token')}` },
		}),
};

export default CustomersFindServices;
