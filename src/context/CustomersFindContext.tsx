import { useState, createContext } from 'react';
import CustomersFindServices from 'services/CustomersFindService';

interface props {
	children: JSX.Element | JSX.Element[];
}

const CustomersFindContext = createContext({});

export const CustomersFindProvider = ({ children }: props) => {
	const [customersFind, setCustomersFind] = useState<any>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const getCustomersFind = async () => {
		CustomersFindServices.getCustomersFind()
			.then((response) => {
				setCustomersFind(response.data.data);
				setLoading(false);
			})
			.catch((err) => setLoading(false));
	};

	return (
		// eslint-disable-next-line react/react-in-jsx-scope
		<CustomersFindContext.Provider
			value={{
				customersFind,
				setCustomersFind,
				getCustomersFind,
				loading,
			}}>
			{children}
		</CustomersFindContext.Provider>
	);
};

export default CustomersFindContext;
