import api from '../config/api';
import { getValue } from '../utils/localStorage';

const OrdersServices = {
	generateOrder: async (data: any) => {
		const response = await api.post('/visiting-order', data, {
			headers: { Authorization: `Bearer ${getValue('token')}` },
		});
		return response.data;
	},
};

export default OrdersServices;
