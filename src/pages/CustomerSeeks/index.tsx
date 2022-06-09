import React, { useState } from 'react';
import { BiCog, BiEdit, BiHome, BiHomeSmile, BiTrashAlt } from 'react-icons/bi';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import 'moment-timezone';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalCanje from 'pages/Orders/ModalCanje';
import Button from 'components/Button';
import Select from 'components/Select';
import Input from 'components/Input';
import { FaHandshake } from 'react-icons/fa';
import { ISelect } from 'interfaces';
import styles from './styles.module.scss';
import UsersServices from 'services/usersServices';
import OrdersServices from 'services/ordersServices';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import SelectProperty from 'pages/Orders/SelectProperty';
import { Link } from 'react-router-dom';

const operationOptions = [
	{
		label: 'Todas',
		value: 'todas',
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
					<h2 className={styles['orders-title']}>Cliente Busca</h2>
					<p className={styles['users-subtitle']}>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum,
						voluptatum?
					</p>
				</div>
				<Button onClick={handleSelectProperty}>Generar Cliente</Button>
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

				<div className={styles['orders-filter-inputs']}>
					<div className={styles['orders-search']}>
						<div>
							<Input placeholder="Buscar..." search />
						</div>
					</div>
				</div>
			</div>
			<div className={styles.content}>
				{isError ? (
					<div className={styles['table-error']}>Hubo un error!</div>
				) : (
					<div className={styles['table-container']}>
						<table className={styles.table}>
							<thead>
								<tr className={styles['table-head bg-white']}>
									<th>
										<h2 className={styles['orders-title']}>Resultados</h2>
									</th>
									<span
										className={`${styles['table-status']} ${styles.pending}`}
									>
										100 clientes
									</span>
								</tr>
							</thead>
							<thead>
								<tr className={styles['table-head']}>
									<th>Cliente</th>
									<th>Ejecutivo</th>
									<th>Estado</th>
									<th>Tipo</th>
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
											<td>
												<span className={styles['table-user']}>
													{order.customer.name}
												</span>
											</td>
											<td>
												<span className={styles['table-user']}>
													{order.customer.name}
												</span>
											</td>
											<td>
												<span
													className={`${styles['table-status']} ${styles.pending}`}
												>
													Pendiente
												</span>
											</td>
											<td>
												<span className={styles['table-user']}>
													{order.realtor.name} {order.realtor.lastName}
												</span>
											</td>
											<td>
												<span className={styles['table-user']}>
													<Link to={`/orders/${order.id}`}>
														<FaHandshake size={24} />
													</Link>
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
