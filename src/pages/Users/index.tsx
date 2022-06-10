import React, {useState} from 'react';
import {BiEdit, BiTrashAlt} from "react-icons/bi";
import { useMutation, useQueryClient, useQuery } from 'react-query';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Button from "components/Button";
import Select from "components/Select";
import Input from "components/Input";
import AddUsers from "./components/AddUsers";
import EditUsers from "./components/EditUsers";

import { ISelect } from "interfaces";
import styles from "./styles.module.scss";
import UsersServices from 'services/usersServices';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const statusOptions = [
	{
		label: "Activa",
		value: "active",
	},
];

const usersOptions = [
	{
		label: "Usuarios",
		value: "users",
	},
];

const companyOptions = [
	{
		label: "Empresa",
		value: "company",
	},
];

const skeleton = [0,1,2,3];

const Users = () => {
	const [page, setPage] = useState<ISelect>(statusOptions[0]);
	const [users, setUsers] = useState<ISelect>(usersOptions[0]);
	const [company, setCompany] = useState<ISelect>(companyOptions[0]);
	const [userId, setUserId] = useState<number>(0);
	const [openModalAddUsers, setOpenModalAddUsers] = useState<boolean>(false);
	const [openModalEditUser, setOpenModalEditUser] = useState<boolean>(false);
	const [openSelectPage, setOpenSelectPage] = useState<boolean>(false);
	const { data, isLoading, isError } = useQuery('users', UsersServices.getUsers);
	const queryClient = useQueryClient();
	const { mutate } = useMutation(UsersServices.deleteUser, {
		onSuccess: (data) => {
			toast.success("Usuario eliminado exitosamente", {
				position: "top-right",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
			});
			queryClient.invalidateQueries(['users']);
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

	// Handle Add Users
	const handleAddUsers = () => setOpenModalAddUsers(true);

	// Handle Edit User
	const handleEditUsers = (id: number) => {
		setUserId(id);
		setOpenModalEditUser(true);
	};

	// Handle Delete User
	const handleDelete = (id: number) => {
		mutate(id);
	};

	return (
		<div className={styles.users}>
			<div className={styles["users-top"]}>
				<div>
					<h2 className={styles["users-title"]}>Usuarios</h2>
					<p className={styles["users-subtitle"]}>Esta pantalla es para la creación, edición, eliminación y listado de Usuarios</p>
				</div>
				<Button onClick={handleAddUsers}>Agregar Usuario</Button>
			</div>
			<div className={styles["users-filter"]}>
				<div>
					<Input placeholder="Buscar..." search/>
				</div>
				<div>
					<Select
						options={statusOptions}
						selectedOption={page}
						setSelectedOption={setPage}
						open={openSelectPage}
						setOpen={setOpenSelectPage}
						handleOpenSelect={handleOpenPage}
					/>
				</div>
				<div>
					<Select
						options={statusOptions}
						selectedOption={users}
						setSelectedOption={setUsers}
						open={openSelectPage}
						setOpen={setOpenSelectPage}
						handleOpenSelect={handleOpenPage}
					/>
				</div>
				<div>
					<Select
						options={companyOptions}
						selectedOption={company}
						setSelectedOption={setCompany}
						open={openSelectPage}
						setOpen={setOpenSelectPage}
						handleOpenSelect={handleOpenPage}
					/>
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
										<th>Nombre Usuario</th>
										<th>Tipo de Usuario</th>
										<th>Email</th>
										<th>Estado</th>
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
											{data?.data?.map((user: any, index: number) => (
												<tr key={index}>
													<td>{index + 1}</td>
													<td>
														{user.name} {user.lastName}
													</td>
													<td>Admin</td>
													<td style={{width: '400px'}}>{user.email}</td>
													<td>
														<span className={`${styles["table-role"]} ${styles.admin}`}>Activo</span>
													</td>
													<td>
														<div className={styles["table-action"]}>
															<span className={styles["table-edit"]} onClick={() => handleEditUsers(user.id)}><BiEdit/></span>
															<span className={styles["table-delete"]} onClick={() => handleDelete(user.id)}><BiTrashAlt/></span>
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
			<AddUsers
				openModal={openModalAddUsers}
				setOpenModal={setOpenModalAddUsers}
			/>
			<EditUsers
				userId={userId}
				openModal={openModalEditUser}
				setOpenModal={setOpenModalEditUser}
			/>
			<ToastContainer />
		</div>
	);
};

export default Users;
