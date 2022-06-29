import { useState, createContext } from 'react';
import PropertiesServices from 'services/propertiesService';

interface props {
	children: JSX.Element | JSX.Element[];
}

const PropertiesContext = createContext({});

export const PropertiesProvider = ({ children }: props) => {
	const [properties, setProperties] = useState<any>([]);
	const [drafts, setDrafts] = useState<any>([]);
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

	const getDrafts = async (query: string) => {
		PropertiesServices.getDraftProperties()
			.then((response) => {
				setDrafts(response.data.data);
			})
			.catch();
	};

	return (
		// eslint-disable-next-line react/react-in-jsx-scope
		<PropertiesContext.Provider
			value={{
				properties,
				setProperties,
				getProperties,
				drafts,
				setDrafts,
				getDrafts,
				loading,
				property,
				setProperty
			}}>
			{children}
		</PropertiesContext.Provider>
	);
};

export default PropertiesContext;
