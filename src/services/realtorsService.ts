import api from 'config/api';
import { getValue } from 'utils';

const RealtorsServices = {
	getRealtors: () =>
		api.get('realtors', {
			headers: { Authorization: `Bearer ${getValue('token')}` },
		}),
	getRealtor: async (id: number) =>
		api.get(`realtors/${id}`, {
			headers: { Authorization: `Bearer ${getValue('token')}` },
		}),
	addRealtor: async (data: any) =>
		api.post('realtors', data, {
			headers: { Authorization: `Bearer ${getValue('token')}` },
		}),
	editRealtor: async (id: number, data: any) =>
		api.patch(`realtors/${id}`, data, {
			headers: { Authorization: `Bearer ${getValue('token')}` },
		}),
	deleteRealtor: async (id: number) =>
		api.delete(`realtors/${id}`, {
			headers: { Authorization: `Bearer ${getValue('token')}` },
		}),
};

export default RealtorsServices;
