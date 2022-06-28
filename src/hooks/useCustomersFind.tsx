import { useContext } from 'react';
import CustomersFindContext from 'context/CustomersFindContext';

const useCustomersFind = () => {
	return useContext(CustomersFindContext);
};

export default useCustomersFind;
