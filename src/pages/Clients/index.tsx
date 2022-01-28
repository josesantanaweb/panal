import React, {useState} from 'react';
import {BiEdit, BiListUl, BiTrashAlt} from "react-icons/bi";
import { useMutation, useQueryClient, useQuery } from 'react-query';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import Button from "components/Button";
import Select from "components/Select";
import Input from "components/Input";
import AddCustomers from "./components/AddCustomers";
import EditCustomers from "./components/EditCustomers";

import styles from "./styles.module.scss";
import CustomersServices from 'services/customersServices';
import Binnacle from './components/Binnacle';


const limitOptions = [
	{
		label: 10,
		value: 10,
	},
	{
		label: 20,
		value: 20,
	},
	{
		label: 30,
		value: 30,
	}
];

const skeleton = [0,1,2,3];

const Customers = () => {
	const [limit, setLimit] = useState(limitOptions[0]);
	const [userId, setUserId] = useState<number>(0);
	const [openSelectLimit, setOpenSelectLimit] = useState<boolean>(false);
	const [openModalAddCustomer, setOpenModalAddCustomer] = useState<boolean>(false);
	const [openModalEditCustomer, setOpenModalEditCustomer] = useState<boolean>(false);
	const [openModalBinnacle, setOpenModalBinnacle] = useState<boolean>(false);
	const { data, isLoading, isError } = useQuery(["customers", limit.value], CustomersServices.getCustomers);
	const queryClient = useQueryClient();
	const { mutate } = useMutation(CustomersServices.deleteCustomer, {
		onSuccess: (data) => {
			toast.success("Cliente eliminado exitosamente", {
				position: "top-right",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
			});
			queryClient.invalidateQueries(['customers']);
		},
		onError: (error: any) => {
			toast.error("Ocurrio un error al eliminar al cliente", {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
			});
		}
	});

	// Handle Open limit select
	const handleOpenLimit = () => setOpenSelectLimit(true);

	// Handle Add Customers
	const handleAddCustomers = () => setOpenModalAddCustomer(true);

	// Handle Add Customers
	const handleBinnacle = () => setOpenModalBinnacle(true);

	// Handle Edit Customers
	const handleEditCustomers = (id: number) => {
		setUserId(id);
		setOpenModalEditCustomer(true);
	};

	// Handle Delete Customers
	const handleDelete = (id: number) => {
		mutate(id);
	};

	return (
		<div className={styles.customers}>
			<div className={styles["customers-top"]}>
				<h2 className={styles["customers-title"]}>Listado de Clientes</h2>
				<Button onClick={handleAddCustomers}>Agregar Cliente</Button>
			</div>
			<div className={styles["customers-filter"]}>
				<div>
					<Select
						options={limitOptions}
						selectedOption={limit}
						setSelectedOption={setLimit}
						open={openSelectLimit}
						setOpen={setOpenSelectLimit}
						handleOpenSelect={handleOpenLimit}
					/>
				</div>
				<div>
					<Input placeholder="Buscar..." search/>
				</div>
			</div>
			<div className={styles.content}>
				{
					isError
						?
						<div className={styles["table-error"]}>Hubo un error!</div>
						:
						<div className={styles["table-container"]}>
							<table className={styles.table}>
								<thead>
									<tr className={styles["table-head"]}>
										<th>#</th>
										<th>Cliente</th>
										<th>Ejecutivo</th>
										<th>Estado</th>
										<th>Tipo</th>
										<th>Bitacora</th>
										<th>Acciones</th>
									</tr>
								</thead>
								{
									isLoading
										?
										<tbody className={styles["table-body"]}>
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
														<td style={{width: '300px'}}>
															<span className={styles["table-user"]}>
																<Skeleton width="100px" height="20px" />
															</span>
														</td>
														<td style={{width: '300px'}}>
															<span className={styles["table-user"]}>
																<Skeleton width="100px" height="20px" />
															</span>
														</td>
														<td>
															<Skeleton width="100px" height="20px" />
														</td>
														<td style={{width: '200px'}}>
															<Skeleton width="200px" height="20px" />
														</td>
														<td>
															<Skeleton width="100px" height="20px" />
														</td>
														<td>
															<Skeleton width="100px" height="20px" />
														</td>
													</tr>
												))}
											</SkeletonTheme>
										</tbody>
										:
										<tbody className={styles["table-body"]}>
											{data?.data?.map((client: any, index: number) => (
												<tr key={index}>
													<td>{index + 1}</td>
													<td>
														{client.name} {client.lastName}
													</td>
													<td>
														{client.createdByRealtor.name} {client.createdByRealtor.lastName}
													</td>
													<td>
														<span className={`${styles["table-status"]} ${styles.admin}`}>{client.status.name}</span>
													</td>
													<td>Casa</td>
													<td>
														<span className={styles["table-bitacora"]} onClick={handleBinnacle}><BiListUl/></span>
													</td>
													<td>
														<div className={styles["table-action"]}>
															<span className={styles["table-edit"]} onClick={() => handleEditCustomers(client.id)}><BiEdit/></span>
															<span className={styles["table-delete"]} onClick={() => handleDelete(client.id)}><BiTrashAlt/></span>
														</div>
													</td>
												</tr>
											))}
										</tbody>
								}
							</table>
						</div>
				}
			</div>
			<AddCustomers
				openModal={openModalAddCustomer}
				setOpenModal={setOpenModalAddCustomer}
			/>
			<EditCustomers
				userId={userId}
				openModal={openModalEditCustomer}
				setOpenModal={setOpenModalEditCustomer}
			/>
			<Binnacle
				openModal={openModalBinnacle}
				setOpenModal={setOpenModalBinnacle}
			/>
			<ToastContainer />
		</div>
	);
};

export default Customers;
