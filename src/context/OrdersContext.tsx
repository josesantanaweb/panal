import { useState, createContext } from 'react';
import OrdersServices from 'services/ordersService';

interface props {
	children: JSX.Element | JSX.Element[];
}

const OrdersContext = createContext({});

export const OrdersProvider = ({ children }: props) => {
	const [orders, setOrders] = useState<any>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const getOrders = (query: string) => {
		OrdersServices.getOrders(query)
			.then((response) => {
				setOrders(response.data.data);
				setLoading(false);
			})
			.catch((err) => setLoading(false));
	};

	return (
		// eslint-disable-next-line react/react-in-jsx-scope
		<OrdersContext.Provider
			value={{
				orders,
				setOrders,
				getOrders,
				loading
			}}>
			{children}
		</OrdersContext.Provider>
	);
};

export default OrdersContext;
