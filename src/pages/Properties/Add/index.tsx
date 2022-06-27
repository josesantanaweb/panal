import React, { useState, useEffect, useRef } from 'react';
import { Button, Input, Modal, Select, Checkbox, Textarea } from 'components';
import { Map, LngLatLike, Marker } from 'mapbox-gl';
import { Field, Form, Formik } from 'formik';
import { ToastContainer } from 'react-toastify';
import { validationSchema } from './validations';
import { toastError, toastSuccess } from 'utils/libs/toast';
import { initialValues } from './initialValues';
import useFormProperty from 'hooks/useFormProperty';
import useShared from 'hooks/useShared';
import House from './Characteristics/House';
import Upload from './Upload';
import PropertiesServices from 'services/propertiesService';

const AddProperty = () => {
	const [upload, setUpload] = useState<boolean>(false);
	const [propertyId, setPropertyId] = useState<number>();

	// Mapa
	const mapDiv = useRef<HTMLDivElement>(null);
	const [mapa, setMapa] = useState<Map>();
	const [centerMap, setCenterMap] = useState<LngLatLike>([-74.5, 40]);

	const {
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

		bedroomFloorsSelected,

		bathroomFloorSelected,

		kitchenFloorSelected,

		livingRoomFloorSelected,

		entranceHallFloorSelected,

		styleOfHouseSelected,

		typeOfHouseSelected,

		finalReceptionSelected,

		orientationSelected,

		typesOfKitchenFurnitureSelected,

		typeOfGasSelected,

		thermoPanelSelected,

		typeOfHotWaterSelected,

		typeOfHeatingSelected,

		typeOfKitchenSelected,

		typeOfConstructionSelected,

		typeOfWindowsSelected
	}: any = useFormProperty();

	const {
		realtors,
		realtorBuyerSelected,
		setRealtorBuyerSelected,
		realtorSalerSelected,
		setRealtorSalerSelected,
		realtorCatcherSelected,
		setRealtorCatcherSelected,
		getRealtors,
		countrySelected,
		setCountrySelected,
		countries,
		stateSelected,
		setStateSelected,
		states,
		getCountries,
		getStates
	}: any = useShared();

	// Mapa
	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			({ coords }) => {
				if (stateSelected) {
					setCenterMap([stateSelected?.longitude, stateSelected?.latitude]);
				}
			},
			() => {
				toastError('No se puede acceder a la ubicacion');
			}
		);
	}, [stateSelected]);

	useEffect(() => {
		mapa?.flyTo({
			center: centerMap
		});
		if (mapa) {
			new Marker({ color: '#04cde7' }).setLngLat(centerMap).addTo(mapa);
		}
	}, [centerMap]);

	useEffect(() => {
		if (mapDiv.current) {
			setMapa(
				new Map({
					container: mapDiv.current,
					style: 'mapbox://styles/mapbox/streets-v11',
					center: centerMap,
					zoom: 9
				})
			);
		}
	}, [mapDiv]);

	useEffect(() => {
		getCountries();
	}, []);

	useEffect(() => {
		getStates();
	}, []);

	useEffect(() => {
		getRealtors();
	}, []);

	useEffect(() => {
		getPropertyType();
	}, []);

	useEffect(() => {
		getCurrency();
	}, []);

	useEffect(() => {
		getOperationType();
	}, []);

	const onSubmit = async (values: any, { resetForm }: any) => {
		const formData = {
			...values,
			operationId: operationTypeSelected.value,
			currencyTypeId: currencySelected.value,
			realtorSellerId: Number(realtorSalerSelected.value),
			realtorBuyerId: Number(realtorBuyerSelected.value),
			realtorCatcherId: Number(realtorCatcherSelected.value),
			ownerLessor: {
				...values.ownerLessor,
				propertyTypeId: propertyTypeSelected.value,
				customerId: 1
			},
			address: {
				countryId: countrySelected.value,
				stateId: stateSelected.value,
				...values.address
			},
			characteristics: {
				...values.characteristics,
				bedroomFloors: bedroomFloorsSelected.value,
				bathroomFloor: bathroomFloorSelected.value,
				kitchenFloor: kitchenFloorSelected.value,
				livingRoomFloor: livingRoomFloorSelected.value,
				entranceHallFloor: entranceHallFloorSelected.value,
				styleOfHouse: styleOfHouseSelected.value,
				typeOfHouse: typeOfHouseSelected.value,
				finalReception: finalReceptionSelected.value,
				orientation: orientationSelected.value,
				typesOfKitchenFurniture: typesOfKitchenFurnitureSelected.value,
				typeOfGas: typeOfGasSelected.value,
				thermoPanel: thermoPanelSelected.value,
				typeOfHotWater: typeOfHotWaterSelected.value,
				typeOfHeating: typeOfHeatingSelected.value,
				typeOfKitchen: typeOfKitchenSelected.value,
				typeOfConstruction: typeOfConstructionSelected.value,
				typeOfWindows: typeOfWindowsSelected.value
			},
			observations: {
				...values.observations
			}
		};
		console.log(formData);

		try {
			const response = await PropertiesServices.addProperty(formData);
			toastSuccess('Propiedad Guardada');
			setPropertyId(response.data.id);
			setUpload(true);
			resetForm();
		} catch (error) {
			toastError('Error al Crear Propiedad');
		}
	};

	return (
		<div className="content">
			<div className="content-body">
				<div className="add-property">
					<div className="add-property-header mb-5">
						<h3>Agregar Propiedades</h3>
					</div>
					{!upload ? (
						<Formik
							initialValues={initialValues}
							validationSchema={validationSchema.addProperty}
							onSubmit={onSubmit}>
							{({ errors, touched, isValid, dirty, values }) => (
								<Form className="add-property-form">
									<div className="row mb-4">
										<div className="col-md-3">
											<Select
												label="Tipo de Operacion"
												options={operationType}
												setSelected={setOperationTypeSelected}
												selected={operationTypeSelected}
											/>
										</div>
									</div>
									<div className="row mb-3">
										<div className="col-md-3">
											<Select
												label="Tipo de Modeda"
												options={currency}
												setSelected={setCurrencySelected}
												selected={currencySelected}
											/>
										</div>
										<div className="col-md-3">
											<Field
												type="number"
												name="price"
												label="Precio"
												placeholder="Ingrese Precio"
												component={Input}
												error={
													errors.price && touched.price ? errors.price : null
												}
											/>
										</div>
										<div className="col-md-3" style={{ marginTop: '20px' }}>
											<Button block>Agregar requisitos de arriendo</Button>
										</div>
									</div>
									<div className="row mb-4">
										<div className="col-md-12">
											<h4>Asignación de Ejecutivo</h4>
										</div>
									</div>
									<div className="row mb-4">
										<div className="col-md-3">
											<Select
												label="Corredor Vendedor"
												options={realtors}
												setSelected={setRealtorSalerSelected}
												selected={realtorSalerSelected}
											/>
										</div>
										<div className="col-md-3">
											<Select
												label="Corredor Comprador"
												options={realtors}
												setSelected={setRealtorBuyerSelected}
												selected={realtorBuyerSelected}
											/>
										</div>
										<div className="col-md-3">
											<Field
												type="text"
												name="commission"
												label="Comision"
												placeholder="Ingrese Comision"
												component={Input}
												error={
													errors.commission && touched.commission
														? errors.commission
														: null
												}
											/>
										</div>
										<div className="col-md-3">
											<Select
												label="Corredor Captador"
												options={realtors}
												setSelected={setRealtorCatcherSelected}
												selected={realtorCatcherSelected}
											/>
										</div>
									</div>
									<div className="row mb-4">
										<div className="col-md-12">
											<h4>Información de Propietario</h4>
										</div>
									</div>
									<div className="row mb-4">
										<div className="col-md-3">
											<Field
												type="text"
												name="ownerLessor.name"
												label="Nombre"
												placeholder="Ingrese Nombre"
												component={Input}
												error={
													errors.ownerLessor?.name && touched.ownerLessor?.name
														? errors.ownerLessor?.name
														: null
												}
											/>
										</div>
										<div className="col-md-3">
											<Field
												type="text"
												name="ownerLessor.lastName"
												label="Apellido"
												placeholder="Ingrese Apellido"
												component={Input}
												error={
													errors.ownerLessor?.lastName &&
													touched.ownerLessor?.lastName
														? errors.ownerLessor?.lastName
														: null
												}
											/>
										</div>
										<div className="col-md-3">
											<Field
												type="text"
												name="ownerLessor.rut"
												label="Rut"
												placeholder="Ingrese Rut"
												component={Input}
												error={
													errors.ownerLessor?.rut && touched.ownerLessor?.rut
														? errors.ownerLessor?.rut
														: null
												}
											/>
										</div>
										<div className="col-md-3">
											<Field
												type="email"
												name="ownerLessor.email"
												label="Email"
												placeholder="Ingrese Email"
												component={Input}
												error={
													errors.ownerLessor?.email &&
													touched.ownerLessor?.email
														? errors.ownerLessor?.email
														: null
												}
											/>
										</div>
									</div>
									<div className="row mb-4">
										<div className="col-md-3">
											<Field
												type="text"
												name="ownerLessor.fono"
												label="Fono"
												placeholder="Ingrese Fono"
												component={Input}
											/>
										</div>
										<div className="col-md-3">
											<Field
												type="number"
												name="ownerLessor.rolNumber"
												label="Numero de rol"
												placeholder="Ingrese Numero de rol"
												component={Input}
											/>
										</div>
										<div className="col-md-3">
											<Select
												label="Tipo de Propiedad"
												options={propertyType}
												setSelected={setPropertyTypeSelected}
												selected={propertyTypeSelected}
											/>
										</div>
									</div>
									<div className="row mb-4">
										<div className="col-md-3">
											<Field
												name="ownerLessor.newProperty"
												type="checkbox"
												label="Propiedad nueva"
												component={Checkbox}
											/>
										</div>
										<div className="col-md-3">
											<Field
												name="ownerLessor.usedProperty"
												type="checkbox"
												label="Propiedad usada"
												component={Checkbox}
											/>
										</div>
									</div>
									<div className="row mb-4">
										<div className="col-md-6">
											<Field
												type="text"
												name="ownerLessor.privateObservations"
												label="Observación privada"
												placeholder="Observación privada"
												component={Textarea}
											/>
										</div>
									</div>
									<div className="row mb-4">
										<div className="col md-12">
											<h4>Ubicación</h4>
										</div>
									</div>
									<div className="row mb-4">
										<div className="col-md-3">
											<Select
												label="Pais"
												options={countries}
												setSelected={setCountrySelected}
												selected={countrySelected}
											/>
										</div>
										<div className="col-md-3">
											<Select
												label="Region"
												options={states}
												setSelected={setStateSelected}
												selected={stateSelected}
											/>
										</div>
										<div className="col-md-3">
											<Field
												type="text"
												name="address.detailedAddress.cityId"
												label="Ciudad"
												placeholder="Ingrese Ciudad"
												component={Input}
											/>
										</div>
										<div className="col-md-3">
											<Field
												type="text"
												name="address.detailedAddress.commune"
												label="Comuna"
												placeholder="Ingrese Comuna"
												component={Input}
											/>
										</div>
									</div>
									<div className="row mb-4">
										<div className="col-md-3">
											<Field
												type="text"
												name="address.detailedAddress.sector"
												label="Sector"
												placeholder="Ingrese Sector"
												component={Input}
											/>
										</div>
										<div className="col-md-3">
											<Field
												type="text"
												name="address.address"
												label="Direccion"
												placeholder="Ingrese Direccion"
												component={Input}
											/>
										</div>
										<div className="col-md-3">
											<Field
												type="text"
												name="address.detailedAddress.number"
												label="N. dpto / N. casa / N. ofic"
												placeholder="Ingrese N. dpto / N. casa / N. ofic"
												component={Input}
											/>
										</div>
									</div>
									<div className="row mb-4">
										<div className="col-md-3">
											<Field
												type="text"
												name="address.latitude"
												label="Latitud"
												disabled={true}
												value={
													(values.address.latitude = stateSelected?.latitude)
												}
												component={Input}
											/>
										</div>
										<div className="col-md-3">
											<Field
												type="text"
												name="address.longitude"
												disabled={true}
												label="Longitud"
												value={
													(values.address.longitude = stateSelected?.longitude)
												}
												component={Input}
											/>
										</div>
									</div>

									<div className="row mb-4">
										<div className="col-md-12">
											<div className="mapa">
												<div
													ref={mapDiv}
													style={{
														height: '400px',
														width: '100%'
													}}
												/>
											</div>
										</div>
									</div>

									<div className="row mb-4">
										<div className="col-md-12">
											<h4>Caracteristicas Basica</h4>
										</div>
									</div>

									<House errors={errors} touched={touched} values={values} />

									<div className="row mb-4">
										<div className="col-md-12">
											<h4>Observaciones</h4>
										</div>
									</div>

									<div className="row mb-4">
										<div className="col-md-6">
											<Field
												type="text"
												name="observations.publicTitle"
												label="Titulo"
												placeholder="Ingrese Titulo"
												component={Input}
												error={
													errors.observations?.publicTitle &&
													touched.observations?.publicTitle
														? errors.observations?.publicTitle
														: null
												}
											/>
										</div>
									</div>
									<div className="row mb-4">
										<div className="col-md-6">
											<Field
												type="text"
												name="observations.description"
												label="Descripcion"
												placeholder="Ingrese Descripcion"
												component={Textarea}
												error={
													errors.observations?.description &&
													touched.observations?.description
														? errors.observations?.description
														: null
												}
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-md-3">
											<Button block disabled={!isValid || !dirty}>
												Guardar
											</Button>
										</div>
									</div>
								</Form>
							)}
						</Formik>
					) : (
						<Upload propertyId={propertyId} />
					)}
				</div>
			</div>
			<ToastContainer />
		</div>
	);
};

export default AddProperty;
