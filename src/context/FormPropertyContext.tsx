import { useState, createContext } from 'react';
import PropertiesServices from 'services/propertiesService';

interface props {
	children: JSX.Element | JSX.Element[];
}

const FormPropertyContext = createContext({});

export const FormPropertyProvider = ({ children }: props) => {
	const [properties, setProperties] = useState<any>([]);
	const [property, setProperty] = useState<any>({});
	const [loading, setLoading] = useState<boolean>(true);

	const [operationType, setOperationType] = useState<any>([]);
	const [operationTypeSelected, setOperationTypeSelected] = useState<any>();

	const [propertyType, setPropertyType] = useState<any>([]);
	const [propertyTypeSelected, setPropertyTypeSelected] = useState<any>();

	const [currency, setCurrency] = useState<any>([]);
	const [currencySelected, setCurrencySelected] = useState<any>();

	const [bedroomFloors, setBedroomFloors] = useState([]);
	const [bedroomFloorsSelected, setBedroomFloorsSelected] = useState<any>();

	const [bathroomFloor, setBathroomFloor] = useState([]);
	const [bathroomFloorSelected, setBathroomFloorSelected] = useState<any>();

	const [kitchenFloor, setKitchenFloor] = useState([]);
	const [kitchenFloorSelected, setKitchenFloorSelected] = useState<any>();

	const [livingRoomFloor, setLivingRoomFloor] = useState([]);
	const [livingRoomFloorSelected, setLivingRoomFloorSelected] = useState<any>();

	const [entranceHallFloor, setEntranceHallFloor] = useState([]);
	const [entranceHallFloorSelected, setEntranceHallFloorSelected] =
		useState<any>();

	const getProperties = async (query: string) => {
		PropertiesServices.getProperties(query)
			.then((response) => {
				setProperties(response.data.data);
				setLoading(false);
			})
			.catch((err) => setLoading(false));
	};

	const getOperationType = async () => {
		PropertiesServices.getSelectProperty()
			.then((response) => {
				const data = response.data?.operations?.map((item: any) => ({
					label: item.name,
					value: item.id
				}));
				setOperationType(data);
				if (response !== undefined) {
					setOperationTypeSelected(data[0]);
				}
			})
			.catch();
	};

	const getCurrency = async () => {
		PropertiesServices.getSelectProperty()
			.then((response) => {
				const data = response.data?.currencyTypes?.map((item: any) => ({
					label: item.name,
					value: item.id
				}));
				setCurrency(data);
				if (response !== undefined) {
					setCurrencySelected(data[0]);
				}
			})
			.catch();
	};

	const getPropertyType = async () => {
		PropertiesServices.getSelectProperty()
			.then((response) => {
				const data = response.data?.propertyTypes?.map((item: any) => ({
					label: item.name,
					value: item.id
				}));
				setPropertyType(data);
				if (response !== undefined) {
					setPropertyTypeSelected(data[0]);
				}
			})
			.catch();
	};

	const getBedroomFloors = async () => {
		PropertiesServices.getSelectHouse()
			.then((response) => {
				const data = response.data?.bedroomFloors.map((item: any) => ({
					label: item.value,
					value: item.value
				}));
				setBedroomFloors(data);
				if (response !== undefined) {
					setBedroomFloorsSelected(data[0]);
				}
			})
			.catch();
	};

	const getBathroomFloor = async () => {
		PropertiesServices.getSelectHouse()
			.then((response) => {
				const data = response.data?.bathroomFloor.map((item: any) => ({
					label: item.value,
					value: item.value
				}));
				setBathroomFloor(data);
				if (response !== undefined) {
					setBathroomFloorSelected(data[0]);
				}
			})
			.catch();
	};

	const getKitchenFloor = async () => {
		PropertiesServices.getSelectHouse()
			.then((response) => {
				const data = response.data?.kitchenFloor.map((item: any) => ({
					label: item.value,
					value: item.value
				}));
				setKitchenFloor(data);
				if (response !== undefined) {
					setKitchenFloorSelected(data[0]);
				}
			})
			.catch();
	};

	const getLivingRoomFloor = async () => {
		PropertiesServices.getSelectHouse()
			.then((response) => {
				const data = response.data?.livingRoomFloor.map((item: any) => ({
					label: item.value,
					value: item.value
				}));
				setLivingRoomFloor(data);
				if (response !== undefined) {
					setLivingRoomFloorSelected(data[0]);
				}
			})
			.catch();
	};

	const getEntranceHallFloor = async () => {
		PropertiesServices.getSelectHouse()
			.then((response) => {
				const data = response.data?.entranceHallFloor.map((item: any) => ({
					label: item.value,
					value: item.value
				}));
				setEntranceHallFloor(data);
				if (response !== undefined) {
					setEntranceHallFloorSelected(data[0]);
				}
			})
			.catch();
	};

	return (
		// eslint-disable-next-line react/react-in-jsx-scope
		<FormPropertyContext.Provider
			value={{
				properties,
				setProperties,
				getProperties,
				loading,
				property,
				setProperty,

				operationType,
				operationTypeSelected,
				setOperationTypeSelected,
				getOperationType,

				currency,
				currencySelected,
				setCurrencySelected,
				getCurrency,

				propertyType,
				propertyTypeSelected,
				setPropertyTypeSelected,
				getPropertyType,

				bedroomFloors,
				bedroomFloorsSelected,
				setBedroomFloorsSelected,
				getBedroomFloors,

				bathroomFloor,
				bathroomFloorSelected,
				setBathroomFloorSelected,
				getBathroomFloor,

				kitchenFloor,
				kitchenFloorSelected,
				setKitchenFloorSelected,
				getKitchenFloor,

				livingRoomFloor,
				livingRoomFloorSelected,
				setLivingRoomFloorSelected,
				getLivingRoomFloor,

				entranceHallFloor,
				entranceHallFloorSelected,
				setEntranceHallFloorSelected,
				getEntranceHallFloor
			}}>
			{children}
		</FormPropertyContext.Provider>
	);
};

export default FormPropertyContext;
