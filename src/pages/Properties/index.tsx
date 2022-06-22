import React, {useState, useEffect} from 'react';
import Content from 'layout/Content';
import { Button, Preloader, Search, Select } from 'components';
import ContentHead from 'layout/ContentHead';
import Property from './Property';
import Detail from './Detail';
import useProperties from 'hooks/useProperties';
import useShared from 'hooks/useShared';

const Properties = () => {
	const [tab, setTab] = useState(1);
	const [title, setTitle] = useState('');
	const [bathrooms, setBathrooms] = useState('');
	const [bedrooms, setBedrooms] = useState('');
	const [minPrice, setMinPrice] = useState('');
	const [maxPrice, setMaxPrice] = useState('');
	const {
		properties,
		getProperties,
		loading,
		setProperty,
		setOperationId,
		operationId,
		operationType,
		propertyType,
		propertyId,
		setPropertyId,
		currencyId,
		setCurrencyId,
		currencyType,
	}:any = useProperties();
	const {
		stateForFilter,
		stateForFilterSelected,
		setStateForFilterSelected,
		getStates,
	}:any = useShared();
	const [modalDetail, setModalDetail] = useState(false);
	const region = stateForFilterSelected?.value !== 0 ? stateForFilterSelected?.value : '';

	useEffect(() => {
		getStates();
	}, []);

	useEffect(() => {
		getProperties(`titleOrId=${title}&bathrooms=${bathrooms}&bedrooms=${bedrooms}&operationId=${operationId.value}&typeId=${propertyId.value}&region=${region}&currencyId=${currencyId.value}&minPrice=${minPrice || 0}&maxPrice=${maxPrice || 1000000}`);
	}, [title, bathrooms, bedrooms, operationId, propertyId, stateForFilterSelected, currencyId, minPrice, maxPrice]);

	if (loading) return <Preloader />;

	const handleDetail = (property: any) => {
		setModalDetail(true);
		setProperty(property);
	};

	const searchTiitle =  async (e: any) => setTitle(e.target.value);

	const searchBathrooms =  async (e: any) => setBathrooms(e.target.value);

	const searchBedrooms =  async (e: any) => setBedrooms(e.target.value);

	const searchMinPrice =  async (e: any) => setMinPrice(e.target.value);

	const searchMaxPrice =  async (e: any) => setMaxPrice(e.target.value);

	return (
		<React.Fragment>
			<Content>
				<div className="tabs">
					<div className="tabs-head">
						<div className="tabs-nav">
							<li className={tab === 1 ? 'is-active' : ''} onClick={() => setTab(1)}>Propiedades</li>
							<li className={tab === 2 ? 'is-active' : ''} onClick={() => setTab(2)}>Borradores</li>
							<li>Caracteristicas</li>
						</div>
					</div>
					<div className="tabs-content">
						<div className="tabs-item" hidden={tab != 1}>
							<ContentHead
								title="Lista de Propiedades"
								onClick={() => console.log('Agregar Propiedad')}
							/>
							<div className="row mb-4">
								<div className="col-md-3">
									<Search
										iconSeach
										placeholder="Buscar Propiedades"
										onChange={searchTiitle}
									/>
								</div>
							</div>
							<div className="row mb-4">
								<div className="col-md-3">
									<Select
										label="Tipo de Operacion"
										options={operationType}
										setSelected={setOperationId}
										selected={operationId}
									/>
								</div>
								<div className="col-md-3">
									<Select
										label="Tipo de Propiedad"
										options={propertyType}
										setSelected={setPropertyId}
										selected={propertyId}
									/>
								</div>
								<div className="col-md-3">
									<Select
										label="Region"
										options={stateForFilter}
										setSelected={setStateForFilterSelected}
										selected={stateForFilterSelected}
									/>
								</div>
								<div className="col-md-3">
									<Search
										label="Comuna"
										placeholder="Comuna"
									/>
								</div>
							</div>
							<div className="row mb-4">
								<div className="col-md-3">
									<Select
                    	label="Tipo de Moneda"
										options={currencyType}
										setSelected={setCurrencyId}
										selected={currencyId}
									/>
								</div>
								<div className="col-md">
									<Search
                    	label="Precio Minimo"
										placeholder="Precio Minimo"
										onChange={searchMinPrice}
									/>
								</div>
								<div className="col-md">
									<Search
                    	label="Precio Maximo"
										placeholder="Precio Maximo"
										onChange={searchMaxPrice}
									/>
								</div>
								<div className="col-md-3">
									<Search
                    	label="Cantidad de Baños"
										placeholder="Baños"
										onChange={searchBathrooms}
									/>
								</div>
								<div className="col-md-3">
									<Search
                    	label="Cantidad de Habitaciones"
										placeholder="Habitaciones"
										onChange={searchBedrooms}
									/>
								</div>
							</div>
							<div className="properties">
								<div className="properties-items">
									{
										properties.length
											? properties.map((property: any, index: number) => (
												<Property key={index} property={property} setModalDetail={() => handleDetail(property)}/>
											))
											: null
									}
								</div>
							</div>
						</div>
						<div className="tabs-item" hidden={tab != 2}>
              borradores
						</div>
					</div>
				</div>
				<Detail modal={modalDetail} setModal={setModalDetail}/>
			</Content>
		</React.Fragment>
	);
};

export default Properties;
