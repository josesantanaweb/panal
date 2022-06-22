import React, {useState, useEffect} from 'react';
import Content from 'layout/Content';
import { ToastContainer } from 'react-toastify';
import { Button, Preloader, Search, Select } from 'components';
import ContentHead from 'layout/ContentHead';
import Property from './Property';
import Detail from './Detail';
import { toastError, toastSuccess } from 'utils/libs/toast';
import useProperties from 'hooks/useProperties';
import useFilter from 'hooks/useFilter';
import PropertiesServices from 'services/propertiesService';

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
		propertyType,
		propertyId,
		setPropertyId,
		currencyId,
		setCurrencyId,
		currencyType,
	}:any = useProperties();
	const {
		operationType,
		operationTypeSelected,
		setOperationTypeSelected,
		getOperationType,

		stateSelected,
		setStateSelected,
		state,
		getStates
	}:any = useFilter();
	const [modalDetail, setModalDetail] = useState(false);
	const region = stateSelected?.value !== 0 ? stateSelected?.value : '';
	const operationId = operationTypeSelected?.value !== 0 ? operationTypeSelected?.value : '';

	useEffect(() => {
		getOperationType();
	}, []);

	useEffect(() => {
		getStates();
	}, []);

	useEffect(() => {
		getProperties(`titleOrId=${title}&bathrooms=${bathrooms}&bedrooms=${bedrooms}&operationId=${operationId}&typeId=${propertyId?.value}&region=${region}&currencyId=${currencyId?.value}&minPrice=${minPrice || 0}&maxPrice=${maxPrice || 1000000}`);
	}, [title, bathrooms, bedrooms, operationTypeSelected, propertyId, stateSelected, currencyId, minPrice, maxPrice]);

	if (loading) return <Preloader />;

	const handleDetail = (property: any) => {
		setModalDetail(true);
		setProperty(property);
	};


	const onDelete = async (id: number) => {
		try {
			await PropertiesServices.deleteProperty(id);
			toastSuccess('Cliente Eliminado Exitosamente');
			getProperties();
		} catch (error) {
			toastError('Error al Eliminar Cliente');
		}
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
										setSelected={setOperationTypeSelected}
										selected={operationTypeSelected}
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
										options={state}
										setSelected={setStateSelected}
										selected={stateSelected}
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
												<Property
													key={index}
													property={property}
													setModalDetail={() => handleDetail(property)}
													onDelete={() => onDelete(property.code)}
												/>
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
			<ToastContainer />
		</React.Fragment>
	);
};

export default Properties;
