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

	const [floors, setFloors] = useState([]);
	const [bedroomFloorsSelected, setBedroomFloorsSelected] = useState<any>();

	const [bathroomFloorSelected, setBathroomFloorSelected] = useState<any>();

	const [kitchenFloorSelected, setKitchenFloorSelected] = useState<any>();

	const [livingRoomFloorSelected, setLivingRoomFloorSelected] = useState<any>();

	const [entranceHallFloorSelected, setEntranceHallFloorSelected] =
		useState<any>();

	const [styleOfHouse, setStyleOfHouse] = useState([]);
	const [styleOfHouseSelected, setStyleOfHouseSelected] = useState<any>();

	const [typeOfHouse, setTypeOfHouse] = useState([]);
	const [typeOfHouseSelected, setTypeOfHouseSelected] = useState<any>();

	const [finalReception, setFinalReception] = useState([]);
	const [finalReceptionSelected, setFinalReceptionSelected] = useState<any>();

	const [orientation, setOrientation] = useState([]);
	const [orientationSelected, setOrientationSelected] = useState<any>();

	const [typesOfKitchenFurniture, setTypesOfKitchenFurniture] = useState([]);
	const [typesOfKitchenFurnitureSelected, setTypesOfKitchenFurnitureSelected] =
		useState<any>();

	const [typeOfGas, setTypeOfGas] = useState([]);
	const [typeOfGasSelected, setTypeOfGasSelected] = useState<any>();

	const [thermoPanel, setThermoPanel] = useState([]);
	const [thermoPanelSelected, setThermoPanelSelected] = useState<any>();

	const [typeOfHotWater, setTypeOfHotWater] = useState([]);
	const [typeOfHotWaterSelected, setTypeOfHotWaterSelected] = useState<any>();

	const [typeOfHeating, setTypeOfHeating] = useState([]);
	const [typeOfHeatingSelected, setTypeOfHeatingSelected] = useState<any>();

	const [typeOfKitchen, setTypeOfKitchen] = useState([]);
	const [typeOfKitchenSelected, setTypeOfKitchenSelected] = useState<any>();

	const [typeOfConstruction, setTypeOfConstruction] = useState([]);
	const [typeOfConstructionSelected, setTypeOfConstructionSelected] =
		useState<any>();

	const [typeOfWindows, setTypeOfWindows] = useState([]);
	const [typeOfWindowsSelected, setTypeOfWindowsSelected] = useState<any>();

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

	const getFloors = async () => {
		PropertiesServices.getSelectHouse()
			.then((response) => {
				const data = response.data?.bedroomFloors.map((item: any) => ({
					label: item.value,
					value: item.value
				}));
				setFloors(data);
				if (response !== undefined) {
					setBedroomFloorsSelected(data[0]);
					setBathroomFloorSelected(data[0]);
					setKitchenFloorSelected(data[0]);
					setLivingRoomFloorSelected(data[0]);
					setEntranceHallFloorSelected(data[0]);
				}
			})
			.catch();
	};

	const getStyleOfHouse = async () => {
		PropertiesServices.getSelectHouse()
			.then((response) => {
				const data = response.data?.styleOfHouse.map((item: any) => ({
					label: item.value,
					value: item.value
				}));
				setStyleOfHouse(data);
				if (response !== undefined) {
					setStyleOfHouseSelected(data[0]);
				}
			})
			.catch();
	};

	const getTypeOfHouse = async () => {
		PropertiesServices.getSelectHouse()
			.then((response) => {
				const data = response.data?.typeOfHouse.map((item: any) => ({
					label: item.value,
					value: item.value
				}));
				setTypeOfHouse(data);
				if (response !== undefined) {
					setTypeOfHouseSelected(data[0]);
				}
			})
			.catch();
	};

	const getFinalReception = async () => {
		PropertiesServices.getSelectHouse()
			.then((response) => {
				const data = response.data?.finalReception.map((item: any) => ({
					label: item.value,
					value: item.value
				}));
				setFinalReception(data);
				if (response !== undefined) {
					setFinalReceptionSelected(data[0]);
				}
			})
			.catch();
	};

	const getOrientation = async () => {
		PropertiesServices.getSelectHouse()
			.then((response) => {
				const data = response.data?.orientation.map((item: any) => ({
					label: item.value,
					value: item.value
				}));
				setOrientation(data);
				if (response !== undefined) {
					setOrientationSelected(data[0]);
				}
			})
			.catch();
	};

	const getTypesOfKitchenFurniture = async () => {
		PropertiesServices.getSelectHouse()
			.then((response) => {
				const data = response.data?.typesOfKitchenFurniture.map(
					(item: any) => ({
						label: item.value,
						value: item.value
					})
				);
				setTypesOfKitchenFurniture(data);
				if (response !== undefined) {
					setTypesOfKitchenFurnitureSelected(data[0]);
				}
			})
			.catch();
	};

	const getTypeOfGas = async () => {
		PropertiesServices.getSelectHouse()
			.then((response) => {
				const data = response.data?.typeOfGas.map((item: any) => ({
					label: item.value,
					value: item.value
				}));
				setTypeOfGas(data);
				if (response !== undefined) {
					setTypeOfGasSelected(data[0]);
				}
			})
			.catch();
	};

	const getThermoPanel = async () => {
		PropertiesServices.getSelectHouse()
			.then((response) => {
				const data = response.data?.thermoPanel.map((item: any) => ({
					label: item.value,
					value: item.value
				}));
				setThermoPanel(data);
				if (response !== undefined) {
					setThermoPanelSelected(data[0]);
				}
			})
			.catch();
	};

	const getTypeOfHotWater = async () => {
		PropertiesServices.getSelectHouse()
			.then((response) => {
				const data = response.data?.typeOfHotWater.map((item: any) => ({
					label: item.value,
					value: item.value
				}));
				setTypeOfHotWater(data);
				if (response !== undefined) {
					setTypeOfHotWaterSelected(data[0]);
				}
			})
			.catch();
	};

	const getTypeOfHeating = async () => {
		PropertiesServices.getSelectHouse()
			.then((response) => {
				const data = response.data?.typeOfHeating.map((item: any) => ({
					label: item.value,
					value: item.value
				}));
				setTypeOfHeating(data);
				if (response !== undefined) {
					setTypeOfHeatingSelected(data[0]);
				}
			})
			.catch();
	};

	const getTypeOfKitchen = async () => {
		PropertiesServices.getSelectDepartment()
			.then((response) => {
				const data = response.data?.typeOfKitchen.map((item: any) => ({
					label: item.value,
					value: item.value
				}));
				setTypeOfKitchen(data);
				if (response !== undefined) {
					setTypeOfKitchenSelected(data[0]);
				}
			})
			.catch();
	};

	const getTypeOfConstruction = async () => {
		PropertiesServices.getSelectDepartment()
			.then((response) => {
				const data = response.data?.typeOfConstruction.map((item: any) => ({
					label: item.value,
					value: item.value
				}));
				setTypeOfConstruction(data);
				if (response !== undefined) {
					setTypeOfConstructionSelected(data[0]);
				}
			})
			.catch();
	};

	const getTypeOfWindows = async () => {
		PropertiesServices.getSelectDepartment()
			.then((response) => {
				const data = response.data?.typeOfWindows.map((item: any) => ({
					label: item.value,
					value: item.value
				}));
				setTypeOfWindows(data);
				if (response !== undefined) {
					setTypeOfWindowsSelected(data[0]);
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

				floors,
				bedroomFloorsSelected,
				setBedroomFloorsSelected,
				getFloors,

				bathroomFloorSelected,
				setBathroomFloorSelected,

				kitchenFloorSelected,
				setKitchenFloorSelected,

				livingRoomFloorSelected,
				setLivingRoomFloorSelected,

				entranceHallFloorSelected,
				setEntranceHallFloorSelected,

				styleOfHouse,
				styleOfHouseSelected,
				setStyleOfHouseSelected,
				getStyleOfHouse,

				typeOfHouse,
				typeOfHouseSelected,
				setTypeOfHouseSelected,
				getTypeOfHouse,

				finalReception,
				finalReceptionSelected,
				setFinalReceptionSelected,
				getFinalReception,

				orientation,
				orientationSelected,
				setOrientationSelected,
				getOrientation,

				typesOfKitchenFurniture,
				typesOfKitchenFurnitureSelected,
				setTypesOfKitchenFurnitureSelected,
				getTypesOfKitchenFurniture,

				typeOfGas,
				typeOfGasSelected,
				setTypeOfGasSelected,
				getTypeOfGas,

				thermoPanel,
				thermoPanelSelected,
				setThermoPanelSelected,
				getThermoPanel,

				typeOfHotWater,
				typeOfHotWaterSelected,
				setTypeOfHotWaterSelected,
				getTypeOfHotWater,

				typeOfHeating,
				typeOfHeatingSelected,
				setTypeOfHeatingSelected,
				getTypeOfHeating,

				typeOfKitchen,
				typeOfKitchenSelected,
				setTypeOfKitchenSelected,
				getTypeOfKitchen,

				typeOfConstruction,
				typeOfConstructionSelected,
				setTypeOfConstructionSelected,
				getTypeOfConstruction,

				typeOfWindows,
				typeOfWindowsSelected,
				setTypeOfWindowsSelected,
				getTypeOfWindows
			}}>
			{children}
		</FormPropertyContext.Provider>
	);
};

export default FormPropertyContext;
