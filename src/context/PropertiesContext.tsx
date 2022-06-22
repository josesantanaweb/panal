import { useState, createContext } from 'react';
import PropertiesServices from 'services/propertiesService';

interface props {
  children: JSX.Element | JSX.Element[]
}

const PropertiesContext = createContext({});

const operationType = [
	{
		label: 'Todos',
		value: '',
	},
	{
		label: 'Venta',
		value: 1,
	},
	{
		label: 'Arriendo',
		value: 2,
	},
	{
		label: 'Arriendo Temporal',
		value: 3,
	},
];

const propertyType = [
	{
		label: 'Todos',
		value: '',
	},
	{
		label: 'Casa',
		value: 1,
	},
	{
		label: 'Departamento',
		value: 2,
	},
	{
		label: 'Local',
		value: 3,
	},
];

const currencyType = [
	{
		label: 'Todos',
		value: '',
	},
	{
		label: 'Peso Chileno',
		value: 1,
	},
	{
		label: 'Bolívar Digital',
		value: 2,
	},
];

export const PropertiesProvider = ({children}: props) => {
	const [properties, setProperties] = useState<any>([]);
	const [property, setProperty] = useState<any>({});
	const [loading, setLoading] = useState<boolean>(true);
	const [operationId, setOperationId] = useState<any>(operationType[0]);
	const [propertyId, setPropertyId] = useState<any>(propertyType[0]);
	const [currencyId, setCurrencyId] = useState<any>(currencyType[0]);

	const getProperties = async (query: string) => {
		PropertiesServices.getProperties(query).then((response) => {
			setProperties(response.data.data);
			setLoading(false);
		}).catch((err) => setLoading(false));
	};

	return (
		// eslint-disable-next-line react/react-in-jsx-scope
		<PropertiesContext.Provider value={{
			properties,
			setProperties,
			getProperties,
			loading,
			property,
			setProperty,
			operationType,
			operationId,
			currencyId,
			setCurrencyId,
			currencyType,
			setOperationId,
			propertyType,
			propertyId,
			setPropertyId,
		}}>
			{children}
		</PropertiesContext.Provider>
	);
};


export default PropertiesContext;
