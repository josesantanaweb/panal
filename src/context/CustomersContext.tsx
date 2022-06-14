import { useState, createContext } from 'react';
import CustomersServices from 'services/customersService';

interface props {
  children: JSX.Element | JSX.Element[]
}

const CustomersContext = createContext({});

export const CustomersProvider = ({children}: props) => {
	const [customers, setCustomers] = useState<any>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const getCustomers = async (search: string) => {
		CustomersServices.getCustomers(search).then((response) => {
			setCustomers(response.data.data);
			setLoading(false);
		}).catch((err) => setLoading(false));
	};

	return (
		// eslint-disable-next-line react/react-in-jsx-scope
		<CustomersContext.Provider value={{
			customers,
			setCustomers,
			getCustomers,
			loading
		}}>
			{children}
		</CustomersContext.Provider>
	);
};


export default CustomersContext;
