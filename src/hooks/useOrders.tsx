import { useContext } from 'react';
import OrdersContext from 'context/OrdersContext';

const useOrders = () => {
	return useContext(OrdersContext);
};

export default useOrders;
