import api from '../config/api';
import { getValue } from '../utils/localStorage';

const DocumentsServices = {
	getDocuments: () => api.get('identity-documents', {
		headers: {
			Authorization:  `Bearer ${getValue('token')}`
		}
	})
		.then(res => res.data)
		.catch(err => err.reponse.data.message),
};

export default DocumentsServices;
