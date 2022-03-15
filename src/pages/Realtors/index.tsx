import React, {useState} from 'react';
import {BiEdit, BiTrashAlt} from "react-icons/bi";
import { useMutation, useQueryClient, useQuery } from 'react-query';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from "react-redux";

import Button from "components/Button";
import Select from "components/Select";
import Input from "components/Input";
import AddRealtors from "./components/AddRealtors";
import EditRealtors from "./components/EditRealtors";

import { ISelect } from "interfaces";
import styles from "./styles.module.scss";
import RealtorsServices from 'services/realtorsServices';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { roleSelector } from 'store/selectors';

const pageOptions = [
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

const Realtors = () => {
	const role = useSelector(roleSelector);
	const [page, setPage] = useState<ISelect>(pageOptions[0]);
	const [realtorId, setRealtorId] = useState<number>(0);
	const [openModalAddRealtors, setOpenModalAddRealtors] = useState<boolean>(false);
	const [openModalEditRealtor, setOpenModalEditRealtor] = useState<boolean>(false);
	const [openSelectPage, setOpenSelectPage] = useState<boolean>(false);
	const { data, isLoading, isError } = useQuery('realtors', RealtorsServices.getRealtors);
	const queryClient = useQueryClient();
	const { mutate } = useMutation(RealtorsServices.deleteRealtor, {
		onSuccess: (data) => {
			toast.success("Agente eliminado exitosamente", {
				position: "top-right",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
			});
			queryClient.invalidateQueries(['realtors']);
		},
		onError: (error: any) => {
			toast.error("Ocurrio un error al eliminar al usuario", {
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

	const handleOpenPage = () => setOpenSelectPage(true);

  	// Handle Add Realtors
	const handleAddRealtors = () => setOpenModalAddRealtors(true);

  	// Handle Edit Realtors
	const handleEditRealtors = (id: number) => {
		setRealtorId(id);
		setOpenModalEditRealtor(true);
	};

	// Handle Delete Realtors
	const handleDelete = (id: number) => {
		mutate(id);
	};

	return (
		<div className={styles.realtors}>
			<div className={styles["realtors-top"]}>
				<h2 className={styles["realtors-title"]}>Listado de Agentes</h2>
				<Button onClick={handleAddRealtors}>Agregar Agente</Button>
			</div>
			<div className={styles["realtors-filter"]}>
				<div>
					<Select
						options={pageOptions}
						selectedOption={page}
						setSelectedOption={setPage}
						open={openSelectPage}
						setOpen={setOpenSelectPage}
						handleOpenSelect={handleOpenPage}
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
										<th>Nombre</th>
										<th>Email</th>
										<th>Telefono</th>
										<th>Estado</th>
										{
											role !== "CORREDOR ADMIN" &&
										  <th>Acciones</th>
										}
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
																<Skeleton
																	circle
																	width="40px"
																	height="40px"
																	style={{marginRight: "20px"}}
																/>
																<Skeleton width="100px" height="20px" />
															</span>
														</td>
														<td>
															<Skeleton width="100px" height="20px" />
														</td>
														<td style={{width: '400px'}}>
															<Skeleton width="400px" height="20px" />
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
											{data?.data?.map((realtor: any, index: number) => (
												<tr key={index}>
													<td>{index + 1}</td>
													<td>
														{realtor.name} {realtor.lastName}
													</td>
													<td>
														{realtor.email}
													</td>
													<td>
														{realtor.contactPhone}
													</td>
													<td>
														<span className={`${styles["table-role"]} ${styles.admin}`}>{realtor.status.name}</span>
													</td>
													{
														role !== "CORREDOR ADMIN" &&
													<td>
														<div className={styles["table-action"]}>
															<span className={styles["table-edit"]} onClick={() => handleEditRealtors(realtor.id)}><BiEdit/></span>
															<span className={styles["table-delete"]} onClick={() => handleDelete(realtor.id)}><BiTrashAlt/></span>
														</div>
													</td>
													}
												</tr>
											))}
										</tbody>
								}
							</table>
						</div>
				}
			</div>
			<AddRealtors
				openModal={openModalAddRealtors}
				setOpenModal={setOpenModalAddRealtors}
			/>
			<EditRealtors
				realtorId={realtorId}
				openModal={openModalEditRealtor}
				setOpenModal={setOpenModalEditRealtor}
			/>
			<ToastContainer />
		</div>
	);
};

export default Realtors;
