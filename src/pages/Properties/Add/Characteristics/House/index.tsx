import React, { useEffect } from 'react';
import { Button, Input, Modal, Select, Checkbox, Textarea } from 'components';
import { Field } from 'formik';
import useFormProperty from 'hooks/useFormProperty';

const House = ({ errors, touched, values }: any) => {
	const {
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
	}: any = useFormProperty();

	useEffect(() => {
		getBedroomFloors();
	}, []);

	useEffect(() => {
		getBathroomFloor();
	}, []);

	useEffect(() => {
		getKitchenFloor();
	}, []);

	useEffect(() => {
		getLivingRoomFloor();
	}, []);

	useEffect(() => {
		getEntranceHallFloor();
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
						options={bedroomFloors}
						setSelected={setBedroomFloorsSelected}
						selected={bedroomFloorsSelected}
					/>
				</div>

				<div className="col-md-3">
					<Select
						label="Pisos de Baños"
						options={bathroomFloor}
						setSelected={setBathroomFloorSelected}
						selected={bathroomFloorSelected}
					/>
				</div>

				<div className="col-md-3">
					<Select
						label="Pisos de Baños"
						options={kitchenFloor}
						setSelected={setKitchenFloorSelected}
						selected={kitchenFloorSelected}
					/>
				</div>

				<div className="col-md-3">
					<Select
						label="Pisos del Living"
						options={livingRoomFloor}
						setSelected={setLivingRoomFloorSelected}
						selected={livingRoomFloorSelected}
					/>
				</div>
			</div>

			<div className="row mb-4">
				<div className="col-md-3">
					<Select
						label="Pisos Hall de Entrada"
						options={entranceHallFloor}
						setSelected={setEntranceHallFloorSelected}
						selected={entranceHallFloorSelected}
					/>
				</div>
			</div>
		</>
	);
};

export default House;
