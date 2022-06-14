import { useContext } from 'react';
import CustomersContext from 'context/CustomersContext';

const useCustomers = () => {
	return useContext(CustomersContext);
};

export default useCustomers;
