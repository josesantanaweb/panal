import api from '../config/api';
import { getValue } from '../utils/localStorage';

const OrdersServices = {
	getOrders: async ({ queryKey }: any) => {
		const response = await api.get(`/visiting-order?limit=100`, {
			headers: { Authorization: `Bearer ${getValue('token')}` },
		});
		return response.data;
	},
	generateOrder: async (data: any) => {
		const response = await api.post('/visiting-order', data, {
			headers: { Authorization: `Bearer ${getValue('token')}` },
		});
		return response.data;
	},
	sendEmail: async ({ orderId, ...data }: any) => {
		const response = await api.post(
			`/visiting-order/${orderId}/notification`,
			data,
			{
				headers: { Authorization: `Bearer ${getValue('token')}` },
			}
		);
		return response.data;
	},
	deleteOrder: async (id: number) => {
		const response = await api.delete(`/visiting-order/${id}`, {
			headers: { Authorization: `Bearer ${getValue('token')}` },
		});
		return response.data;
	},
};

export default OrdersServices;
