import api from 'config/api';
import { getValue } from 'utils';

const OrdersServices = {
	getOrders: () =>
		api.get('visiting-order', {
			headers: { Authorization: `Bearer ${getValue('token')}` },
		}),
	getOrder: async (id: number) =>
		api.get(`visiting-order/${id}`, {
			headers: { Authorization: `Bearer ${getValue('token')}` },
		}),
	addOrder: async (data: any) =>
		api.post('visiting-order', data, {
			headers: { Authorization: `Bearer ${getValue('token')}` },
		}),
	editOrder: async (id: number, data: any) =>
		api.patch(`visiting-order/${id}`, data, {
			headers: { Authorization: `Bearer ${getValue('token')}` },
		}),
	deleteOrder: async (id: number) =>
		api.delete(`visiting-order/${id}`, {
			headers: { Authorization: `Bearer ${getValue('token')}` },
		}),
	sendEmail: async (data: any, orderId: any) => {
		api.post(`/visiting-order/${orderId}/notification`, data, {
			headers: { Authorization: `Bearer ${getValue('token')}` },
		});
	},
};

export default OrdersServices;
