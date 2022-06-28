import { useState, createContext, useMemo } from 'react';
import SharedServices from 'services/sharedService';
import CustomersServices from 'services/customersService';
import RealtorsServices from 'services/realtorsService';

interface props {
	children: JSX.Element | JSX.Element[];
}

const SharedContext = createContext({});

export const SharedProvider = ({ children }: props) => {
	const [documents, setDocuments] = useState<any>([]);
	const [documentSelected, setDocumentSelected] = useState<any>();
	const [countries, setCountries] = useState([]);
	const [countrySelected, setCountrySelected] = useState<any>();
	const [states, setStates] = useState([]);
	const [stateSelected, setStateSelected] = useState<any>();
	const [customers, setCustomers] = useState([]);
	const [customerSelected, setCustomerSelected] = useState<any>();
	const [realtors, setRealtors] = useState([]);
	const [realtorSelected, setRealtorSelected] = useState<any>();

	const [operations, setOperations] = useState<any>([]);
	const [operationSelected, setOperationSelected] = useState<any>();
	const [communes, setCommunes] = useState<any>([]);
	const [communeSelected, setCommuneSelected] = useState<any>([]);
	const [propertyTypes, setPropertyTypes] = useState<any>([]);
	const [propertyTypeSelected, setPropertyTypeSelected] = useState<any>([]);

	const getDocuments = async () => {
		SharedServices.getDocuments()
			.then((response) => {
				const data = response.data?.data.map((item: any) => ({
					label: item.name,
					value: item.id,
				}));
				setDocuments(data);
				if (response !== undefined) {
					setDocumentSelected(data[0]);
				}
			})
			.catch();
	};

	const getCountries = async () => {
		SharedServices.getCountries()
			.then((response) => {
				const data = response.data?.data.map((item: any) => ({
					label: item.name,
					value: item.id,
				}));
				setCountries(data);
				if (response !== undefined) {
					setCountrySelected(data[0]);
				}
			})
			.catch();
	};

	const getStates = async () => {
		SharedServices.getStates()
			.then((response) => {
				const data = response.data?.data.map((item: any) => ({
					label: item.name,
					value: item.id,
				}));
				setStates(data);
				if (response !== undefined) {
					setStateSelected(data[0]);
				}
			})
			.catch();
	};

	const getCustomers = async () => {
		CustomersServices.getCustomers()
			.then((response) => {
				const data = response.data?.data.map((item: any) => ({
					label: item.name,
					value: item.id,
				}));
				setCustomers(data);
				if (response !== undefined) {
					setCustomerSelected(data[0]);
				}
			})
			.catch();
	};

	const getRealtors = async () => {
		RealtorsServices.getRealtors()
			.then((response) => {
				const data = response.data?.data.map((item: any) => ({
					label: item.name,
					value: item.id,
				}));
				setRealtors(data);
				if (response !== undefined) {
					setRealtorSelected(data[0]);
				}
			})
			.catch();
	};

	const getOperations = async () => {
		SharedServices.getOperations()
			.then((response) => {
				const data = response.data?.data.map((item: any) => ({
					label: item.name,
					value: item.id,
				}));
				setOperations(data);
				if (response !== undefined) {
					setOperationSelected(data[0]);
				}
			})
			.catch();
	};

	const getCommunes = async () => {
		SharedServices.getCommunes()
			.then((response) => {
				const data = response.data?.data.map((item: any) => ({
					label: item.name,
					value: item.id,
				}));
				setCommunes(data);
				if (response !== undefined) {
					setCommuneSelected(data[0]);
				}
			})
			.catch();
	};

	const getPropertyTypes = async () => {
		SharedServices.getPropertyTypes()
			.then((response) => {
				const data = response.data?.data.map((item: any) => ({
					label: item.name,
					value: item.id,
				}));
				setPropertyTypes(data);
				console.log(data);
				if (response !== undefined) {
					setPropertyTypeSelected(data[0]);
				}
			})
			.catch();
	};

	const value = useMemo(
		() => ({
			documents,
			documentSelected,
			setDocumentSelected,
			getDocuments,
			countries,
			countrySelected,
			setCountrySelected,
			getCountries,
			states,
			stateSelected,
			setStateSelected,
			getStates,
			customers,
			customerSelected,
			setCustomerSelected,
			getCustomers,
			realtors,
			realtorSelected,
			setRealtorSelected,
			getRealtors,
			operations,
			operationSelected,
			setOperationSelected,
			getOperations,
			communes,
			communeSelected,
			setCommuneSelected,
			getCommunes,
			propertyTypes,
			propertyTypeSelected,
			setPropertyTypeSelected,
			getPropertyTypes,
		}),
		[
			documents,
			countries,
			states,
			operations,
			stateSelected,
			documentSelected,
			countrySelected,
			customers,
			customerSelected,
			setCustomerSelected,
			realtors,
			realtorSelected,
			setRealtorSelected,
			operationSelected,
			communes,
			communeSelected,
			setCommuneSelected,
			propertyTypes,
			propertyTypeSelected,
			setPropertyTypeSelected,
		]
	);

	return (
		// eslint-disable-next-line react/react-in-jsx-scope
		<SharedContext.Provider value={value}>{children}</SharedContext.Provider>
	);
};

export default SharedContext;
