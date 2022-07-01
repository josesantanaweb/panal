import React, { useEffect } from 'react';
import { Button, Input, Modal, Select, Checkbox, Textarea } from 'components';
import { Field } from 'formik';
import useFormProperty from 'hooks/useFormProperty';

const Department = ({ touched, values }: any) => {
	const {
		getFloors,

		getStyleOfHouse,

		getTypeOfHouse,

		getFinalReception,

		getOrientation,

		getTypesOfKitchenFurniture,

		getTypeOfGas,

		getThermoPanel,

		getTypeOfHotWater,

		getTypeOfHeating,

		getTypeOfKitchen,

		getTypeOfConstruction,

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
					/>
				</div>
				<div className="col-md-3">
					<Field
						type="number"
						name="characteristics.bedrooms"
						label="Numero de habitaciones"
						placeholder="Ingrese Numero de habitaciones"
						component={Input}
					/>
				</div>
				<div className="col-md-3">
					<Field
						type="number"
						name="characteristics.serviceBedroom"
						label="Dormitorios de Serivicio"
						placeholder="Ingrese Dormitorios de Serivicio"
						component={Input}
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
						name="characteristics.usableSurface"
						placeholder="Superficie Util"
						label="Superficie Util"
						component={Input}
					/>
				</div>
				<div className="col-md-3">
					<Field
						type="text"
						name="characteristics.terraceArea"
						placeholder="Superficie de Terraza"
						label="Superficie de Terraza"
						component={Input}
					/>
				</div>
				<div className="col-md-3">
					<Field
						type="number"
						name="characteristics.totalArea"
						label="Total de superficie"
						disabled={true}
						component={Input}
						value={
							(values.characteristics.totalArea =
								values.characteristics?.usableSurface +
								values.characteristics?.terraceArea)
						}
					/>
				</div>
			</div>

			<div className="row mb-4">
				<div className="col-md-3">
					<Field
						type="number"
						name="characteristics.numberOfCoveredParkingSpaces"
						placeholder="N de estacionamientos cubiertos"
						label="N de estacionamientos cubiertos"
						component={Input}
					/>
				</div>
				<div className="col-md-3">
					<Field
						type="number"
						name="characteristics.numberOfUncoveredParkingSpaces"
						placeholder="N de estacionamientos descubiertos"
						label="N de estacionamientos descubiertos"
						component={Input}
					/>
				</div>
			</div>

			<div className="row mb-4">
				<div className="col-md-3">
					<Field
						name="characteristics.study"
						type="checkbox"
						label="Estudio"
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
						name="characteristics.receipts"
						type="checkbox"
						label="Recibos"
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
					<Field
						type="number"
						name="characteristics.yearOfConstruction"
						placeholder="Año de Contruccion"
						label="Año de Contruccion"
						component={Input}
					/>
				</div>
				<div className="col-md-3">
					<Field
						type="text"
						name="characteristics.typeOfFloor"
						placeholder="Tipo de Piso"
						label="Tipo de Piso"
						component={Input}
					/>
				</div>
				<div className="col-md-3">
					<Field
						type="text"
						name="characteristics.typeOfApartment"
						placeholder="Tipo de apartamento"
						label="Tipo de apartamento"
						component={Input}
					/>
				</div>
				<div className="col-md-3">
					<Field
						type="text"
						name="characteristics.finalReception"
						placeholder="Recepcion Final"
						label="Recepcion Final"
						component={Input}
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-md-3">
					<Field
						type="text"
						name="characteristics.numberOfFloors"
						placeholder="N de Pisos"
						label="N de Pisos"
						component={Input}
					/>
				</div>
				<div className="col-md-3">
					<Field
						type="text"
						name="characteristics.numberOfElevators"
						placeholder="N de Ascensores"
						label="N de Ascensores"
						component={Input}
					/>
				</div>
				<div className="col-md-3">
					<Field
						type="text"
						name="characteristics.washingMachineConnection"
						placeholder="Logia / Conexion a lavadora"
						label="Logia / Conexion a lavadora"
						component={Input}
					/>
				</div>
				<div className="col-md-3">
					<Field
						type="text"
						name="characteristics.typeOfGas"
						placeholder="Tipo de gas"
						label="Tipo de gas"
						component={Input}
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-md-3">
					<Field
						type="text"
						name="characteristics.typeOfHotWater"
						placeholder="Tipo de agua calienta"
						label="Tipo de agua calienta"
						component={Input}
					/>
				</div>
				<div className="col-md-3">
					<Field
						type="text"
						name="characteristics.typeOfHeating"
						placeholder="Tipo de calefaccion"
						label="Tipo de calefaccion"
						component={Input}
					/>
				</div>
				<div className="col-md-3">
					<Field
						type="text"
						name="characteristics.typeOfKitchen"
						placeholder="Tipo de cocina"
						label="Tipo de cocina"
						component={Input}
					/>
				</div>
				<div className="col-md-3">
					<Field
						type="text"
						name="characteristics.typeOfConstruction"
						placeholder="Tipo de construccion"
						label="Tipo de construccion"
						component={Input}
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-md-3">
					<Field
						type="text"
						name="characteristics.typeOfWindows"
						placeholder="Tipo de ventanas"
						label="Tipo de ventanas"
						component={Input}
					/>
				</div>
				<div className="col-md-3">
					<Field
						type="text"
						name="characteristics.floor"
						placeholder="Piso"
						label="Piso"
						component={Input}
					/>
				</div>
				<div className="col-md-3">
					<Field
						type="text"
						name="characteristics.livingRoomNumber"
						placeholder="N de salas de estar"
						label="N de salas de estar"
						component={Input}
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
						name="characteristics.regularized"
						type="checkbox"
						label="Regularizada"
						component={Checkbox}
					/>
				</div>
				<div className="col-md-3">
					<Field
						name="characteristics.petsAllowed"
						type="checkbox"
						label="Permiten mascotas"
						component={Checkbox}
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-md-12">
					<h4>Areas comunes</h4>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-md-3">
					<Field
						name="characteristics.barbecue"
						type="checkbox"
						label="Quincho"
						component={Checkbox}
					/>
				</div>
				<div className="col-md-3">
					<Field
						name="characteristics.gym"
						type="checkbox"
						label="Gimnasio"
						component={Checkbox}
					/>
				</div>
				<div className="col-md-3">
					<Field
						name="characteristics.multipurposeRooms"
						type="checkbox"
						label="Salas multiples"
						component={Checkbox}
					/>
				</div>
				<div className="col-md-3">
					<Field
						name="characteristics.children'sGames"
						type="checkbox"
						label="Juegos infantiles"
						component={Checkbox}
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-md-3">
					<Field
						name="characteristics.studyRoom"
						type="checkbox"
						label="Sala de estudio"
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
						name="characteristics.laundryRoom"
						type="checkbox"
						label="Sala lavanderia"
						component={Checkbox}
					/>
				</div>
				<div className="col-md-3">
					<Field
						name="characteristics.parkingVisit"
						type="checkbox"
						label="Estacionamiento visita"
						component={Checkbox}
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
						label="Tiene letrero"
						component={Checkbox}
					/>
				</div>
				<div className="col-md-3">
					<Field
						name="characteristics.keysInTheOffice"
						type="checkbox"
						label="Llaves en la oficina"
						component={Checkbox}
					/>
				</div>
			</div>
		</>
	);
};

export default Department;
