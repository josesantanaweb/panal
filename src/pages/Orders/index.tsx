import React, { useState } from 'react';
import { BiCog, BiEdit, BiHome, BiHomeSmile, BiTrashAlt } from 'react-icons/bi';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import 'moment-timezone';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalCanje from './ModalCanje';
import Button from 'components/Button';
import Select from 'components/Select';
import Input from 'components/Input';

import { ISelect } from 'interfaces';
import styles from './styles.module.scss';
import UsersServices from 'services/usersServices';
import OrdersServices from 'services/ordersServices';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import SelectProperty from './SelectProperty';

const operationOptions = [
	{
		label: 'Venta',
		value: 'Venta',
	},
];

const propertyOptions = [
	{
		label: 'Casa',
		value: 'Departamento',
	},
];

const regionOptions = [
	{
		label: 'Region',
		value: 'Region',
	},
];

const communeOptions = [
	{
		label: 'Comuna',
		value: 'Comuna',
	},
];

const currencyOptions = [
	{
		label: 'Moneda',
		value: 'Moneda',
	},
];

const skeleton = [0, 1, 2, 3];

const Orders = () => {
	const [openModalCanje, setOpenModalCanje] = useState<boolean>(false);
	const handleCanje = () => {
		setOpenModalCanje(true);
		console.log('open');
	};

	const [operation, setOperation] = useState<ISelect>(operationOptions[0]);
	const [property, setProperty] = useState<ISelect>(propertyOptions[0]);
	const [region, setRegion] = useState<ISelect>(regionOptions[0]);
	const [commune, setCommune] = useState<ISelect>(communeOptions[0]);
	const [currency, setCurrency] = useState<ISelect>(currencyOptions[0]);
	const { data, isLoading, isError } = useQuery(
		'users',
		UsersServices.getUsers
	);
	const [openModalSelectProperty, setOpenModalSelectProperty] =
		useState<boolean>(false);
	const [openOperation, setOpenOperation] = useState<boolean>(false);
	const [openProperty, setOpenProperty] = useState<boolean>(false);
	const [openRegion, setOpenRegion] = useState<boolean>(false);
	const [openCommune, setOpenCommune] = useState<boolean>(false);
	const [openCurrency, setOpenCurrency] = useState<boolean>(false);
	const { data: orders } = useQuery(['orders'], OrdersServices.getOrders);
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { mutate } = useMutation(OrdersServices.deleteOrder, {
		onSuccess: (data) => {
			toast.success('Orden eliminada exitosamente', {
				position: 'top-right',
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
			});
			queryClient.invalidateQueries(['orders']);
		},
		onError: (error: any) => {
			toast.error('Ocurrio un error al eliminar la orden', {
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

	const handleOpenOperation = () => setOpenOperation(true);
	const handleOpenProperty = () => setOpenProperty(true);
	const handleOpenRegion = () => setOpenRegion(true);
	const handleOpenCommune = () => setOpenCommune(true);
	const handleOpenCurrency = () => setOpenCurrency(true);

	// Handle Generate order
	const handleSelectProperty = () => setOpenModalSelectProperty(true);

	const hanleDetail = () => {
		navigate('/details');
	};

	// Handle Delete Order
	const handleDelete = (id: number) => {
		mutate(id);
	};

	return (
		<div className={styles.orders}>
			<div className={styles['orders-top']}>
				<div>
					<h2 className={styles['orders-title']}>Listado de Ordenes</h2>
					<p className={styles['users-subtitle']}>
            Esta pantalla es para la creación, eliminación y listado de Ordenes de visita
					</p>
				</div>
				<Button onClick={handleSelectProperty}>Generar Orden</Button>
			</div>
			<div className={styles['orders-search']}>
				<div>
					<Input placeholder="Buscar..." search />
				</div>
				<span>
					<BiCog size={24} />
				</span>
			</div>
			<div className={styles['orders-filter']}>
				<div>
					<Select
						options={operationOptions}
						selectedOption={operation}
						setSelectedOption={setOperation}
						open={openOperation}
						setOpen={setOpenOperation}
						handleOpenSelect={handleOpenOperation}
					/>
				</div>
				<div>
					<Select
						options={propertyOptions}
						selectedOption={property}
						setSelectedOption={setProperty}
						open={openProperty}
						setOpen={setOpenProperty}
						handleOpenSelect={handleOpenProperty}
					/>
				</div>
				<div>
					<Select
						options={regionOptions}
						selectedOption={region}
						setSelectedOption={setRegion}
						open={openRegion}
						setOpen={setOpenRegion}
						handleOpenSelect={handleOpenRegion}
					/>
				</div>
				<div>
					<Select
						options={communeOptions}
						selectedOption={commune}
						setSelectedOption={setCommune}
						open={openCommune}
						setOpen={setOpenCommune}
						handleOpenSelect={handleOpenCommune}
					/>
				</div>
				<div>
					<Select
						options={currencyOptions}
						selectedOption={currency}
						setSelectedOption={setCurrency}
						open={openCurrency}
						setOpen={setOpenCurrency}
						handleOpenSelect={handleOpenCurrency}
					/>
				</div>
				<div className={styles['orders-filter-inputs']}>
					<Input placeholder="Precio min" />
					<Input placeholder="Precio max" />
				</div>
				<div>
					<Input placeholder="Dormitorios" />
				</div>
				<div>
					<Input placeholder="Baños" />
				</div>
			</div>
			<div className={styles.content}>
				{isError ? (
					<div className={styles['table-error']}>Hubo un error!</div>
				) : (
					<div className={styles['table-container']}>
						<table className={styles.table}>
							<thead>
								<tr className={styles['table-head']}>
									<th>#</th>
									<th>Fecha y Hora</th>
									<th>Cliente</th>
									<th>Ejecutivo/a</th>
									<th>Codigo de Propiedad</th>
									<th>Estado</th>
									<th>Canje</th>
									<th>Acciones</th>
								</tr>
							</thead>
							{isLoading ? (
								<tbody className={styles['table-body']}>
									<SkeletonTheme
										baseColor="#E8F6FC"
										highlightColor="#DDF4FF"
										borderRadius={2}
									>
										{skeleton.map((item: any, index: number) => (
											<tr key={index}>
												<td>
													<Skeleton width="30px" height="20px" />
												</td>
												<td style={{ width: '300px' }}>
													<span className={styles['table-user']}>
														<Skeleton
															circle
															width="40px"
															height="40px"
															style={{ marginRight: '20px' }}
														/>
														<Skeleton width="100px" height="20px" />
													</span>
												</td>
												<td>
													<Skeleton width="100px" height="20px" />
												</td>
												<td style={{ width: '400px' }}>
													<Skeleton width="400px" height="20px" />
												</td>
												<td>
													<Skeleton width="100px" height="20px" />
												</td>
											</tr>
										))}
									</SkeletonTheme>
								</tbody>
							) : (
								<tbody className={styles['table-body']}>
									{orders?.data?.map((order: any, index: number) => (
										<tr key={index}>
											<td>{index + 1}</td>
											<td>
												{moment(order.dateTimeOfVisits).format(
													'MMMM Do YYYY, h:mm:ss a'
												)}
											</td>
											<td>
												<span className={styles['table-user']}>
													{order.customer.name} {order.customer.lastName}
												</span>
											</td>
											<td>
												<span className={styles['table-user']}>
													{order.realtor.name} {order.realtor.lastName}
												</span>
											</td>
											<td>{order.property.id}</td>
											<td>
												<span
													className={`${styles['table-status']} ${styles.pending}`}
												>
													Pendiente
												</span>
											</td>
											<td>
												<span className={styles['table-canje']}>
													<span
														className={styles['table-edit']}
														onClick={handleCanje}
													>
														<BiHomeSmile size={24} />
													</span>
												</span>
											</td>
											<td>
												<div className={styles['table-action']}>
													<span
														className={styles['table-edit']}
														onClick={hanleDetail}
													>
														<BiHome />
													</span>
													<span
														className={styles['table-delete']}
														onClick={() => handleDelete(order.id)}
													>
														<BiTrashAlt />
													</span>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							)}
						</table>
					</div>
				)}
			</div>
			<SelectProperty
				openModal={openModalSelectProperty}
				setOpenModal={setOpenModalSelectProperty}
			/>
			<ToastContainer />
			<ModalCanje openModal={openModalCanje} setOpenModal={setOpenModalCanje} />
		</div>
	);
};

export default Orders;
