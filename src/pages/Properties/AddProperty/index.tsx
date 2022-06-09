import React, { useState, useEffect, useRef } from 'react';
import { BiArrowBack, BiPlus } from 'react-icons/bi';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Map } from 'mapbox-gl';

import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import Select from 'components/Select';
import Input from 'components/Input';
import Upload from './components/Upload';

import { AddPropertyProps, IValues, IOwnerLessor } from './types';
import { ISelect } from 'interfaces';
import styles from './styles.module.scss';
import RealtorsServices from 'services/realtorsServices';
import CustomersServices from 'services/customersServices';
import PropertiesServices from 'services/propertiesServices';
import Modal from './components/ModalRequirements/index';
const operationTypeOptions = [
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

const propertyTypeOptions = [
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

const currencyTypeOptions = [
	{
		label: 'Peso Chileno',
		value: 1,
	},
	{
		label: 'Bolívar Digital',
		value: 2,
	},
];

const documentTypeOptions = [
	{
		label: 'RUT',
		value: 'rut',
	},
	{
		label: 'Pasaporte',
		value: 'pasaporte',
	},
];

const countryOptions = [
	{
		label: 'Chile',
		value: 1,
	},
	{
		label: 'Venezuela',
		value: 2,
	},
];

const cityOptions = [
	{
		label: 'Santiago Chile',
		value: 1,
	},
	{
		label: 'Caracas',
		value: 2,
	},
];

const floorTypeOptions = [
	{
		label: 'Piso Tipo 1',
		value: 'Piso Tipo 1',
	},
];

const apartmentTypeOptions = [
	{
		label: 'Apartamento Tipo 1',
		value: 'Apartamento Tipo 1',
	},
];

const finalReceptionTypeOptions = [
	{
		label: 'Si',
		value: 'Si',
	},
];

const gasTypeOptions = [
	{
		label: 'Gas Tipo 1',
		value: 'Gas Tipo 1',
	},
];

const hotWaterTypeOptions = [
	{
		label: 'Agua Tipo 1',
		value: 'Agua Tipo 1',
	},
];

const heatingTypeOptions = [
	{
		label: 'Calefaccion Tipo 1',
		value: 'Calefaccion Tipo 1',
	},
];

const constructionTypeOptions = [
	{
		label: 'Construccion Tipo 1',
		value: 'Construccion Tipo 1',
	},
];

const kitchenTypeOptions = [
	{
		label: 'Cocina Tipo 1',
		value: 'Cocina Tipo 1',
	},
];

const washingMachineTypeOptions = [
	{
		label: 'Si',
		value: 'Si',
	},
];

const windowsTypeOptions = [
	{
		label: 'Ventana Tipo 1',
		value: 'Ventana Tipo 1',
	},
];

const AddProperty: React.FC<AddPropertyProps> = () => {
	const [openModalSelectProperty, setOpenModalSelectProperty] =
		useState<boolean>(false);
	const handleSelectProperty = () => {
		setOpenModalSelectProperty(true);
	};

	const navigate = useNavigate();
	const [customer, setCustomer] = useState<any>();
	const [realtorSaler, setRealtorSaler] = useState<any>();
	const [realtorBuyer, setRealtorBuyer] = useState<any>();
	const [realtorCatcher, setRealtorCatcher] = useState<any>();
	const [customersOptions, setCustomersOptions] = useState<ISelect[]>([]);
	const [realtorsOptions, setRealtorsOptions] = useState<ISelect[]>([]);

	const [documentType, setDocumentType] = useState(documentTypeOptions[0]);
	const [propertyType, setPropertyType] = useState(propertyTypeOptions[0]);
	const [currencyType, setCurrencyType] = useState(currencyTypeOptions[0]);
	const [operationType, setOperationType] = useState(operationTypeOptions[0]);
	const [country, setCountry] = useState(countryOptions[0]);
	const [region, setRegion] = useState(countryOptions[0]);
	const [city, setCity] = useState(cityOptions[0]);
	const [state, setState] = useState(countryOptions[0]);
	const [commune, setCommune] = useState(countryOptions[0]);
	const [typeOfFloor, setTypeOfFloor] = useState(floorTypeOptions[0]);
	const [typeOfApartment, setTypeOfApartment] = useState(
		apartmentTypeOptions[0]
	);
	const [finalReception, setFinalReception] = useState(
		finalReceptionTypeOptions[0]
	);
	const [washingMachine, setWashingMachine] = useState(
		washingMachineTypeOptions[0]
	);
	const [typeOfGas, setTypeOfGas] = useState(gasTypeOptions[0]);
	const [typeOfHotWater, setTypeOfHotWater] = useState(hotWaterTypeOptions[0]);
	const [typeOfHeating, setTypeOfHeating] = useState(heatingTypeOptions[0]);
	const [typeOfKitchen, setTypeOfKitchen] = useState(kitchenTypeOptions[0]);
	const [typeOfConstruction, setTypeOfConstruction] = useState(
		constructionTypeOptions[0]
	);
	const [typesOfWindows, setTypesOfWindows] = useState(windowsTypeOptions[0]);

	const [openSelectDocumentType, setOpenSelectDocumentType] =
		useState<boolean>(false);
	const [openSelectCustomer, setOpenSelectCustomer] = useState<boolean>(false);
	const [openSelectRealtorSaler, setOpenSelectRealtorSaler] =
		useState<boolean>(false);
	const [openSelectRealtorBuyer, setOpenSelectRealtorBuyer] =
		useState<boolean>(false);
	const [openSelectRealtorCatcher, setOpenSelectRealtorCatcher] =
		useState<boolean>(false);
	const [openSelectOperationType, setOpenSelectOperationType] =
		useState<boolean>(false);
	const [openSelectCurrencyType, setOpenSelectCurrencyType] =
		useState<boolean>(false);
	const [openSelectPropertyType, setOpenSelectPropertyType] =
		useState<boolean>(false);
	const [openSelectCountry, setOpenSelectCountry] = useState<boolean>(false);
	const [openSelectState, setOpenSelectState] = useState<boolean>(false);
	const [openSelectRegion, setOpenSelectRegion] = useState<boolean>(false);
	const [openSelectCity, setOpenSelectCity] = useState<boolean>(false);
	const [openSelectCommune, setOpenSelectCommune] = useState<boolean>(false);
	const [openSelectTypeOfFloor, setOpenSelectTypeOfFloor] =
		useState<boolean>(false);
	const [openSelectTypeOfApartment, setOpenSelectTypeOfApartment] =
		useState<boolean>(false);
	const [openSelectFinalReception, setOpenSelectFinalReception] =
		useState<boolean>(false);
	const [openSelectOrientation, setOpenSelectOrientation] =
		useState<boolean>(false);
	const [openSelectWashingMachine, setOpenSelectWashingMachine] =
		useState<boolean>(false);
	const [openSelectTypeOfGas, setOpenSelectTypeOfGas] =
		useState<boolean>(false);
	const [openSelectTypeOfHotWater, setOpenSelectTypeOfHotWater] =
		useState<boolean>(false);
	const [openSelectTypeOfHeating, setOpenSelectTypeOfHeating] =
		useState<boolean>(false);
	const [openSelectTypeOfKitchen, setOpenSelectTypeOfKitchen] =
		useState<boolean>(false);
	const [openSelectTypeOfConstruction, setOpenSelectTypeOfConstruction] =
		useState<boolean>(false);
	const [openSelectTypesOfWindows, setOpenSelectTypesOfWindows] =
		useState<boolean>(false);
	const [propertyId, setPropertyId] = useState();
	const [upload, setUpload] = useState<boolean>(false);
	const queryClient = useQueryClient();
	const { data: customersData } = useQuery(
		['customers', ''],
		CustomersServices.getCustomers
	);
	const { data: realtorsData } = useQuery(
		['realtors', ''],
		RealtorsServices.getRealtors
	);
	const { mutate } = useMutation(PropertiesServices.addProperties, {
		onSuccess: (data) => {
			setPropertyId(data.id);
			toast.success('Propiedad Agregada', {
				position: 'top-right',
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
			});
			queryClient.invalidateQueries(['properties']);
			setTimeout(() => {
				return setUpload(true);
			}, 3000);
		},
		onError: (error: any) => {
			toast.error('Hubo un error', {
				position: 'top-right',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
			});
		},
	});

	const mapDiv = useRef<HTMLDivElement>(null);
	const [mapa, setMapa] = useState<Map>();

	useEffect(() => {
		if (mapDiv.current) {
			setMapa(
				new Map({
					container: mapDiv.current, // container ID
					style: 'mapbox://styles/mapbox/streets-v11', // style URL
					center: [-74.5, 40], // starting position [lng, lat]
					zoom: 9 // starting zoom
				})
			);
		}
	}, [mapDiv]);

	useEffect(() => {
		if (customersData !== undefined) {
			customersOptionsData();
		}
	}, [customersData]);

	useEffect(() => {
		if (realtorsData !== undefined) {
			realtorsOptionsData();
		}
	}, [realtorsData]);

	// Create array of options for realtors
	const realtorsOptionsData = () => {
		const realtorsOptionsData = realtorsData?.data?.map((item: any) => ({
			label: item.name,
			value: item.id,
		}));
		setRealtorsOptions(realtorsOptionsData);
		if (realtorsOptionsData !== undefined) {
			setRealtorSaler(realtorsOptionsData[0]);
			setRealtorBuyer(realtorsOptionsData[0]);
			setRealtorCatcher(realtorsOptionsData[0]);
		}
	};

	// Create array of options for customers
	const customersOptionsData = () => {
		const customersOptionsData = customersData?.data?.map((item: any) => ({
			label: item.name,
			value: item.id,
		}));
		setCustomersOptions(customersOptionsData);
		if (customersOptionsData !== undefined) {
			setCustomer(customersOptionsData[0]);
		}
	};

	// Validataions
	const validationSchema = {
		addProperty: Yup.object({
			price: Yup.number()
				.min(100, 'El Precio debe ser minimo 100')
				.required('Requerido'),
			commission: Yup.number()
				.min(10, 'La Comision debe ser minimo 10')
				.required('Requerido'),
			ownerLessor: Yup.object().shape({
				name: Yup.string().required('Requerido'),
				lastName: Yup.string().required('Requerido'),
				rut: Yup.string().required('Requerido'),
				email: Yup.string().email('Correo Invalido').required('Requerido'),
			}),
			address: Yup.object().shape({
				address: Yup.string().required('Requerido'),
				detailedAddress: Yup.object().shape({
					commune: Yup.string().required('Requerido'),
					number: Yup.number().required('Requerido'),
					sector: Yup.string().required('Requerido'),
				}),
			}),
			observations: Yup.object().shape({
				publicTitle: Yup.string().required('Requerido'),
				description: Yup.string().required('Requerido'),
			}),
		}),
	};

	// Initial values
	const INITIAL_VALUES = {
		operationId: 1,
		currencyTypeId: 1,
		price: 0,
		realtorSellerId: 1,
		realtorBuyerId: 1,
		realtorCatcherId: 1,
		commission: 0,
		ownerLessor: {
			name: '',
			lastName: '',
			rut: '',
			email: '',
			fono: '',
			rolNumber: 1,
			propertyTypeId: 1,
			customerId: 1,
			privateObservations: '',
			newProperty: false,
			usedProperty: false,
		},
		address: {
			countryId: 1,
			stateId: 1,
			address: '',
			detailedAddress: {
				commune: '',
				number: 3,
				cityId: 1,
				sector: '',
			},
		},
		characteristics: {
			numberOfSuites: '',
			bedrooms: '',
			serviceBedroom: '',
			totalBedrooms: '',
			bathrooms: '',
			totalBathrooms: '',
			usableSurface: '',
			terraceArea: '',
			totalArea: '',
			landArea: '',
			constructedSurface: '',
			numberOfCoveredParkingSpaces: '',
			numberOfUncoveredParkingSpaces: '',
			study: false,
			jacuzzi: false,
			dailyEater: false,
			warehouse: false,
			sauna: false,
			bedroomFloors: '',
			bathroomFloor: '',
			kitchenFloor: '',
			diningRoomFloor: '',
			livingRoomFloor: '',
			entranceHallFloor: '',
			styleOfHouse: '',
			typeOfHouse: '',
			orientation: '',
			receipts: false,
			yearOfConstruction: '',
			typesOfKitchenFurniture: '',
			typeOfInsulation: '',
			typeOfFloor: '',
			typeOfApartment: '',
			thermoPanel: '',
			roofType: '',
			finalReception: '',
			numberOfFloors: '',
			numberOfElevators: '',
			washingMachineConnection: '',
			typeOfGas: '',
			typeOfHotWater: '',
			typeOfHeating: '',
			typeOfKitchen: '',
			typeOfConstruction: '',
			typeOfWindows: '',
			floor: '',
			livingRoomNumber: '',
			furnished: false,
			regularized: false,
			petsAllowed: false,
			inflatableGames: false,
			automaticPorton: false,
			swimmingPoolFence: false,
			sewer: false,
			irrigationWater: false,
			inCondominium: false,
			wellWater: false,
			automaticWatering: false,
			closedCircuitSurveillance: false,
			electricFence: false,
			tennisCourt: false,
			barbecue: false,
			gym: false,
			multipurposeRooms: false,
			studyRoom: '',
			swimmingPool: '',
			laundryRoom: false,
			parkingVisit: false,
			hasASign: false,
			keysInTheOffice: false,
			metersOfShowCase: '',
			typeofPremises: '',
			shoppingMall: '',
			localSeniority: '',
			isInterior: '',
			numberOfParkingCustomers: '',
			typeOfWater: '',
		},
		observations: {
			publicTitle: '',
			description: '',
		},
	};

	const onSubmit = (values: any, { resetForm }: any) => {
		const {
			operationId,
			currencyTypeId,
			price,
			commission,
			ownerLessor,
			address,
			characteristics,
			observations,
		} = values;

		console.log(values);

		// Departamento
		const department = {
			operationId,
			currencyTypeId,
			price: Number(price),
			realtorSellerId: Number(realtorSaler.value),
			realtorBuyerId: Number(realtorBuyer.value),
			realtorCatcherId: Number(realtorCatcher.value),
			commission: Number(commission),
			ownerLessor: {
				name: ownerLessor.name,
				lastName: ownerLessor.lastName,
				rut: ownerLessor.rut,
				email: ownerLessor.email,
				fono: ownerLessor.fono,
				rolNumber: Number(ownerLessor.rolNumber),
				propertyTypeId: propertyType.value,
				customerId: Number(customer.value),
				privateObservations: ownerLessor.privateObservations,
				newProperty: ownerLessor.newProperty,
				usedProperty: ownerLessor.usedProperty,
			},
			address: {
				countryId: city.value,
				stateId: country.value,
				address: address.address,
				detailedAddress: {
					commune: address.detailedAddress.commune,
					number: Number(address.detailedAddress.number),
					cityId: Number(city.value),
					sector: address.detailedAddress.sector,
				},
			},
			characteristics: {
				numberOfSuites: Number(characteristics.numberOfSuites),
				bedrooms: Number(characteristics.bedrooms),
				serviceBedroom: Number(characteristics.serviceBedroom),
				totalBedrooms: Number(characteristics.totalBedrooms),
				bathrooms: Number(characteristics.bathrooms),
				totalBathrooms: Number(characteristics.totalBathrooms),
				usableSurface: characteristics.usableSurface,
				terraceArea: characteristics.terraceArea,
				totalArea: characteristics.totalArea,
				numberOfCoveredParkingSpaces: Number(
					characteristics.numberOfCoveredParkingSpaces
				),
				numberOfUncoveredParkingSpaces: Number(
					characteristics.numberOfUncoveredParkingSpaces
				),
				study: characteristics.study,
				warehouse: characteristics.warehouse,
				receipts: characteristics.receipts,
				yearOfConstruction: characteristics.yearOfConstruction,
				typeOfFloor: characteristics.typeOfFloor,
				typeOfApartment: characteristics.typeOfApartment,
				finalReception: characteristics.finalReception,
				numberOfFloors: Number(characteristics.numberOfFloors),
				numberOfElevators: Number(characteristics.numberOfElevators),
				washingMachineConnection: washingMachine.value,
				typeOfGas: typeOfGas.value,
				typeOfHotWater: typeOfHotWater.value,
				typeOfHeating: typeOfHeating.value,
				typeOfKitchen: typeOfKitchen.value,
				typeOfConstruction: typeOfConstruction.value,
				typesOfWindows: typesOfWindows.value,
				floor: characteristics.floor,
				livingRoomNumber: characteristics.livingRoomNumber,
				furnished: characteristics.furnished,
				regularized: characteristics.regularized,
				petsAllowed: characteristics.petsAllowed,
				barbecue: characteristics.barbecue,
				gym: characteristics.gym,
				multipurposeRooms: characteristics.multipurposeRooms,
				studyRoom: characteristics.studyRoom,
				swimmingPool: characteristics.swimmingPool,
				laundryRoom: characteristics.laundryRoom,
				parkingVisit: characteristics.parkingVisit,
				hasASign: characteristics.hasASign,
				keysInTheOffice: characteristics.keysInTheOffice,
			},
			observations: {
				publicTitle: observations.publicTitle,
				description: observations.description,
			},
		};

		// Casa
		const house = {
			operationId,
			currencyTypeId,
			price: Number(price),
			realtorSellerId: Number(realtorSaler.value),
			realtorBuyerId: Number(realtorBuyer.value),
			realtorCatcherId: Number(realtorCatcher.value),
			commission: Number(commission),
			ownerLessor: {
				name: ownerLessor.name,
				lastName: ownerLessor.lastName,
				rut: ownerLessor.rut,
				email: ownerLessor.email,
				fono: ownerLessor.fono,
				rolNumber: Number(ownerLessor.rolNumber),
				propertyTypeId: propertyType.value,
				customerId: Number(customer.value),
				privateObservations: ownerLessor.privateObservations,
				newProperty: ownerLessor.newProperty,
				usedProperty: ownerLessor.usedProperty,
			},
			address: {
				countryId: city.value,
				stateId: country.value,
				address: address.address,
				detailedAddress: {
					commune: address.detailedAddress.commune,
					number: Number(address.detailedAddress.number),
					cityId: Number(city.value),
					sector: address.detailedAddress.sector,
				},
			},
			characteristics: {
				numberOfSuites: Number(characteristics.numberOfSuites),
				bedrooms: Number(characteristics.bedrooms),
				serviceBedroom: Number(characteristics.serviceBedroom),
				totalBedrooms: Number(characteristics.totalBedrooms),
				bathrooms: Number(characteristics.bathrooms),
				totalBathrooms: Number(characteristics.totalBathrooms),
				landArea: characteristics.landArea,
				constructedSurface: characteristics.constructedSurface,
				numberOfCoveredParkingSpaces: Number(
					characteristics.numberOfCoveredParkingSpaces
				),
				numberOfUncoveredParkingSpaces: Number(
					characteristics.numberOfUncoveredParkingSpaces
				),
				dailyEater: characteristics.dailyEater,
				jacuzzi: characteristics.jacuzzi,
				warehouse: characteristics.warehouse,
				livingRoom: characteristics.livingRoom,
				sauna: characteristics.sauna,
				bedroomFloors: characteristics.bedroomFloors,
				bathroomFloor: characteristics.bathroomFloor,
				kitchenFloor: characteristics.kitchenFloor,
				livingRoomFloor: characteristics.livingRoomFloor,
				diningRoomFloor: characteristics.diningRoomFloor,
				entranceHallFloor: characteristics.entranceHallFloor,
				styleOfHouse: characteristics.styleOfHouse,
				typeOfHouse: characteristics.typeOfHouse,
				orientation: characteristics.orientation,
				yearOfConstruction: characteristics.yearOfConstruction,
				typeOfFloor: characteristics.typeOfFloor,
				typesOfKitchenFurniture: characteristics.typesOfKitchenFurniture,
				typeOfInsulation: characteristics.typeOfInsulation,
				finalReception: characteristics.finalReception,
				numberOfFloors: Number(characteristics.numberOfFloors),
				numberOfElevators: Number(characteristics.numberOfElevators),
				washingMachineConnection: washingMachine.value,
				typeOfGas: typeOfGas.value,
				thermoPanel: characteristics.thermoPanel,
				typeOfHotWater: typeOfHotWater.value,
				typeOfHeating: typeOfHeating.value,
				typeOfKitchen: typeOfKitchen.value,
				typeOfConstruction: typeOfConstruction.value,
				typesOfWindows: typesOfWindows.value,
				roofType: characteristics.roofType,
				typeOfWindows: characteristics.typeOfWindows,
				floor: characteristics.floor,
				livingRoomNumber: characteristics.livingRoomNumber,
				furnished: characteristics.furnished,
				petsAllowed: characteristics.petsAllowed,
				inflatableGames: characteristics.inflatableGames,
				automaticPorton: characteristics.automaticPorton,
				swimmingPoolFence: characteristics.swimmingPoolFence,
				sewer: characteristics.sewer,
				irrigationWater: characteristics.irrigationWater,
				inCondominium: characteristics.inCondominium,
				wellWater: characteristics.wellWater,
				automaticWatering: characteristics.automaticWatering,
				closedCircuitSurveillance: characteristics.closedCircuitSurveillance,
				tennisCourt: characteristics.tennisCourt,
				barbecue: characteristics.barbecue,
				studyRoom: characteristics.studyRoom,
				swimmingPool: characteristics.swimmingPool,
				hasASign: characteristics.hasASign,
				keysInTheOffice: characteristics.keysInTheOffice,
			},
			observations: {
				publicTitle: observations.publicTitle,
				description: observations.description,
			},
		};

		// Local
		const local = {
			operationId,
			currencyTypeId,
			price: Number(price),
			realtorSellerId: Number(realtorSaler.value),
			realtorBuyerId: Number(realtorBuyer.value),
			realtorCatcherId: Number(realtorCatcher.value),
			commission: Number(commission),
			ownerLessor: {
				name: ownerLessor.name,
				lastName: ownerLessor.lastName,
				rut: ownerLessor.rut,
				email: ownerLessor.email,
				fono: ownerLessor.fono,
				rolNumber: Number(ownerLessor.rolNumber),
				propertyTypeId: propertyType.value,
				customerId: Number(customer.value),
				privateObservations: ownerLessor.privateObservations,
				newProperty: ownerLessor.newProperty,
				usedProperty: ownerLessor.usedProperty,
			},
			address: {
				countryId: city.value,
				stateId: country.value,
				address: address.address,
				detailedAddress: {
					commune: address.detailedAddress.commune,
					number: Number(address.detailedAddress.number),
					cityId: Number(city.value),
					sector: address.detailedAddress.sector,
				},
			},
			characteristics: {
				bathrooms: Number(characteristics.bathrooms),
				totalBathrooms: Number(characteristics.totalBathrooms),
				landArea: characteristics.landArea,
				constructedSurface: characteristics.constructedSurface,
				metersOfShowCase: characteristics.metersOfShowCase,
				typeofPremises: characteristics.typeofPremises,
				finalReception: characteristics.finalReception,
				shoppingMall: characteristics.shoppingMall,
				localSeniority: characteristics.localSeniority,
				isInterior: characteristics.isInterior,
				numberOfCoveredParkingSpaces: Number(
					characteristics.numberOfCoveredParkingSpaces
				),
				numberOfParkingCustomers: Number(
					characteristics.numberOfParkingCustomers
				),
				sewer: characteristics.sewer,
				typeOfWater: characteristics.typeOfWater,
			},
			observations: {
				publicTitle: observations.publicTitle,
				description: observations.description,
			},
		};

		console.log(house);

		// mutate(
		// 	propertyType.value === 1
		// 		? house
		// 		: propertyType.value === 2
		// 			? department
		// 			: local
		// );

		mutate(house);

		// resetForm({ values: ''});
	};

	// Handle Open limit select
	// const handleOpenDocumentType = () => setOpenSelectDocumentType(true);

	const renderError = (message: any) => (
		<span className={styles['input-error']}>{message}</span>
	);

	return (
		<div className={styles['add-property']}>
			<div className={styles['add-property-top']}>
				<div className={styles['add-property-title']}>
					<h3>Agregar Propiedades</h3>
				</div>
			</div>
			{!upload ? (
				<>
					<Formik
						initialValues={INITIAL_VALUES}
						validationSchema={validationSchema.addProperty}
						onSubmit={onSubmit}
					>
						{({ errors, touched, isValid, dirty }) => (
							<Form className={styles['form-wrapper']}>
								<div className={styles['section-title']}>
									<h4>Operación</h4>
								</div>
								<div className={styles['form-row-3']}>
									<Select
										options={operationTypeOptions}
										label="Operacion"
										selectedOption={operationType}
										setSelectedOption={setOperationType}
										open={openSelectOperationType}
										setOpen={setOpenSelectOperationType}
										handleOpenSelect={() => setOpenSelectOperationType(true)}
									/>
								</div>
								<div className={styles['form-row-3']}>
									<Select
										options={currencyTypeOptions}
										label="Tipo de moneda"
										selectedOption={currencyType}
										setSelectedOption={setCurrencyType}
										open={openSelectCurrencyType}
										setOpen={setOpenSelectCurrencyType}
										handleOpenSelect={() => setOpenSelectCurrencyType(true)}
									/>
									<Field
										type="number"
										name="price"
										placeholder="Precio"
										required
										label="Precio"
										component={Input}
										error={errors.price && touched.price ? errors.price : null}
									/>
								</div>
								<div className={styles['form-row-2']}>
									<Button onClick={handleSelectProperty} type="button">
										<BiPlus size={18} />
										Agregar requisitos de arriendo
									</Button>
								</div>
								<div className={styles['section-title']}>
									<h4>Asignación de Ejecutivo</h4>
								</div>
								<div className={styles['form-row-3']}>
									<Select
										options={realtorsOptions}
										label="Corredor Vendedor"
										selectedOption={realtorSaler}
										setSelectedOption={setRealtorSaler}
										open={openSelectRealtorSaler}
										setOpen={setOpenSelectRealtorSaler}
										handleOpenSelect={() => setOpenSelectRealtorSaler(true)}
									/>
									<Select
										options={realtorsOptions}
										label="Corredor Comprador"
										selectedOption={realtorBuyer}
										setSelectedOption={setRealtorBuyer}
										open={openSelectRealtorBuyer}
										setOpen={setOpenSelectRealtorBuyer}
										handleOpenSelect={() => setOpenSelectRealtorBuyer(true)}
									/>
									<Field
										type="number"
										name="commission"
										placeholder="Comision"
										required
										label="Comision"
										component={Input}
										error={
											errors.commission && touched.commission
												? errors.commission
												: null
										}
									/>
								</div>
								<div className={styles['form-row-3']}>
									<Select
										options={realtorsOptions}
										label="Corredor Captador"
										selectedOption={realtorCatcher}
										setSelectedOption={setRealtorCatcher}
										open={openSelectRealtorCatcher}
										setOpen={setOpenSelectRealtorCatcher}
										handleOpenSelect={() => setOpenSelectRealtorCatcher(true)}
									/>
								</div>
								<div className={styles['section-title']}>
									<h4>Propiedad</h4>
								</div>
								<div className={styles['form-row-3']}>
									<div>
										<Field
											type="text"
											name="ownerLessor.name"
											placeholder="Nombre"
											required
											label="Nombre"
											component={Input}
										/>
										<ErrorMessage
											name="ownerLessor.name"
											render={renderError}
										/>
									</div>
									<div>
										<Field
											type="text"
											name="ownerLessor.lastName"
											placeholder="Apellido"
											required
											label="Apellido"
											component={Input}
										/>
										<ErrorMessage
											name="ownerLessor.lastName"
											render={renderError}
										/>
									</div>
									<div>
										<Field
											type="text"
											name="ownerLessor.rut"
											placeholder="RUT"
											required
											label="RUT"
											component={Input}
										/>
										<ErrorMessage name="ownerLessor.rut" render={renderError} />
									</div>
								</div>
								<div className={styles['form-row-3']}>
									<div>
										<Field
											type="email"
											name="ownerLessor.email"
											placeholder="Correo Electronico"
											required
											label="Correo Electronico"
											component={Input}
										/>
										<ErrorMessage
											name="ownerLessor.email"
											render={renderError}
										/>
									</div>
									<Field
										type="text"
										name="ownerLessor.fono"
										placeholder="Fono"
										label="Fono"
										component={Input}
									/>
									<Field
										type="number"
										name="ownerLessor.rolNumber"
										placeholder="Numero de rol"
										label="Numero de rol"
										component={Input}
									/>
								</div>
								<div className={styles['form-row-3']}>
									<Select
										options={propertyTypeOptions}
										label="Tipo de Propiedad"
										selectedOption={propertyType}
										setSelectedOption={setPropertyType}
										open={openSelectPropertyType}
										setOpen={setOpenSelectPropertyType}
										handleOpenSelect={() => setOpenSelectPropertyType(true)}
									/>
								</div>
								<div className={styles['form-row-3']}>
									<Field
										name="ownerLessor.newProperty"
										type="checkbox"
										label="Propiedad nueva"
										component={Checkbox}
									/>
									<Field
										name="ownerLessor.usedProperty"
										type="checkbox"
										label="Propiedad usada"
										component={Checkbox}
									/>
								</div>
								<div className={styles['form-single']}>
									<Field
										name="ownerLessor.privateObservations"
										placeholder="Observación privadas"
										label="Observación privadas"
										textarea
										component={Input}
									/>
								</div>
								<div className={styles['section-title']}>
									<h4>Ubicación</h4>
								</div>
								<div className={styles['form-row-3']}>
									<Select
										options={countryOptions}
										label="Pais"
										selectedOption={country}
										setSelectedOption={setCountry}
										open={openSelectCountry}
										setOpen={setOpenSelectCountry}
										handleOpenSelect={() => setOpenSelectCountry(true)}
									/>
									<Select
										options={countryOptions}
										label="Region"
										selectedOption={state}
										setSelectedOption={setState}
										open={openSelectState}
										setOpen={setOpenSelectState}
										handleOpenSelect={() => setOpenSelectState(true)}
									/>
								</div>
								<div className={styles['form-row-3']}>
									<Select
										options={cityOptions}
										label="Ciudad"
										selectedOption={city}
										setSelectedOption={setCity}
										open={openSelectCity}
										setOpen={setOpenSelectCity}
										handleOpenSelect={() => setOpenSelectCity(true)}
									/>
									<div>
										<Field
											type="text"
											name="address.detailedAddress.commune"
											placeholder="Comuna"
											label="Comuna"
											required
											component={Input}
										/>
										<ErrorMessage
											name="address.detailedAddress.commune"
											render={renderError}
										/>
									</div>
									<div>
										<Field
											type="text"
											name="address.detailedAddress.sector"
											placeholder="Sector"
											label="Sector"
											required
											component={Input}
										/>
										<ErrorMessage
											name="address.detailedAddress.sector"
											render={renderError}
										/>
									</div>
								</div>

								<div className={styles['mapa']}>
									<div ref={mapDiv}
										style={{
											height: '400px',
											width: '100%',
											background: 'red'
										}}
									/>
								</div>

								<div className={styles['form-row-3']}>
									<div>
										<Field
											type="text"
											name="address.address"
											placeholder="Direccion"
											label="Direccion"
											required
											component={Input}
										/>
										<ErrorMessage name="address.address" render={renderError} />
									</div>
									<div>
										<Field
											type="number"
											name="address.detailedAddress.number"
											placeholder="N. dpto / N. casa / N. ofic"
											label="N. dpto / N. casa / N. ofic"
											required
											component={Input}
										/>
										<ErrorMessage
											name="address.detailedAddress.number"
											render={renderError}
										/>
									</div>
								</div>
								<div className={styles['section-title']}>
									<h4>Características</h4>
								</div>
								<div className={styles['form-row-4']}>
									{(propertyType.value === 1 || propertyType.value === 2) && (
										<Field
											type="text"
											name="characteristics.numberOfSuites"
											placeholder="N de suites"
											label="N de suites"
											component={Input}
										/>
									)}
									{(propertyType.value === 1 || propertyType.value === 2) && (
										<Field
											type="number"
											name="characteristics.bedrooms"
											placeholder="Dormitorios"
											label="Dormitorios"
											component={Input}
										/>
									)}
									{(propertyType.value === 1 || propertyType.value === 2) && (
										<Field
											type="number"
											name="characteristics.serviceBedroom"
											placeholder="Dormitorios de Servicio"
											label="Dormitorios de Servicio"
											component={Input}
										/>
									)}
									{(propertyType.value === 1 || propertyType.value === 2) && (
										<Field
											type="number"
											name="characteristics.totalRooms"
											placeholder="2"
											label="Total de Dormitorios"
											component={Input}
										/>
									)}
								</div>
								<div className={styles['form-row-4']}>
									{(propertyType.value === 1 ||
										propertyType.value === 2 ||
										propertyType.value === 3) && (
										<Field
											type="number"
											name="characteristics.bathrooms"
											placeholder="Baños"
											label="Baños"
											component={Input}
										/>
									)}
									{(propertyType.value === 1 ||
										propertyType.value === 2 ||
										propertyType.value === 3) && (
										<Field
											type="number"
											name="characteristics.totalBathrooms"
											placeholder="Total de Baños"
											label="Total de Baños"
											component={Input}
										/>
									)}
									{(propertyType.value === 1 || propertyType.value === 3) && (
										<Field
											type="text"
											name="characteristics.landArea"
											placeholder="Superficie de Terreno"
											label="Superficie de Terreno"
											component={Input}
										/>
									)}
									{(propertyType.value === 1 || propertyType.value === 3) && (
										<Field
											type="text"
											name="characteristics.constructedSurface"
											placeholder="Superficie de Construida"
											label="Superficie de Construida"
											component={Input}
										/>
									)}
								</div>
								<div className={styles['form-row-4']}>
									{propertyType.value === 2 && (
										<Field
											type="text"
											name="characteristics.usableSurface"
											placeholder="Superficie util"
											label="Superficie util"
											component={Input}
										/>
									)}
									{propertyType.value === 3 && (
										<Field
											type="text"
											name="characteristics.metersOfShowCase"
											placeholder="Metros de Vitrina"
											label="Metros de Vitrina"
											component={Input}
										/>
									)}
									{propertyType.value === 3 && (
										<Field
											type="text"
											name="characteristics.typeofPremises"
											placeholder="Tipo de local"
											label="Tipo de local"
											component={Input}
										/>
									)}
									{propertyType.value === 2 && (
										<Field
											type="text"
											name="characteristics.terraceArea"
											placeholder="Superficie de terraza"
											label="Superficie de terraza"
											component={Input}
										/>
									)}
									{propertyType.value === 2 && (
										<Field
											type="text"
											name="characteristics.totalArea"
											placeholder="Total de superficies"
											label="Total de superficies"
											component={Input}
										/>
									)}
								</div>
								<div className={styles['form-row-4']}>
									{(propertyType.value === 1 ||
										propertyType.value === 2 ||
										propertyType.value === 3) && (
										<Field
											type="text"
											name="characteristics.numberOfCoveredParkingSpaces"
											placeholder="N de estacionamientos cubiertos"
											label="N de estacionamientos cubiertos"
											component={Input}
										/>
									)}
									{propertyType.value === 3 && (
										<Field
											type="text"
											name="characteristics.numberOfParkingCustomers"
											placeholder="N de estacionamientos clientes"
											label="N de estacionamientos clientes"
											component={Input}
										/>
									)}
									{propertyType.value === 2 && (
										<Field
											type="text"
											name="characteristics.numberOfUncoveredParkingSpaces"
											placeholder="N de estacionamientos descubiertos"
											label="N de estacionamientos descubiertos"
											component={Input}
										/>
									)}
								</div>
								<div className={styles['form-row-4']}>
									{propertyType.value === 2 && (
										<Field
											name="characteristics.study"
											type="checkbox"
											label="Estudio"
											component={Checkbox}
										/>
									)}
									{propertyType.value === 3 && (
										<Field
											name="characteristics.isInterior"
											type="checkbox"
											label="Es interior"
											component={Checkbox}
										/>
									)}
									{propertyType.value === 1 && (
										<Field
											name="characteristics.dailyEater"
											type="checkbox"
											label="Comedor Diario"
											component={Checkbox}
										/>
									)}
									{propertyType.value === 1 && (
										<Field
											name="characteristics.jacuzzi"
											type="checkbox"
											label="Jacuzzi"
											component={Checkbox}
										/>
									)}
									{(propertyType.value === 1 || propertyType.value === 2) && (
										<Field
											name="characteristics.warehouse"
											type="checkbox"
											label="Bodega"
											component={Checkbox}
										/>
									)}
									{propertyType.value === 1 && (
										<Field
											name="characteristics.livingRoom"
											type="checkbox"
											label="Sala de Estar"
											component={Checkbox}
										/>
									)}
									{propertyType.value === 1 && (
										<Field
											name="characteristics.sauna"
											type="checkbox"
											label="Sauna"
											component={Checkbox}
										/>
									)}
									{propertyType.value === 2 && (
										<Field
											name="characteristics.receipts"
											type="checkbox"
											label="Recibos"
											component={Checkbox}
										/>
									)}
								</div>
								<div className={styles['section-title']}>
									<h5>Características</h5>
								</div>
								<div className={styles['form-row-4']}>
									{propertyType.value === 1 && (
										<Field
											type="text"
											name="characteristics.bedroomFloors"
											placeholder="Piso de los Dormitorios"
											label="Piso de los Dormitorios"
											component={Input}
										/>
									)}
									{propertyType.value === 1 && (
										<Field
											type="text"
											name="characteristics.bathroomFloor"
											placeholder="Piso de los Baños"
											label="Piso de los Baños"
											component={Input}
										/>
									)}
									{propertyType.value === 1 && (
										<Field
											type="text"
											name="characteristics.kitchenFloor"
											placeholder="Piso de los Cocina"
											label="Piso de los Cocina"
											component={Input}
										/>
									)}
									{(propertyType.value === 1 || propertyType.value === 2) && (
										<Field
											type="text"
											name="characteristics.yearOfConstruction"
											placeholder="Año de construccion"
											label="Año de construccion"
											component={Input}
										/>
									)}
									{propertyType.value === 2 && (
										<Select
											options={floorTypeOptions}
											label="Tipo de piso"
											selectedOption={typeOfFloor}
											setSelectedOption={setTypeOfFloor}
											open={openSelectTypeOfFloor}
											setOpen={setOpenSelectTypeOfFloor}
											handleOpenSelect={() => setOpenSelectTypeOfFloor(true)}
										/>
									)}
									{propertyType.value === 2 && (
										<Select
											options={apartmentTypeOptions}
											label="Tipo de departamento"
											selectedOption={typeOfApartment}
											setSelectedOption={setTypeOfApartment}
											open={openSelectTypeOfApartment}
											setOpen={setOpenSelectTypeOfApartment}
											handleOpenSelect={() =>
												setOpenSelectTypeOfApartment(true)
											}
										/>
									)}
									{propertyType.value === 2 && (
										<Field
											type="text"
											name="characteristics.constructedSurface"
											placeholder="Superficie Contruida"
											label="Superficie Contruida"
											component={Input}
										/>
									)}
									{propertyType.value === 2 && (
										<Field
											type="text"
											name="characteristics.terraceSurface"
											placeholder="Superficie Terraza"
											label="Superficie Terraza"
											component={Input}
										/>
									)}
								</div>
								<div className={styles['form-row-4']}>
									{propertyType.value === 1 && (
										<Field
											type="text"
											name="characteristics.diningRoomFloor"
											placeholder="Piso del Comedor"
											label="Piso del Comedor"
											component={Input}
										/>
									)}
									{propertyType.value === 1 && (
										<Field
											type="text"
											name="characteristics.livingRoomFloor"
											placeholder="Superficie living"
											label="Superficie living"
											component={Input}
										/>
									)}
									{propertyType.value === 1 && (
										<Field
											type="text"
											name="characteristics.entranceHallFloor"
											placeholder="Hall de entrada"
											label="Hall de entrada"
											component={Input}
										/>
									)}
									{propertyType.value === 1 && (
										<Field
											type="text"
											name="characteristics.styleOfHouse"
											placeholder="Estilo de Casa"
											label="Estilo de Casa"
											component={Input}
										/>
									)}
									{propertyType.value === 1 && (
										<Field
											type="text"
											name="characteristics.typeOfHouse"
											placeholder="Tipo de Casa"
											label="Tipo de Casa"
											component={Input}
										/>
									)}
									{propertyType.value === 3 && (
										<Field
											type="text"
											name="characteristics.shoppingMall"
											placeholder="Centro Comercial"
											label="Centro Comercial"
											component={Input}
										/>
									)}
									{propertyType.value === 3 && (
										<Field
											type="text"
											name="characteristics.localSeniority"
											placeholder="Antigüedad local"
											label="Antigüedad local"
											component={Input}
										/>
									)}
									{(propertyType.value === 1 ||
										propertyType.value === 2 ||
										propertyType.value === 3) && (
										<Field
											type="text"
											name="characteristics.finalReception"
											placeholder="Recepcion Final"
											label="Recepcion Final"
											component={Input}
										/>
									)}
									{propertyType.value === 1 && (
										<Field
											type="text"
											name="characteristics.orientation"
											placeholder="Orientation"
											label="Orientation"
											component={Input}
										/>
									)}
									{(propertyType.value === 1 || propertyType.value === 2) && (
										<Field
											type="text"
											name="characteristics.floor"
											placeholder="Numero de Pisos"
											label="Numero de Pisos"
											component={Input}
										/>
									)}
									{propertyType.value === 2 && (
										<Field
											type="text"
											name="characteristics.numberOfElevators"
											placeholder="Numero de Ascensores"
											label="Numero de Ascensores"
											component={Input}
										/>
									)}
								</div>
								<div className={styles['form-row-4']}>
									{propertyType.value === 1 && (
										<Field
											type="text"
											name="characteristics.typesOfKitchenFurniture"
											placeholder="Tipos Muebles Cocina"
											label="Tipos Muebles Cocina"
											component={Input}
										/>
									)}
									{propertyType.value === 1 && (
										<Field
											type="text"
											name="characteristics.typeOfInsulation"
											placeholder="Tipo de aislamiento"
											label="Tipo de aislamiento"
											component={Input}
										/>
									)}
									{propertyType.value === 2 && (
										<Select
											options={washingMachineTypeOptions}
											label="Logia / Conexion a Lavadora"
											selectedOption={washingMachine}
											setSelectedOption={setWashingMachine}
											open={openSelectWashingMachine}
											setOpen={setOpenSelectWashingMachine}
											handleOpenSelect={() => setOpenSelectWashingMachine(true)}
										/>
									)}
									{(propertyType.value === 1 || propertyType.value === 2) && (
										<Select
											options={gasTypeOptions}
											label="Tipo de Gas"
											selectedOption={typeOfGas}
											setSelectedOption={setTypeOfGas}
											open={openSelectTypeOfGas}
											setOpen={setOpenSelectTypeOfGas}
											handleOpenSelect={() => setOpenSelectTypeOfGas(true)}
										/>
									)}
									{(propertyType.value === 1 || propertyType.value === 2) && (
										<Select
											options={hotWaterTypeOptions}
											label="Tipo de Agua Caliente"
											selectedOption={typeOfHotWater}
											setSelectedOption={setTypeOfHotWater}
											open={openSelectTypeOfHotWater}
											setOpen={setOpenSelectTypeOfHotWater}
											handleOpenSelect={() => setOpenSelectTypeOfHotWater(true)}
										/>
									)}
									{(propertyType.value === 1 || propertyType.value === 2) && (
										<Select
											options={heatingTypeOptions}
											label="Tipo de Calefaccion"
											selectedOption={typeOfHeating}
											setSelectedOption={setTypeOfHeating}
											open={openSelectTypeOfHeating}
											setOpen={setOpenSelectTypeOfHeating}
											handleOpenSelect={() => setOpenSelectTypeOfHeating(true)}
										/>
									)}
									{propertyType.value === 1 && (
										<Field
											type="text"
											name="characteristics.thermoPanel"
											placeholder="Termo panel"
											label="Termo panel"
											component={Input}
										/>
									)}
								</div>
								<div className={styles['form-row-4']}>
									{(propertyType.value === 1 || propertyType.value === 2) && (
										<Select
											options={kitchenTypeOptions}
											label="Tipo de Cocina"
											selectedOption={typeOfKitchen}
											setSelectedOption={setTypeOfKitchen}
											open={openSelectTypeOfKitchen}
											setOpen={setOpenSelectTypeOfKitchen}
											handleOpenSelect={() => setOpenSelectTypeOfKitchen(true)}
										/>
									)}
									{(propertyType.value === 1 || propertyType.value === 2) && (
										<Select
											options={constructionTypeOptions}
											label="Tipo de Construccion"
											selectedOption={typeOfConstruction}
											setSelectedOption={setTypeOfConstruction}
											open={openSelectTypeOfConstruction}
											setOpen={setOpenSelectTypeOfConstruction}
											handleOpenSelect={() =>
												setOpenSelectTypeOfConstruction(true)
											}
										/>
									)}
									{propertyType.value === 2 && (
										<Select
											options={windowsTypeOptions}
											label="Tipo de Ventana"
											selectedOption={typesOfWindows}
											setSelectedOption={setTypesOfWindows}
											open={openSelectTypesOfWindows}
											setOpen={setOpenSelectTypesOfWindows}
											handleOpenSelect={() => setOpenSelectTypesOfWindows(true)}
										/>
									)}
									{propertyType.value === 1 && (
										<Field
											type="text"
											name="characteristics.roofType"
											placeholder="Tipo de Techo"
											label="Tipo de Techo"
											component={Input}
										/>
									)}
									{propertyType.value === 1 && (
										<Field
											type="text"
											name="characteristics.typeOfWindows"
											placeholder="Tipo de Ventana"
											label="Tipo de Ventana"
											component={Input}
										/>
									)}
								</div>
								<div className={styles['form-row-4']}>
									{(propertyType.value === 1 || propertyType.value === 2) && (
										<Field
											name="characteristics.furnished"
											type="checkbox"
											label="Amoblado"
											component={Checkbox}
										/>
									)}
									{propertyType.value === 2 && (
										<Field
											name="characteristics.regularized"
											type="checkbox"
											label="Regularizada"
											component={Checkbox}
										/>
									)}
									{(propertyType.value === 1 || propertyType.value === 2) && (
										<Field
											name="characteristics.petsAllowed"
											type="checkbox"
											label="Permiten Mascotas"
											component={Checkbox}
										/>
									)}
									{propertyType.value === 1 && (
										<Field
											name="characteristics.tennisCourt"
											type="checkbox"
											label="Cancha de tenis"
											component={Checkbox}
										/>
									)}
								</div>
								<div className={styles['section-title']}>
									<h4>Areas comunes</h4>
								</div>
								<div className={styles['form-row-4']}>
									{propertyType.value === 1 && (
										<Field
											name="characteristics.electricFence"
											type="checkbox"
											label="Cerco electrico"
											component={Checkbox}
										/>
									)}
									{propertyType.value === 1 && (
										<Field
											name="characteristics.closedCircuitSurveillance"
											type="checkbox"
											label="Circuito cerrado de vigilancia"
											component={Checkbox}
										/>
									)}
									{propertyType.value === 1 && (
										<Field
											name="characteristics.inflatableGames"
											type="checkbox"
											label="Juegos inflables"
											component={Checkbox}
										/>
									)}
									{propertyType.value === 1 && (
										<Field
											name="characteristics.automaticPorton"
											type="checkbox"
											label="Porton automatico"
											component={Checkbox}
										/>
									)}
									{(propertyType.value === 1 || propertyType.value === 2) && (
										<Field
											name="characteristics.barbecue"
											type="checkbox"
											label="Quincho"
											component={Checkbox}
										/>
									)}
									{propertyType.value === 2 && (
										<Field
											name="characteristics.gym"
											type="checkbox"
											label="Gimnasio"
											component={Checkbox}
										/>
									)}
									{propertyType.value === 2 && (
										<Field
											name="characteristics.multipurposeRooms"
											type="checkbox"
											label="Salas multiples"
											component={Checkbox}
										/>
									)}
									{propertyType.value === 2 && (
										<Field
											name="characteristics.childrensGames"
											type="checkbox"
											label="Juegos infantiles"
											component={Checkbox}
										/>
									)}
								</div>
								<div className={styles['form-row-4']}>
									{propertyType.value === 1 && (
										<Field
											name="characteristics.swimmingPoolFence"
											type="checkbox"
											label="Reja de piscina"
											component={Checkbox}
										/>
									)}
									{(propertyType.value === 1 || propertyType.value === 3) && (
										<Field
											name="characteristics.sewer"
											type="checkbox"
											label="Alcantarillado"
											component={Checkbox}
										/>
									)}
									{propertyType.value === 3 && (
										<Field
											name="characteristics.typeOfWater"
											type="checkbox"
											label="Tipo de Agua"
											component={Checkbox}
										/>
									)}
									{propertyType.value === 1 && (
										<Field
											name="characteristics.automaticWatering"
											type="checkbox"
											label="Riego automatico"
											component={Checkbox}
										/>
									)}
									{propertyType.value === 2 && (
										<Field
											name="characteristics.studyRoom"
											type="checkbox"
											label="Sala de estudio"
											component={Checkbox}
										/>
									)}
									{(propertyType.value === 1 || propertyType.value === 2) && (
										<Field
											name="characteristics.swimmingPool"
											type="checkbox"
											label="Piscina"
											component={Checkbox}
										/>
									)}
									{propertyType.value === 2 && (
										<Field
											name="characteristics.laundryRoom"
											type="checkbox"
											label="Sala de lavanderia"
											component={Checkbox}
										/>
									)}
									{propertyType.value === 2 && (
										<Field
											name="characteristics.parkingVisit"
											type="checkbox"
											label="Estacionamiento de visita"
											component={Checkbox}
										/>
									)}
								</div>
								<div className={styles['section-title']}>
									<h4>Otros</h4>
								</div>
								<div className={styles['form-row-4']}>
									{propertyType.value === 1 && (
										<Field
											name="characteristics.irrigationWater"
											type="checkbox"
											label="Agua de riego"
											component={Checkbox}
										/>
									)}
									{propertyType.value === 1 && (
										<Field
											name="characteristics.wellWater"
											type="checkbox"
											label="Agua de pozo"
											component={Checkbox}
										/>
									)}
									{propertyType.value === 1 && (
										<Field
											name="characteristics.inCondominium"
											type="checkbox"
											label="En condominio"
											component={Checkbox}
										/>
									)}
									{(propertyType.value === 1 || propertyType.value === 2) && (
										<Field
											name="characteristics.hasASign"
											type="checkbox"
											label="Tiene letreros"
											component={Checkbox}
										/>
									)}
									{(propertyType.value === 1 || propertyType.value === 2) && (
										<Field
											name="characteristics.keysInTheOffice"
											type="checkbox"
											label="Llaves en la oficina"
											component={Checkbox}
										/>
									)}
								</div>
								<div className={styles['section-title']}>
									<h4>Observaciones</h4>
								</div>
								<div className={styles['form-row-6']}>
									<div>
										<Field
											type="text"
											name="observations.publicTitle"
											placeholder="Titulo publico"
											required
											label="Titulo publico"
											component={Input}
										/>
										<ErrorMessage
											name="observations.publicTitle"
											render={renderError}
										/>
									</div>
								</div>
								<div className={styles['form-row-6']}>
									<div>
										<Field
											name="observations.description"
											placeholder="Descripcion"
											required
											textarea
											label="Descripcion"
											component={Input}
										/>
										<ErrorMessage
											name="observations.description"
											render={renderError}
										/>
									</div>
								</div>
								<div className={styles['form-footer']}>
									<Button type="submit" disabled={!isValid || !dirty}>
										Siguiente
									</Button>
								</div>
							</Form>
						)}
					</Formik>
					<ToastContainer />
				</>
			) : (
				<Upload propertyId={propertyId} />
			)}

			<Modal
				openModal={openModalSelectProperty}
				setOpenModal={setOpenModalSelectProperty}
			/>
		</div>
	);
};

export default AddProperty;
