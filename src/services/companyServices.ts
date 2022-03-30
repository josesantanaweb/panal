import api from '../config/api';
import { getValue } from '../utils/localStorage';

const CompanyServices = {
	getCompanies: async ({ queryKey }: any) => {
		const response = await api.get(`companies`, {
			headers: {Authorization:  `Bearer ${getValue('token')}`}
		});
		return response.data;
	},
	getCompany: async ({ queryKey }: any) => {
		const response = await api.get(`companies/${queryKey[1]}`, {
			headers: {Authorization:  `Bearer ${getValue('token')}`}
		});
		return response.data;
	},
	addCompany: async (data: any) => {
		const response = await api.post('/companies', data, {
			headers: {Authorization:  `Bearer ${getValue('token')}`}
		});
		return response.data;
	},
	editCompany: async ({ realtorId, ...data }: any) => {
		const response = await api.patch(`/companies/${realtorId}`, data, {
			headers: {Authorization:  `Bearer ${getValue('token')}`}
		});
		return response.data;
	},
	deleteCompany: async (id: number) => {
		const response = await api.delete(`/companies/${id}`, {
			headers: {Authorization:  `Bearer ${getValue('token')}`}
		});
		return response.data;
	},
};

export default CompanyServices;
