import React, { useEffect, useState } from 'react';
import useProperties from 'hooks/useProperties';
import useOrdes from 'hooks/useOrders';
import { BiFilter } from 'react-icons/bi';
import { Button, ModalCenter, Select, Search } from 'components';
import useFilter from 'hooks/useFilter';
import { toastSuccess } from 'utils/libs/toast';
import Property from '../Property';

const Properties = () => {
	const { properties, getProperties }: any = useProperties();
	const { setCanje, canje }: any = useOrdes();
	const [modal, setModal] = useState(false);
	const [bathrooms, setBathrooms] = useState('');
	const [bedrooms, setBedrooms] = useState('');
	const [minPrice, setMinPrice] = useState('');
	const [maxPrice, setMaxPrice] = useState('');
	const [code, setCode] = useState('');
	const [property, setProperty] = useState();

	const {
		operationType,
		operationTypeSelected,
		setOperationTypeSelected,

		propertyType,
		propertyTypeSelected,
		setPropertyTypeSelected,

		stateSelected,
		setStateSelected,
		state,
		currencySelected,
		setCurrencySelected,
		currency
	}: any = useFilter();

	useEffect(() => {
		getProperties();
	}, []);

	const handleProperty = (property: any) => {
		setCode(property.code);
		setProperty(property);
	};

	const region = stateSelected?.value !== 0 ? stateSelected?.value : '';
	const operationId =
		operationTypeSelected?.value !== 0 ? operationTypeSelected?.value : '';
	const currencyId =
		currencySelected?.value !== 0 ? currencySelected?.value : '';
	const typeId =
		propertyTypeSelected?.value !== 0 ? propertyTypeSelected?.value : '';

	const searchBathrooms = async (e: any) => setBathrooms(e.target.value);

	const searchBedrooms = async (e: any) => setBedrooms(e.target.value);

	const searchMinPrice = async (e: any) => setMinPrice(e.target.value);

	const searchMaxPrice = async (e: any) => setMaxPrice(e.target.value);

	const handleFilter = () => {
		getProperties(
			`bathrooms=${bathrooms}&bedrooms=${bedrooms}&operationId=${operationId}&typeId=${typeId}&region=${region}&currencyId=${currencyId}&minPrice=${
				minPrice || 0
			}&maxPrice=${maxPrice || 1000000}`
		);
		setModal(false);
	};

	const handleResetFilter = () => {
		getProperties();
	};

	return (
		<>
			<div className="row mb-4">
				<div className="offset-md-5 col-md-3">
					<Button block disabled={code === ''}>
						Agregar a la lista
					</Button>
				</div>
				<div className="col-md-1">
					<span className="toggle-filter" onClick={() => setModal(true)}>
						<BiFilter size={24} />
					</span>
				</div>
				<div className="col-md-3" onClick={handleResetFilter}>
					<Button block>Borrar Filtros</Button>
				</div>
			</div>
			<div className="row">
				<div className="col-md-12">
					{properties.length
						? properties.map((property: any, index: number) => (
							<Property
								key={index}
								property={property}
								code={code}
								handleProperty={() => handleProperty(property)}
							/>
						  ))
						: null}
				</div>
			</div>
			<ModalCenter modal={modal} setModal={setModal} title="Filtrar">
				<h2 className="mb-4">Filtrar por categoria</h2>
				<div className="row mb-4">
					<div className="col-md-6">
						<Select
							label="Tipo de Operacion"
							options={operationType}
							setSelected={setOperationTypeSelected}
							selected={operationTypeSelected}
						/>
					</div>
					<div className="col-md-6">
						<Select
							label="Tipo de Moneda"
							options={currency}
							setSelected={setCurrencySelected}
							selected={currencySelected}
						/>
					</div>
				</div>
				<div className="row mb-4">
					<div className="col-md-6">
						<Select
							label="Tipo de Propiedad"
							options={propertyType}
							setSelected={setPropertyTypeSelected}
							selected={propertyTypeSelected}
						/>
					</div>
					<div className="col-md-3">
						<Search
							label="Precio Minimo"
							placeholder="Precio Minimo"
							onChange={searchMinPrice}
						/>
					</div>
					<div className="col-md-3">
						<Search
							label="Precio Maximo"
							placeholder="Precio Maximo"
							onChange={searchMaxPrice}
						/>
					</div>
				</div>
				<div className="row mb-4">
					<div className="col-md-6">
						<Select
							label="Region"
							options={state}
							setSelected={setStateSelected}
							selected={stateSelected}
						/>
					</div>
					<div className="col-md-6">
						<Search
							label="Cantidad de Habitaciones"
							placeholder="Habitaciones"
							onChange={searchBedrooms}
						/>
					</div>
				</div>
				<div className="row mb-4">
					<div className="col-md-6">
						<Search label="Comuna" placeholder="Comuna" />
					</div>
					<div className="col-md-6">
						<Search
							label="Cantidad de Baños"
							placeholder="Baños"
							onChange={searchBathrooms}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-md-3 offset-md-6">
						<Button block onClick={() => setModal(false)} variant="outline">
							Cancelar
						</Button>
					</div>
					<div className="col-md-3">
						<Button block onClick={handleFilter}>
							Fltrar
						</Button>
					</div>
				</div>
			</ModalCenter>
		</>
	);
};

export default Properties;
