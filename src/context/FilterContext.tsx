import { useState, createContext } from 'react';
import PropertiesServices from 'services/propertiesService';
import SharedServices from 'services/sharedService';

interface props {
  children: JSX.Element | JSX.Element[]
}

const FilterContext = createContext({});

export const FilterProvider = ({children}: props) => {
	const [operationType, setOperationType] = useState<any>([]);
	const [operationTypeSelected, setOperationTypeSelected] = useState<any>();

	const [propertyType, setPropertyType] = useState<any>([]);
	const [propertyTypeSelected, setPropertyTypeSelected] = useState<any>();

	const [state, setState] = useState<any>([]);
	const [stateSelected, setStateSelected] = useState<any>();

	const [currency, setCurrency] = useState<any>([]);
	const [currencySelected, setCurrencySelected] = useState<any>();

	const getOperationType = async () => {
		PropertiesServices.getSelectProperty().then((response) => {
			const data = response.data?.operations?.map((item: any) => ({label: item.name, value: item.id}));
			const appendValue = [{label: 'Ninguna', value: 0}, ...data, ];
			setOperationType(appendValue);
			if (response !== undefined) {
				setOperationTypeSelected(appendValue[0]);
			}
		}).catch();
	};

	const getPropertyType = async () => {
		PropertiesServices.getSelectProperty().then((response) => {
			const data = response.data?.propertyTypes?.map((item: any) => ({label: item.name, value: item.id}));
			const appendValue = [{label: 'Ninguna', value: 0}, ...data, ];
			setPropertyType(appendValue);
			if (response !== undefined) {
				setPropertyTypeSelected(appendValue[0]);
			}
		}).catch();
	};

	const getCurrency = async () => {
		PropertiesServices.getSelectProperty().then((response) => {
			const data = response.data?.currencyTypes?.map((item: any) => ({label: item.name, value: item.id}));
			const appendValue = [{label: 'Ninguna', value: 0}, ...data, ];
			setCurrency(appendValue);
			if (response !== undefined) {
				setCurrencySelected(appendValue[0]);
			}
		}).catch();
	};

	const getStates = async () => {
		SharedServices.getStates().then((response) => {
			const data = response.data?.data.map((item: any) => ({label: item.name, value: item.id}));
			const appendValue = [{label: 'Ninguna', value: 0}, ...data, ];
			setState(appendValue);
			if (response !== undefined) {
				setStateSelected(appendValue[0]);
			}
		}).catch();
	};

	return (
		// eslint-disable-next-line react/react-in-jsx-scope
		<FilterContext.Provider value={{
			operationType,
			operationTypeSelected,
			setOperationTypeSelected,
			getOperationType,

			propertyType,
			propertyTypeSelected,
			setPropertyTypeSelected,
			getPropertyType,

			state,
			stateSelected,
			setStateSelected,
			getStates,

			currency,
			currencySelected,
			setCurrencySelected,
			getCurrency
		}}>
			{children}
		</FilterContext.Provider>
	);
};


export default FilterContext;
