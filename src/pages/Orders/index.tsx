import React, { useState, useEffect } from 'react';
import { BiTrash, BiHomeSmile, BiSpreadsheet } from 'react-icons/bi';
import moment from 'moment';
import 'moment-timezone';
import Content from 'layout/Content';
import { ToastContainer } from 'react-toastify';
import ContentHead from 'layout/ContentHead';
import useShared from 'hooks/useShared';
import useOrders from 'hooks/useOrders';
import useFilter from 'hooks/useFilter';
import { Badge, Preloader, Modal, Search, Select } from 'components';
import { findFirstLetter } from 'utils';
import { toastError, toastSuccess } from 'utils/libs/toast';
import OrdersServices from 'services/ordersService';
import Selection from './Selection';
import Generate from './Generate';
import SendEmail from './SendEmail';
import Detail from './Detail';
import Exchange from './Exchange';

const Orders = () => {
	const { orders, loading, getOrders }: any = useOrders();
	const [modal, setModal] = useState(false);
	const [modalCanje, setModalCanje] = useState(false);
	const [selection, setSelection] = useState(true);
	const [generate, setGenerate] = useState(false);
	const [sendEmail, setSendEmail] = useState(false);
	const [modalDetail, setModalDetail] = useState(false);
	const [property, setProperty] = useState<any>({});
	const [orderId, setOrderId] = useState(1);

	// Filtros
	const [title, setTitle] = useState('');
	const [bathrooms, setBathrooms] = useState('');
	const [bedrooms, setBedrooms] = useState('');
	const [minPrice, setMinPrice] = useState('');
	const [maxPrice, setMaxPrice] = useState('');

	const {
		operationType,
		operationTypeSelected,
		setOperationTypeSelected,
		getOperationType,

		propertyType,
		propertyTypeSelected,
		setPropertyTypeSelected,
		getPropertyType,

		stateSelected,
		setStateSelected,
		state,
		getStates: getStatesForFilter,
		currencySelected,
		setCurrencySelected,
		currency,
		getCurrency
	}: any = useFilter();

	const region = stateSelected?.value !== 0 ? stateSelected?.value : '';
	const operationId =
		operationTypeSelected?.value !== 0 ? operationTypeSelected?.value : '';
	const currencyId =
		currencySelected?.value !== 0 ? currencySelected?.value : '';
	const typeId =
		propertyTypeSelected?.value !== 0 ? propertyTypeSelected?.value : '';

	useEffect(() => {
		getOperationType();
	}, []);

	useEffect(() => {
		getPropertyType();
	}, []);

	useEffect(() => {
		getStatesForFilter();
	}, []);

	useEffect(() => {
		getCurrency();
	}, []);

	const onDelete = async (id: number) => {
		try {
			await OrdersServices.deleteOrder(id);
			toastSuccess('Orden Eliminada Exitosamente');
			getOrders();
		} catch (error) {
			toastError('Error al Eliminar Orden');
		}
	};

	useEffect(() => {
		getOrders(
			`titleOrId=${title}&bathrooms=${bathrooms}&bedrooms=${bedrooms}&operationId=${operationId}&typeId=${typeId}&region=${region}&currencyId=${currencyId}&minPrice=${
				minPrice || 0
			}&maxPrice=${maxPrice || 1000000}`
		);
	}, [
		title,
		bathrooms,
		bedrooms,
		operationTypeSelected,
		propertyTypeSelected,
		stateSelected,
		currencyId,
		minPrice,
		maxPrice
	]);

	if (loading) return <Preloader />;

	const handleDetail = (order: any) => {
		setModalDetail(true);
		setProperty(order.property);
	};

	const handleExchange = (order: any) => {
		setModalCanje(true);
		setProperty(order.property);
	};

	const searchTiitle = async (e: any) => setTitle(e.target.value);

	const searchBathrooms = async (e: any) => setBathrooms(e.target.value);

	const searchBedrooms = async (e: any) => setBedrooms(e.target.value);

	const searchMinPrice = async (e: any) => setMinPrice(e.target.value);

	const searchMaxPrice = async (e: any) => setMaxPrice(e.target.value);

	return (
		<React.Fragment>
			<Content>
				<ContentHead title="Lista de Ordenes" onClick={() => setModal(true)} />
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
							setSelected={setPropertyTypeSelected}
							selected={propertyTypeSelected}
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
						<Search label="Comuna" placeholder="Comuna" />
					</div>
				</div>
				<div className="row mb-4">
					<div className="col-md-3">
						<Select
							label="Tipo de Moneda"
							options={currency}
							setSelected={setCurrencySelected}
							selected={currencySelected}
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
				<div className="table-list mb-3">
					<div className="table-item table-head">
						<div className="table-col">
							<span className="table-text">Cliente</span>
						</div>
						<div className="table-col">
							<span className="table-text">Ejecutivo/a</span>
						</div>
						<div className="table-col">
							<span className="table-text">Fecha y Hora</span>
						</div>
						<div className="table-col">
							<span className="table-text">Estado</span>
						</div>
						<div className="table-col">
							<span className="table-text">Canje</span>
						</div>
						<div className="table-col"></div>
					</div>
					{orders.length
						? orders.map((item: any, index: number) => (
							<div className="table-item" key={index}>
								<div className="table-col">
									<a className="table-user">
										<div className="table-user-avatar">
											<span>{findFirstLetter(item.customer.name)}</span>
										</div>
										<div className="table-user-info">
											<span className="table-lead">
												{item.customer.name} {item.customer.lastName}
											</span>
											<span>{item.email}</span>
										</div>
									</a>
								</div>
								<div className="table-col">
									{item.realtor.name} {item.realtor.lastName}
								</div>
								<div className="table-col table-col-mb">
									<span className="table-text">
										{moment(item.dateTimeOfVisits).format(
											'MMMM Do YYYY, h:mm:ss a'
										)}
									</span>
								</div>
								<div className="table-col">
									<Badge variant="success" label="Activo" />
								</div>
								<div className="table-col">
									<span
										onClick={() => handleExchange(item)}
										style={{ cursor: 'pointer' }}>
										<BiHomeSmile size={24} />
									</span>
								</div>
								<div className="table-col table-col-mb">
									<span
										className="table-icon table-success-icon"
										onClick={() => handleDetail(item)}>
										<BiSpreadsheet size={24} />
									</span>
									<span
										className="table-icon table-delete-icon"
										onClick={() => onDelete(item.id)}>
										<BiTrash size={24} />
									</span>
								</div>
							</div>
						  ))
						: null}
				</div>
			</Content>
			<Modal
				modal={modal}
				setModal={setModal}
				size={selection ? 'lg' : 'md'}
				title={
					generate
						? 'Generar Orden'
						: sendEmail
							? 'Enviar Email'
							: 'Seleccionar Propiedad/es'
				}>
				{selection && (
					<Selection
						setProperty={setProperty}
						setGenerate={setGenerate}
						setSelection={setSelection}
					/>
				)}
				{generate && (
					<Generate
						property={property}
						setGenerate={setGenerate}
						setSendEmail={setSendEmail}
						setOrderId={setOrderId}
					/>
				)}
				{sendEmail && <SendEmail orderId={orderId} setModal={setModal} />}
			</Modal>
			<Exchange modalCanje={modalCanje} setModalCanje={setModalCanje} />
			<Detail
				modal={modalDetail}
				setModal={setModalDetail}
				property={property}
			/>
			<ToastContainer />
		</React.Fragment>
	);
};

export default Orders;
