import React, {useState, useEffect} from 'react';
import { BiArrowBack, BiPlus } from "react-icons/bi";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Button from "components/Button";
import Checkbox from "components/Checkbox";
import Select from "components/Select";
import Input from "components/Input";
import Upload from "./components/Upload";

import {AddPropertyProps, IValues, IOwnerLessor} from "./types";
import {ISelect} from "interfaces";
import styles from "./styles.module.scss";
import CustomersServices from 'services/customersServices';
import PropertiesServices from 'services/propertiesServices';

const operationTypeOptions = [
	{
		label: 'Venta',
		value: 1,
	},
	{
		label: 'Arriendo',
		value: 2,
	},
];

const propertyTypeOptions = [
	{
		label: 'Casa',
		value: 1
	},
	{
		label: 'Departamento',
		value: 2
	}
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

const AddProperty:React.FC<AddPropertyProps> = () => {
	const navigate = useNavigate();
	const [customer, setCustomer] = useState<any>();
	const [realtorSaler, setRealtorSaler] = useState<any>();
	const [realtorBuyer, setRealtorBuyer] = useState<any>();
	const [realtorCatcher, setRealtorCatcher] = useState<any>();
	const [customersOptions, setCustomersOptions] = useState<ISelect[]>([]);

	const [documentType, setDocumentType] = useState(documentTypeOptions[0]);
	const [propertyType, setPropertyType] = useState(propertyTypeOptions[0]);
	const [currencyType, setCurrencyType] = useState(currencyTypeOptions[0]);
	const [operationType, setOperationType] = useState(operationTypeOptions[0]);
	const [country, setCountry] = useState(countryOptions[0]);
	const [region, setRegion] = useState(countryOptions[0]);
	const [city, setCity] = useState(countryOptions[0]);
	const [state, setState] = useState(countryOptions[0]);
	const [commune, setCommune] = useState(countryOptions[0]);
	const [typeOfFloor, setTypeOfFloor] = useState(countryOptions[0]);
	const [typeOfApartment, setTypeOfApartment] = useState(countryOptions[0]);
	const [finalReception, setFinalReception] = useState(countryOptions[0]);
	const [orientation, setOrientation] = useState(countryOptions[0]);
	const [washingMachine, setWashingMachine] = useState(countryOptions[0]);
	const [typeOfGas, setTypeOfGas] = useState(countryOptions[0]);
	const [typeOfHotWater, setTypeOfHotWater] = useState(countryOptions[0]);
	const [typeOfHeating, setTypeOfHeating] = useState(countryOptions[0]);
	const [typeOfKitchen, setTypeOfKitchen] = useState(countryOptions[0]);
	const [typeOfConstruction, setTypeOfConstruction] = useState(countryOptions[0]);
	const [typesOfWindows, setTypesOfWindows] = useState(countryOptions[0]);

	const [openSelectDocumentType, setOpenSelectDocumentType] = useState<boolean>(false);
	const [openSelectCustomer, setOpenSelectCustomer] = useState<boolean>(false);
	const [openSelectRealtorSaler, setOpenSelectRealtorSaler] = useState<boolean>(false);
	const [openSelectRealtorBuyer, setOpenSelectRealtorBuyer] = useState<boolean>(false);
	const [openSelectRealtorCatcher, setOpenSelectRealtorCatcher] = useState<boolean>(false);
	const [openSelectOperationType, setOpenSelectOperationType] = useState<boolean>(false);
	const [openSelectCurrencyType, setOpenSelectCurrencyType] = useState<boolean>(false);
	const [openSelectPropertyType, setOpenSelectPropertyType] = useState<boolean>(false);
	const [openSelectCountry, setOpenSelectCountry] = useState<boolean>(false);
	const [openSelectState, setOpenSelectState] = useState<boolean>(false);
	const [openSelectRegion, setOpenSelectRegion] = useState<boolean>(false);
	const [openSelectCity, setOpenSelectCity] = useState<boolean>(false);
	const [openSelectCommune, setOpenSelectCommune] = useState<boolean>(false);
	const [openSelectTypeOfFloor, setOpenSelectTypeOfFloor] = useState<boolean>(false);
	const [openSelectTypeOfApartment, setOpenSelectTypeOfApartment] = useState<boolean>(false);
	const [openSelectFinalReception, setOpenSelectFinalReception] = useState<boolean>(false);
	const [openSelectOrientation, setOpenSelectOrientation] = useState<boolean>(false);
	const [openSelectWashingMachine, setOpenSelectWashingMachine] = useState<boolean>(false);
	const [openSelectTypeOfGas, setOpenSelectTypeOfGas] = useState<boolean>(false);
	const [openSelectTypeOfHotWater, setOpenSelectTypeOfHotWater] = useState<boolean>(false);
	const [openSelectTypeOfHeating, setOpenSelectTypeOfHeating] = useState<boolean>(false);
	const [openSelectTypeOfKitchen, setOpenSelectTypeOfKitchen] = useState<boolean>(false);
	const [openSelectTypeOfConstruction, setOpenSelectTypeOfConstruction] = useState<boolean>(false);
	const [openSelectTypesOfWindows, setOpenSelectTypesOfWindows] = useState<boolean>(false);
	const [upload, setUpload] = useState<boolean>(false);
	const queryClient = useQueryClient();
	const { data: customersData, isLoading, isError } = useQuery(["customers", 100], CustomersServices.getCustomers);
	const { mutate } = useMutation(PropertiesServices.addProperties, {
		onSuccess: (data) => {
			toast.success("Propiedad Agregada", {
				position: "top-right",
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
			toast.error("Hubo un error", {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
			});
		}
	});


	useEffect(() => {
		if (customersData !== undefined) {
			customersOptionsData();
		}
	}, [customersData]);

  	// Create array of options for dcustomers
	const customersOptionsData = () => {
		const customersOptionsData = customersData?.data?.map((item: any) => ({label: item.name, value: item.id}));
		setCustomersOptions(customersOptionsData);
		if(customersOptionsData !== undefined) {
			setRealtorSaler(customersOptionsData[0]);
			setRealtorBuyer(customersOptionsData[0]);
			setRealtorCatcher(customersOptionsData[0]);
			setCustomer(customersOptionsData[0]);
		}
	};

  	// Validataions
	const validationSchema = {
		addProperty : Yup.object({
			price: Yup.number().min(100, "El Precio debe ser minimo 100").required("Requerido"),
			commission: Yup.number().min(10, "La Comision debe ser minimo 10").required("Requerido"),
			ownerLessor: Yup.object().shape({
				name: Yup.string().required("Requerido"),
				lastName: Yup.string().required("Requerido"),
				rut: Yup.string().required("Requerido"),
				email: Yup.string().email("Correo Invalido").required("Requerido"),
			}),
			address: Yup.object().shape({
				address: Yup.string().required("Requerido"),
				detailedAddress: Yup.object().shape({
					commune: Yup.string().required("Requerido"),
					number: Yup.number().required("Requerido"),
					sector: Yup.string().required("Requerido"),
				})
			}),
			observations: Yup.object().shape({
				publicTitle: Yup.string().required("Requerido"),
				description: Yup.string().required("Requerido"),
			}),
		})
	};


	// Initial values
	const INITIAL_VALUES = {
		operationId: 1,
		currencyTypeId: 1,
		price: 0,
		realtorSalerId: 1,
		realtorBuyerId: 1,
		realtorCatcherId: 1,
		commission: 0,
		ownerLessor: {
			name: 'Jose',
			lastName: 'Santana',
			rut: '342',
			email: 'jose@gmail.com',
			fono: '123123',
			privateObservations: 'Ninguna',
			propertyTypeId: 1,
			customerId: 1,
			rolNumber: 1,
		},
		address: {
			countryId: 1,
			stateId: 1,
			address: 'Sanford Cam',
			detailedAddress: {
				commune: "6229 Sanford Camp",
				number: 3,
				sector: "3316 Funk Manor",
				cityId: 1,
			},
		},
		distribution: {
			numberOfSuites: 1,
			rooms: 1,
			serviceRooms: 1,
			totalRooms: 1,
			bathrooms: 1,
			totalBathrooms: 1,
			livingRoom: 1,
			studio: false,
			warehouse: false,
			receipts: false,
			serviceBathrooms: false,
		},
		characteristics: {
			constructedSurface: 'District',
			terraceSurface: 'Chief',
			typeOfFloor: 1,
			typeOfApartment: 1,
			finalReception: 1,
			orientation: 1,
			numberOfFloors: 1,
			numberOfElevators: 1,
			washingMachine: 1,
			typeOfGas: 1,
			typeOfHotWater: 1,
			typeOfHeating: 1,
			typeOfKitchen: 1,
			typeOfConstruction: 1,
			typesOfWindows: 1,
			furnished: false,
			regularized: false,
			petsAllowed: false,
			outdoorParkingNumber: 1,
			subwayParkingNumber: 1,
			gym: false,
			multipurposeRooms: false,
			childrensGames: false,
			barbecue: false,
			studyRoom: false,
			pool: true,
			laundryRoom: false,
			parkingVisit: false,
			haveAPoster: false,
			keysInTheOffice: false,
		},
		observations: {
			publicTitle: 'Dunas Park',
			description: 'Water Park',
		}
	};

	const onSubmit = (values: IValues, {resetForm}: any) => {
		const {
			operationId,
			currencyTypeId,
			price,
			commission,
			ownerLessor,
			address,
			distribution,
			characteristics,
			observations,
		} = values;

		const data = {
			operationId,
			currencyTypeId,
			price: Number(price),
			realtorSalerId: Number(realtorSaler.value),
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
			},
			address: {
				countryId: city.value,
				stateId: country.value,
				address: address.address,
				detailedAddress: {
					commune: address.detailedAddress.commune,
					number:  Number(address.detailedAddress.number),
					cityId: Number(city.value),
					sector: address.detailedAddress.sector,
				}
			},
			distribution: {
				numberOfSuites:  Number(distribution.numberOfSuites),
				rooms:  Number(distribution.rooms),
				serviceRooms:  Number(distribution.serviceRooms),
				totalRooms:  Number(distribution.totalRooms),
				bathrooms:  Number(distribution.bathrooms),
				totalBathrooms:  Number(distribution.totalBathrooms),
				livingRoom:  Number(distribution.livingRoom),
				studio:  distribution.studio,
				warehouse:  distribution.warehouse,
				receipts:  distribution.receipts,
				serviceBathrooms:  distribution.serviceBathrooms,
			},
			characteristics: {
				constructedSurface: characteristics.constructedSurface,
				terraceSurface: characteristics.terraceSurface,
				typeOfFloor: Number(characteristics.typeOfFloor),
				typeOfApartment: Number(characteristics.typeOfApartment),
				finalReception: Number(characteristics.finalReception),
				orientation: Number(characteristics.orientation),
				numberOfFloors: Number(characteristics.numberOfFloors),
				numberOfElevators: Number(characteristics.numberOfElevators),
				washingMachine: Number(characteristics.washingMachine),
				typeOfGas: Number(characteristics.typeOfGas),
				typeOfHotWater: Number(characteristics.typeOfHotWater),
				typeOfHeating: Number(characteristics.typeOfHeating),
				typeOfKitchen: Number(characteristics.typeOfKitchen),
				typeOfConstruction: Number(characteristics.typeOfConstruction),
				typesOfWindows: Number(characteristics.typesOfWindows),
				furnished: characteristics.furnished,
				regularized: characteristics.regularized,
				petsAllowed: characteristics.petsAllowed,
				outdoorParkingNumber: Number(characteristics.outdoorParkingNumber),
				subwayParkingNumber: Number(characteristics.subwayParkingNumber),
				gym: characteristics.gym,
				multipurposeRooms: characteristics.multipurposeRooms,
				childrensGames: characteristics.childrensGames,
				barbecue: characteristics.barbecue,
				studyRoom: characteristics.studyRoom,
				pool: characteristics.pool,
				laundryRoom: characteristics.laundryRoom,
				parkingVisit: characteristics.parkingVisit,
				haveAPoster: characteristics.haveAPoster,
				keysInTheOffice: characteristics.keysInTheOffice,
			},
			observations: {
				publicTitle: observations.publicTitle,
				description: observations.description,
			}
		};

		console.log(data);

		mutate(data);

		resetForm({ values: ''});
	};

	// Handle Open limit select
	const handleOpenDocumentType = () => setOpenSelectDocumentType(true);

	const renderError = (message: any) => <span className={styles["input-error"]}>{message}</span>;

	return (
		<div className={styles["add-property"]}>
			<div className={styles["add-property-top"]}>
				<div className={styles["add-property-title"]}>
					<h3>Agregar Propiedades</h3>
				</div>
			</div>
			{
				!upload ?
					<>
        	<Formik
        		initialValues={INITIAL_VALUES}
        		validationSchema={validationSchema.addProperty}
        		onSubmit={onSubmit}
        	>
        		{({ errors, touched, isValid, dirty}) => (
        			<Form className={styles["form-wrapper"]}>
        				<div className={styles["section-title"]}>
        					<h4>Operación</h4>
        				</div>
        				<div className={styles["form-row-3"]}>
        					<Select
        						options={operationTypeOptions}
        						label="Operacion"
        						selectedOption={operationType}
        						setSelectedOption={setOperationType}
        						open={openSelectOperationType}
        						setOpen={setOpenSelectOperationType}
        						handleOpenSelect={() => setOpenSelectOperationType(true)}
        					/>
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
        				<div className={styles["add-requirements"]}>
        					<Button type='button'>
        						<BiPlus size={18} />
                    Agregar requisitos de arriendo
        					</Button>
        				</div>
        				<div className={styles["section-title"]}>
        					<h4>Asignación de Ejecutivo</h4>
        				</div>
        				<div className={styles["form-row-3"]}>
        					<Select
        						options={customersOptions}
        						label="Corredor Vendedor"
        						selectedOption={realtorSaler}
        						setSelectedOption={setRealtorSaler}
        						open={openSelectRealtorSaler}
        						setOpen={setOpenSelectRealtorSaler}
        						handleOpenSelect={() => setOpenSelectRealtorSaler(true)}
        					/>
        					<Select
        						options={customersOptions}
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
        						error={errors.commission && touched.commission ? errors.commission : null}
        					/>
        				</div>
        				<div className={styles["form-row-3"]}>
        					<Select
        						options={customersOptions}
        						label="Corredor Captador"
        						selectedOption={realtorCatcher}
        						setSelectedOption={setRealtorCatcher}
        						open={openSelectRealtorCatcher}
        						setOpen={setOpenSelectRealtorCatcher}
        						handleOpenSelect={() => setOpenSelectRealtorCatcher(true)}
        					/>
        				</div>
        				<div className={styles["section-title"]}>
        					<h4>Propiedad</h4>
        				</div>
        				<div className={styles["form-row-3"]}>
        					<div>
        						<Field
        							type="text"
        							name="ownerLessor.name"
        							placeholder="Nombre"
        							required
        							label="Nombre"
        							component={Input}
        						/>
        						<ErrorMessage name="ownerLessor.name" render={renderError} />
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
        						<ErrorMessage name="ownerLessor.lastName" render={renderError} />
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
        				<div className={styles["form-row-3"]}>
        					<div>
        						<Field
        							type="email"
        							name="ownerLessor.email"
        							placeholder="Correo Electronico"
        							required
        							label="Correo Electronico"
        							component={Input}
        						/>
        						<ErrorMessage name="ownerLessor.email" render={renderError} />
        					</div>
        					<Field
        						type="text"
        						name="ownerLessor.fono"
        						placeholder="Fono"
        						label="Fono"
        						component={Input}
        					/>
        				</div>
        				<div className={styles["form-row-3"]}>
        					<Field
        						type="number"
        						name="ownerLessor.rolNumber"
        						placeholder="Numero de rol"
        						label="Numero de rol"
        						component={Input}
        					/>
        					<Select
        						options={propertyTypeOptions}
        						label="Tipo de Propiedad"
        						selectedOption={propertyType}
        						setSelectedOption={setPropertyType}
        						open={openSelectPropertyType}
        						setOpen={setOpenSelectPropertyType}
        						handleOpenSelect={() => setOpenSelectPropertyType(true)}
        					/>
        					<Select
        						options={propertyTypeOptions}
        						label="Cliente"
        						selectedOption={customer}
        						setSelectedOption={setCustomer}
        						open={openSelectCustomer}
        						setOpen={setOpenSelectCustomer}
        						handleOpenSelect={() => setOpenSelectCustomer(true)}
        					/>
        				</div>
        				<div className={styles["form-single"]}>
        					<Field
        						name="ownerLessor.privateObservations"
        						placeholder="Observación privadas"
        						label="Observación privadas"
        						textarea
        						component={Input}
        					/>
        				</div>
        				<div className={styles["section-title"]}>
        					<h4>Ubicación</h4>
        				</div>
        				<div className={styles["form-row-3"]}>
        					<Select
        						options={countryOptions}
        						label="Pais"
        						selectedOption={country}
        						setSelectedOption={setCountry}
        						open={openSelectCountry}
        						setOpen={setOpenSelectCountry}
        						handleOpenSelect={() => setOpenSelectCountry(true)}
        					/>
        				</div>
        				<div className={styles["form-row-3"]}>
        					<Select
        						options={countryOptions}
        						label="Estado"
        						selectedOption={state}
        						setSelectedOption={setState}
        						open={openSelectState}
        						setOpen={setOpenSelectState}
        						handleOpenSelect={() => setOpenSelectState(true)}
        					/>
        					<Select
        						options={countryOptions}
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
        						<ErrorMessage name="address.detailedAddress.commune" render={renderError} />
        					</div>
        				</div>
        				<div className={styles["form-row-3"]}>
        					<div>
        						<Field
        							type="number"
        							name="address.detailedAddress.number"
        							placeholder="N. dpto / N. casa / N. ofic"
        							label="N. dpto / N. casa / N. ofic"
        							required
        							component={Input}
        						/>
        						<ErrorMessage name="address.detailedAddress.number" render={renderError} />
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
        						<ErrorMessage name="address.detailedAddress.sector" render={renderError} />
        					</div>
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
        				</div>
        				<div className={styles["section-title"]}>
        					<h4>Características</h4>
        				</div>
        				<div className={styles["section-title"]}>
        					<h5>Distribucion</h5>
        				</div>
        				<div className={styles["form-row-4"]}>
        					<Field
        						type="text"
        						name="distribution.numberOfSuites"
        						placeholder="Superficie Contruida"
        						label="Superficie Contruida"
        						component={Input}
        					/>
        					<Field
        						type="text"
        						name="distribution.rooms"
        						placeholder="Habitaciones"
        						label="Habitaciones"
        						component={Input}
        					/>
        					<Field
        						type="text"
        						name="distribution.serviceRooms"
        						placeholder="Habitaciones de Servicio"
        						label="Habitaciones de Servicio"
        						component={Input}
        					/>
        					<Field
        						type="text"
        						name="distribution.totalRooms"
        						disabled
        						placeholder="2"
        						label="Total de Habitaciones"
        						component={Input}
        					/>
        				</div>
        				<div className={styles["form-row-4"]}>
        					<Field
        						type="text"
        						name="distribution.bathrooms"
        						placeholder="Baños"
        						label="Baños"
        						component={Input}
        					/>
        					<Field
        						type="text"
        						name="distribution.totalBathrooms"
        						placeholder="Total de Baños"
        						disabled
        						label="Total de Baños"
        						component={Input}
        					/>
        					<Field
        						type="text"
        						name="distribution.livingRoom"
        						placeholder="Salas de estar"
        						label="Salas de estar"
        						component={Input}
        					/>
        				</div>
        				<div className={styles["form-row-4"]}>
        					<Field
        						name="distribution.studio"
        						type="checkbox"
        						label="Estudio"
        						component={Checkbox}
        					/>
        					<Field
        						name="distribution.warehouse"
        						type="checkbox"
        						label="Bodega"
        						component={Checkbox}
        					/>
        					<Field
        						name="distribution.receipts"
        						type="checkbox"
        						label="Recibos"
        						component={Checkbox}
        					/>
        					<Field
        						name="distribution.serviceBathrooms"
        						type="checkbox"
        						label="Baños de servicio"
        						component={Checkbox}
        					/>
        				</div>
        				<div className={styles["section-title"]}>
        					<h5>Características</h5>
        				</div>
        				<div className={styles["form-row-4"]}>
        					<Field
        						type="text"
        						name="characteristics.constructedSurface"
        						placeholder="Superficie Contruida"
        						label="Superficie Contruida"
        						component={Input}
        					/>
        					<Field
        						type="text"
        						name="characteristics.terraceSurface"
        						placeholder="Superficie Terraza"
        						label="Superficie Contruida"
        						component={Input}
        					/>
        					<Select
        						options={operationTypeOptions}
        						label="Tipo de piso"
        						selectedOption={typeOfFloor}
        						setSelectedOption={setTypeOfFloor}
        						open={openSelectTypeOfFloor}
        						setOpen={setOpenSelectTypeOfFloor}
        						handleOpenSelect={() => setOpenSelectTypeOfFloor(true)}
        					/>
        					<Select
        						options={operationTypeOptions}
        						label="Tipo de piso"
        						selectedOption={typeOfApartment}
        						setSelectedOption={setTypeOfApartment}
        						open={openSelectTypeOfApartment}
        						setOpen={setOpenSelectTypeOfApartment}
        						handleOpenSelect={() => setOpenSelectTypeOfApartment(true)}
        					/>
        				</div>
        				<div className={styles["form-row-4"]}>
        					<Select
        						options={operationTypeOptions}
        						label="Tipo de piso"
        						selectedOption={finalReception}
        						setSelectedOption={setFinalReception}
        						open={openSelectFinalReception}
        						setOpen={setOpenSelectFinalReception}
        						handleOpenSelect={() => setOpenSelectFinalReception(true)}
        					/>
        					<Select
        						options={operationTypeOptions}
        						label="Orientacion"
        						selectedOption={orientation}
        						setSelectedOption={setOrientation}
        						open={openSelectOrientation}
        						setOpen={setOpenSelectOrientation}
        						handleOpenSelect={() => setOpenSelectOrientation(true)}
        					/>
        					<Field
        						type="text"
        						name="characteristics.numberOfFloors"
        						placeholder="Numero de Pisos"
        						label="Numero de Pisos"
        						component={Input}
        					/>
        					<Field
        						type="text"
        						name="characteristics.numberOfElevators"
        						placeholder="Numero de Ascensores"
        						label="Numero de Ascensores"
        						component={Input}
        					/>
        				</div>
        				<div className={styles["form-row-4"]}>
        					<Select
        						options={operationTypeOptions}
        						label="Logia / Conexion a Lavadora"
        						selectedOption={washingMachine}
        						setSelectedOption={setWashingMachine}
        						open={openSelectWashingMachine}
        						setOpen={setOpenSelectWashingMachine}
        						handleOpenSelect={() => setOpenSelectWashingMachine(true)}
        					/>
        					<Select
        						options={operationTypeOptions}
        						label="Tipo de Gas"
        						selectedOption={typeOfGas}
        						setSelectedOption={setTypeOfGas}
        						open={openSelectTypeOfGas}
        						setOpen={setOpenSelectTypeOfGas}
        						handleOpenSelect={() => setOpenSelectTypeOfGas(true)}
        					/>
        					<Select
        						options={operationTypeOptions}
        						label="Tipo de Agua Caliente"
        						selectedOption={typeOfHotWater}
        						setSelectedOption={setTypeOfHotWater}
        						open={openSelectTypeOfHotWater}
        						setOpen={setOpenSelectTypeOfHotWater}
        						handleOpenSelect={() => setOpenSelectTypeOfHotWater(true)}
        					/>
        					<Select
        						options={operationTypeOptions}
        						label="Tipo de Calefaccion"
        						selectedOption={typeOfHeating}
        						setSelectedOption={setTypeOfHeating}
        						open={openSelectTypeOfHeating}
        						setOpen={setOpenSelectTypeOfHeating}
        						handleOpenSelect={() => setOpenSelectTypeOfHeating(true)}
        					/>
        				</div>
        				<div className={styles["form-row-4"]}>
        					<Select
        						options={operationTypeOptions}
        						label="Tipo de Cocina"
        						selectedOption={typeOfKitchen}
        						setSelectedOption={setTypeOfKitchen}
        						open={openSelectTypeOfKitchen}
        						setOpen={setOpenSelectTypeOfKitchen}
        						handleOpenSelect={() => setOpenSelectTypeOfKitchen(true)}
        					/>
        					<Select
        						options={operationTypeOptions}
        						label="Tipo de Construccion"
        						selectedOption={typeOfConstruction}
        						setSelectedOption={setTypeOfConstruction}
        						open={openSelectTypeOfConstruction}
        						setOpen={setOpenSelectTypeOfConstruction}
        						handleOpenSelect={() => setOpenSelectTypeOfConstruction(true)}
        					/>
        					<Select
        						options={operationTypeOptions}
        						label="Tipo de Ventana"
        						selectedOption={typesOfWindows}
        						setSelectedOption={setTypesOfWindows}
        						open={openSelectTypesOfWindows}
        						setOpen={setOpenSelectTypesOfWindows}
        						handleOpenSelect={() => setOpenSelectTypesOfWindows(true)}
        					/>
        				</div>
        				<div className={styles["form-row-4"]}>
        					<Field
        						name="characteristics.furnished"
        						type="checkbox"
        						label="Amoblado"
        						component={Checkbox}
        					/>
        					<Field
        						name="characteristics.regularized"
        						type="checkbox"
        						label="Regularizada"
        						component={Checkbox}
        					/>
        					<Field
        						name="characteristics.petsAllowed"
        						type="checkbox"
        						label="Permiten Mascotas"
        						component={Checkbox}
        					/>
        				</div>
        				<div className={styles["section-title"]}>
        					<h4>Exteriores</h4>
        				</div>
        				<div className={styles["form-row-4"]}>
        					<Field
        						type="text"
        						name="characteristics.outdoorParkingNumber"
        						placeholder="N. de Estacionamientos Exterior"
        						label="N. de Estacionamientos Exterior"
        						component={Input}
        					/>
        					<Field
        						type="text"
        						name="characteristics.subwayParkingNumber"
        						placeholder="N. de Estacionamientos Subterraneo"
        						label="N. de Estacionamientos Subterraneo"
        						component={Input}
        					/>
        				</div>
        				<div className={styles["section-title"]}>
        					<h4>Areas comunes</h4>
        				</div>
        				<div className={styles["form-row-4"]}>
        					<Field
        						name="characteristics.gym"
        						type="checkbox"
        						label="Gimnasio"
        						component={Checkbox}
        					/>
        					<Field
        						name="characteristics.multipurposeRooms"
        						type="checkbox"
        						label="Salas multiples"
        						component={Checkbox}
        					/>
        					<Field
        						name="characteristics.childrensGames"
        						type="checkbox"
        						label="Juegos infantiles"
        						component={Checkbox}
        					/>
        					<Field
        						name="characteristics.barbecue"
        						type="checkbox"
        						label="Quincho"
        						component={Checkbox}
        					/>
        				</div>
        				<div className={styles["form-row-4"]}>
        					<Field
        						name="characteristics.studyRoom"
        						type="checkbox"
        						label="Sala de estudio"
        						component={Checkbox}
        					/>
        					<Field
        						name="characteristics.pool"
        						type="checkbox"
        						label="Piscina"
        						component={Checkbox}
        					/>
        					<Field
        						name="characteristics.laundryRoom"
        						type="checkbox"
        						label="Sala de lavanderia"
        						component={Checkbox}
        					/>
        					<Field
        						name="characteristics.parkingVisit"
        						type="checkbox"
        						label="Estacionamiento de visita"
        						component={Checkbox}
        					/>
        				</div>
        				<div className={styles["section-title"]}>
        					<h4>Otros</h4>
        				</div>
        				<div className={styles["form-row-4"]}>
        					<Field
        						name="characteristics.haveAPoster"
        						type="checkbox"
        						label="Tiene letreros"
        						component={Checkbox}
        					/>
        					<Field
        						name="characteristics.keysInTheOffice"
        						type="checkbox"
        						label="Llaves en la oficina"
        						component={Checkbox}
        					/>
        				</div>
        				<div className={styles["section-title"]}>
        					<h4>Observaciones</h4>
        				</div>
        				<div className={styles["form-row-6"]}>
        					<div>
        						<Field
        							type="text"
        							name="observations.publicTitle"
        							placeholder="Titulo publico"
        							required
        							label="Titulo publico"
        							component={Input}
        						/>
        						<ErrorMessage name="observations.publicTitle" render={renderError} />
        					</div>
        				</div>
        				<div className={styles["form-row-6"]}>
        					<div>
        						<Field
        							name="observations.description"
        							placeholder="Descripcion"
        							required
        							textarea
        							label="Descripcion"
        							component={Input}
        						/>
        						<ErrorMessage name="observations.description" render={renderError} />
        					</div>
        				</div>
        				<div className={styles["form-footer"]}>
        					<Button type='submit' disabled={!isValid || !dirty}>Siguiente</Button>
        				</div>
        			</Form>
        		)}
        	</Formik>
        	<ToastContainer />
					</>
					:
					<Upload/>
			}
		</div>
	);
};

export default AddProperty;
