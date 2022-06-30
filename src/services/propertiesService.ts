import api from 'config/api';
import { getValue } from 'utils';

const PropertiesServices = {
	getProperties: (query?: string) =>
		api.get(`properties/all-properties-in-exchange?${query}`, {
			headers: { Authorization: `Bearer ${getValue('token')}` },
		}),
	getDraftProperties: () =>
		api.get('/properties/in-draft', {
			headers: { Authorization: `Bearer ${getValue('token')}` },
		}),
	getExchangeProperties: () =>
		api.get('/properties/my-properties-in-exchange', {
			headers: { Authorization: `Bearer ${getValue('token')}` },
		}),
	getProperty: async (id: number) =>
		api.get(`properties/${id}`, {
			headers: { Authorization: `Bearer ${getValue('token')}` },
		}),
	addProperty: async (data: any) =>
		api.post('properties', data, {
			headers: { Authorization: `Bearer ${getValue('token')}` },
		}),
	uploadImages: async (data: any, id: number) =>
		api.post(`properties/${id}/images`, data, {
			headers: { Authorization: `Bearer ${getValue('token')}` },
		}),
	editProperty: async (id: number, data: any) =>
		api.patch(`properties/${id}`, data, {
			headers: { Authorization: `Bearer ${getValue('token')}` },
		}),
	deleteProperty: async (id: number) =>
		api.delete(`properties/${id}`, {
			headers: { Authorization: `Bearer ${getValue('token')}` },
		}),
	getSelectProperty: async () =>
		api.get('properties/new-property', {
			headers: { Authorization: `Bearer ${getValue('token')}` },
		}),
	getSelectHouse: async () =>
		api.get('properties/new-property/selects?propertyTypeId=1', {
			headers: { Authorization: `Bearer ${getValue('token')}` },
		}),
	getSelectDepartment: async () =>
		api.get('properties/new-property/selects?propertyTypeId=2', {
			headers: { Authorization: `Bearer ${getValue('token')}` },
		}),
};

export default PropertiesServices;
