import React, { useEffect } from 'react';
import { Button, Input, Modal, Select, Checkbox, Textarea } from 'components';
import { Field } from 'formik';
import useFormProperty from 'hooks/useFormProperty';

const House = ({ errors, touched, values }: any) => {
	const {
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
	}: any = useFormProperty();

	useEffect(() => {
		getFloors();
	}, []);

	useEffect(() => {
		getStyleOfHouse();
	}, []);

	useEffect(() => {
		getTypeOfHouse();
	}, []);

	useEffect(() => {
		getFinalReception();
	}, []);

	useEffect(() => {
		getOrientation();
	}, []);

	useEffect(() => {
		getTypesOfKitchenFurniture();
	}, []);

	useEffect(() => {
		getTypeOfGas();
	}, []);

	useEffect(() => {
		getThermoPanel();
	}, []);

	useEffect(() => {
		getTypeOfHotWater();
	}, []);

	useEffect(() => {
		getTypeOfHeating();
	}, []);

	useEffect(() => {
		getTypeOfKitchen();
	}, []);

	useEffect(() => {
		getTypeOfConstruction();
	}, []);

	useEffect(() => {
		getTypeOfWindows();
	}, []);

	return (
		<>
			<div className="row mb-4">
				<div className="col-md-3">
					<Field
						type="number"
						name="characteristics.numberOfSuites"
						label="Numero de suites"
						placeholder="Ingrese Numero de suites"
						component={Input}
						error={
							errors.characteristics?.numberOfSuites &&
							touched.characteristics?.numberOfSuites
								? errors.characteristics?.numberOfSuites
								: null
						}
					/>
				</div>
				<div className="col-md-3">
					<Field
						type="number"
						name="characteristics.bedrooms"
						label="Numero de habitaciones"
						placeholder="Ingrese Numero de habitaciones"
						component={Input}
						error={
							errors.characteristics?.bedrooms &&
							touched.characteristics?.bedrooms
								? errors.characteristics?.bedrooms
								: null
						}
					/>
				</div>
				<div className="col-md-3">
					<Field
						type="number"
						name="characteristics.serviceBedroom"
						label="Dormitorios de Serivicio"
						placeholder="Ingrese Dormitorios de Serivicio"
						component={Input}
						error={
							errors.characteristics?.serviceBedroom &&
							touched.characteristics?.serviceBedroom
								? errors.characteristics?.serviceBedroom
								: null
						}
					/>
				</div>
				<div className="col-md-3">
					<Field
						type="number"
						name="characteristics.totalBedrooms"
						label="Total de dormitorios"
						component={Input}
						disabled={true}
						value={
							(values.characteristics.totalBedrooms =
								values.characteristics?.serviceBedroom +
								values.characteristics?.bedrooms +
								values.characteristics?.numberOfSuites)
						}
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-md-3">
					<Field
						type="number"
						name="characteristics.bathrooms"
						label="Baños"
						placeholder="Ingrese Baños"
						component={Input}
						error={
							errors.characteristics?.bathrooms &&
							touched.characteristics?.bathrooms
								? errors.characteristics?.bathrooms
								: null
						}
					/>
				</div>
				<div className="col-md-3">
					<Field
						type="number"
						name="characteristics.totalBathrooms"
						label="Total Baños"
						disabled={true}
						component={Input}
						value={
							(values.characteristics.totalBathrooms =
								values.characteristics?.bathrooms)
						}
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-md-3">
					<Field
						type="text"
						name="characteristics.landArea"
						placeholder="Superficie de Terreno"
						label="Superficie de Terreno"
						component={Input}
					/>
				</div>
				<div className="col-md-3">
					<Field
						type="text"
						name="characteristics.constructedSurface"
						placeholder="Superficie de Construida"
						label="Superficie de Construida"
						component={Input}
						error={
							errors.characteristics?.constructedSurface &&
							touched.characteristics?.constructedSurface
								? errors.characteristics?.constructedSurface
								: null
						}
					/>
				</div>
				<div className="col-md-3">
					<Field
						type="number"
						name="characteristics.numberOfCoveredParkingSpaces"
						placeholder="N de estacionamientos cubiertos"
						label="N de estacionamientos cubiertos"
						component={Input}
						error={
							errors.characteristics?.numberOfCoveredParkingSpaces &&
							touched.characteristics?.numberOfCoveredParkingSpaces
								? errors.characteristics?.numberOfCoveredParkingSpaces
								: null
						}
					/>
				</div>
				<div className="col-md-3">
					<Field
						type="number"
						name="characteristics.numberOfUncoveredParkingSpaces"
						placeholder="N de estacionamientos descubiertos"
						label="N de estacionamientos descubiertos"
						component={Input}
						error={
							errors.characteristics?.numberOfUncoveredParkingSpaces &&
							touched.characteristics?.numberOfUncoveredParkingSpaces
								? errors.characteristics?.numberOfUncoveredParkingSpaces
								: null
						}
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-md-3">
					<Field
						name="characteristics.dailyEater"
						type="checkbox"
						label="Comedor diario"
						component={Checkbox}
					/>
				</div>
				<div className="col-md-3">
					<Field
						name="characteristics.jacuzzi"
						type="checkbox"
						label="Jacuzzi"
						component={Checkbox}
					/>
				</div>
				<div className="col-md-3">
					<Field
						name="characteristics.warehouse"
						type="checkbox"
						label="Bodega"
						component={Checkbox}
					/>
				</div>
				<div className="col-md-3">
					<Field
						name="characteristics.livingRoom"
						type="checkbox"
						label="Sala de Estar"
						component={Checkbox}
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-md-3">
					<Field
						name="characteristics.sauna"
						type="checkbox"
						label="Sauna"
						component={Checkbox}
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-md-12">
					<h4>Caracteristicas</h4>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-md-3">
					<Select
						label="Pisos de Dormitorio"
						options={floors}
						setSelected={setBedroomFloorsSelected}
						selected={bedroomFloorsSelected}
					/>
				</div>

				<div className="col-md-3">
					<Select
						label="Pisos de Baños"
						options={floors}
						setSelected={setBathroomFloorSelected}
						selected={bathroomFloorSelected}
					/>
				</div>

				<div className="col-md-3">
					<Select
						label="Pisos de Baños"
						options={floors}
						setSelected={setKitchenFloorSelected}
						selected={kitchenFloorSelected}
					/>
				</div>

				<div className="col-md-3">
					<Select
						label="Pisos del Living"
						options={floors}
						setSelected={setLivingRoomFloorSelected}
						selected={livingRoomFloorSelected}
					/>
				</div>
			</div>

			<div className="row mb-4">
				<div className="col-md-3">
					<Select
						label="Pisos Hall de Entrada"
						options={floors}
						setSelected={setEntranceHallFloorSelected}
						selected={entranceHallFloorSelected}
					/>
				</div>
				<div className="col-md-3">
					<Select
						label="Estilo de Casa"
						options={styleOfHouse}
						setSelected={setStyleOfHouseSelected}
						selected={styleOfHouseSelected}
					/>
				</div>
				<div className="col-md-3">
					<Select
						label="Tipo de Casa"
						options={typeOfHouse}
						setSelected={setTypeOfHouseSelected}
						selected={typeOfHouseSelected}
					/>
				</div>
				<div className="col-md-3">
					<Select
						label="Resepcion Final"
						options={finalReception}
						setSelected={setFinalReceptionSelected}
						selected={finalReceptionSelected}
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-md-3">
					<Select
						label="Orientacion"
						options={orientation}
						setSelected={setOrientationSelected}
						selected={orientationSelected}
					/>
				</div>
				<div className="col-md-3">
					<Field
						type="date"
						name="characteristics.yearOfConstruction"
						label="Años de Construccion"
						component={Input}
					/>
				</div>
				<div className="col-md-3">
					<Field
						type="number"
						name="characteristics.numberOfFloors"
						label="Numero de Pisos"
						component={Input}
					/>
				</div>
				<div className="col-md-3">
					<Select
						label="Tipos de muebles de cocina"
						options={typesOfKitchenFurniture}
						setSelected={setTypesOfKitchenFurnitureSelected}
						selected={typesOfKitchenFurnitureSelected}
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-md-3">
					<Field
						type="text"
						name="characteristics.typeOfInsulation"
						label="Tipo de aislante"
						placeholder="Ingresa Tipo de aislante"
						component={Input}
					/>
				</div>
				<div className="col-md-3">
					<Select
						label="Tipo de gas"
						options={typeOfGas}
						setSelected={setTypeOfGasSelected}
						selected={typeOfGasSelected}
					/>
				</div>
				<div className="col-md-3">
					<Select
						label="Termo Panel"
						options={thermoPanel}
						setSelected={setThermoPanelSelected}
						selected={thermoPanelSelected}
					/>
				</div>
				<div className="col-md-3">
					<Select
						label="Tipo de Agua Caliente"
						options={typeOfHotWater}
						setSelected={setTypeOfHotWaterSelected}
						selected={typeOfHotWaterSelected}
					/>
				</div>
			</div>

			<div className="row mb-4">
				<div className="col-md-3">
					<Select
						label="Tipo de Calefaccion"
						options={typeOfHeating}
						setSelected={setTypeOfHeatingSelected}
						selected={typeOfHeatingSelected}
					/>
				</div>
				<div className="col-md-3">
					<Select
						label="Tipo de Cocina"
						options={typeOfHeating}
						setSelected={setTypeOfHeatingSelected}
						selected={typeOfHeatingSelected}
					/>
				</div>
				<div className="col-md-3">
					<Select
						label="Tipo de Cocina"
						options={typeOfKitchen}
						setSelected={setTypeOfKitchenSelected}
						selected={typeOfKitchenSelected}
					/>
				</div>
				<div className="col-md-3">
					<Select
						label="Tipo de Construccion"
						options={typeOfConstruction}
						setSelected={setTypeOfConstructionSelected}
						selected={typeOfConstructionSelected}
					/>
				</div>
			</div>

			<div className="row mb-4">
				<div className="col-md-3">
					<Field
						type="text"
						name="characteristics.roofType"
						label="Tipo de Techo"
						placeholder="Ingresa Tipo de Techo"
						component={Input}
					/>
				</div>
				<div className="col-md-3">
					<Select
						label="Tipo de Ventana"
						options={typeOfWindows}
						setSelected={setTypeOfWindowsSelected}
						selected={typeOfWindowsSelected}
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-md-3">
					<Field
						name="characteristics.furnished"
						type="checkbox"
						label="Amoblado"
						component={Checkbox}
					/>
				</div>
				<div className="col-md-3">
					<Field
						name="characteristics.petsAllowed"
						type="checkbox"
						label="Permiten Mascotas"
						component={Checkbox}
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-md-12">
					<h4>Exteriores</h4>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-md-3">
					<Field
						name="characteristics.barbecue"
						type="checkbox"
						label="Barbacoa"
						component={Checkbox}
					/>
				</div>
				<div className="col-md-3">
					<Field
						name="characteristics.tennisCourt"
						type="checkbox"
						label="Cancha de Tenis"
						component={Checkbox}
					/>
				</div>
				<div className="col-md-3">
					<Field
						name="characteristics.electricFence"
						type="checkbox"
						label="Cerco Electrico"
						component={Checkbox}
					/>
				</div>
				<div className="col-md-3">
					<Field
						name="characteristics.closedCircuitSurveillance"
						type="checkbox"
						label="Circuito Electrico Cerrado"
						component={Checkbox}
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-md-3">
					<Field
						name="characteristics.inflatableGames"
						type="checkbox"
						label="Juegos Inflables"
						component={Checkbox}
					/>
				</div>
				<div className="col-md-3">
					<Field
						name="characteristics.swimmingPool"
						type="checkbox"
						label="Piscina"
						component={Checkbox}
					/>
				</div>
				<div className="col-md-3">
					<Field
						name="characteristics.automaticPorton"
						type="checkbox"
						label="Porton Automatico"
						component={Checkbox}
					/>
				</div>
				<div className="col-md-3">
					<Field
						name="characteristics.swimmingPoolFence"
						type="checkbox"
						label="Reja de Piscina"
						component={Checkbox}
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-md-3">
					<Field
						name="characteristics.automaticWatering"
						type="checkbox"
						label="Riego Automatico"
						component={Checkbox}
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-md-12">
					<h4>Urbanizacion</h4>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-md-3">
					<Field
						name="characteristics.sewer"
						type="checkbox"
						label="Alcantarillado"
						component={Checkbox}
					/>
				</div>
				<div className="col-md-3">
					<Field
						name="characteristics.irrigationWater"
						type="checkbox"
						label="Agua de Riego"
						component={Checkbox}
					/>
				</div>
				<div className="col-md-3">
					<Field
						name="characteristics.wellWater"
						type="checkbox"
						label="Agua de Pozo"
						component={Checkbox}
					/>
				</div>
				<div className="col-md-3">
					<Field
						name="characteristics.inCondominium"
						type="checkbox"
						label="En Condominio"
						component={Checkbox}
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-md-3">
					<Field
						type="text"
						name="characteristics.typeOfWater"
						label="Tipo de agua"
						placeholder="Ingresa Tipo de agua"
						component={Input}
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-md-12">
					<h4>Otros</h4>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-md-3">
					<Field
						name="characteristics.hasASign"
						type="checkbox"
						label="Tiene Letreros"
						component={Checkbox}
					/>
				</div>
				<div className="col-md-3">
					<Field
						name="characteristics.keysInTheOffice"
						type="checkbox"
						label="Llaves Oficina"
						component={Checkbox}
					/>
				</div>
			</div>
		</>
	);
};

export default House;
