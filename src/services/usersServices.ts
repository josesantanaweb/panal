import api from '../config/api';
import { getValue } from '../utils/localStorage';

const UsersServices = {
	getUsers: () => api.get('users/?limit=5&offset=1', {
		headers: {
			Authorization:  `Bearer ${getValue('token')}`
		}
	})
		.then(res => res.data)
		.catch(err => err.reponse.data.message),
};

export default UsersServices;
