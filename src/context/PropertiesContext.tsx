import { useState, createContext } from 'react';
import PropertiesServices from 'services/propertiesService';

interface props {
	children: JSX.Element | JSX.Element[];
}

const PropertiesContext = createContext({});

export const PropertiesProvider = ({ children }: props) => {
	const [properties, setProperties] = useState<any>([]);
	const [property, setProperty] = useState<any>({});
	const [loading, setLoading] = useState<boolean>(true);

	const getProperties = async (query: string) => {
		PropertiesServices.getProperties(query)
			.then((response) => {
				setProperties(response.data.data);
				setLoading(false);
			})
			.catch((err) => setLoading(false));
	};

	return (
		// eslint-disable-next-line react/react-in-jsx-scope
		<PropertiesContext.Provider
			value={{
				properties,
				setProperties,
				getProperties,
				loading,
				property,
				setProperty
			}}>
			{children}
		</PropertiesContext.Provider>
	);
};

export default PropertiesContext;
