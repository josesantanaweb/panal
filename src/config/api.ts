import axios from 'axios';
import { removeItem, getValue } from 'utils';

const api = axios.create({
	baseURL: `${process.env.REACT_APP_API_URL}`,
	headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${getValue('token')}`,
	},
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response && error.response.status === 401) {
			removeItem('token');
			removeItem('user');
			window.location.reload();
		}
		return Promise.reject(error);
	}
);

export default api;
