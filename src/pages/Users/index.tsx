import React, {useState} from 'react';
import {BiEdit, BiTrashAlt} from "react-icons/bi";
import { useQuery } from 'react-query';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Button from "components/Button";
import Select from "components/Select";
import Input from "components/Input";
import AddUsers from "./components/AddUsers";

import { ISelect } from "interfaces";
import userAvatar from "../../assets/img/user.jpg";
import styles from "./styles.module.scss";
import UsersServices from 'services/usersServices';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

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

const Users = () => {
	const [page, setPage] = useState<ISelect>(pageOptions[0]);
	const [openModalAddUsers, setOpenModalAddUsers] = useState<boolean>(false);
	const { data, isLoading, isError } = useQuery('users', UsersServices.getUsers);
	const [openSelectPage, setOpenSelectPage] = useState<boolean>(false);
	const handleOpenPage = () => setOpenSelectPage(true);

  	// Handle Add Users
	const handleAddUsers = () => setOpenModalAddUsers(true);

	return (
		<div className={styles.users}>
			<div className={styles["users-top"]}>
				<h2 className={styles["users-title"]}>Listado de Usuarios</h2>
				<Button onClick={handleAddUsers}>Agregar Usuario</Button>
			</div>
			<div className={styles["users-filter"]}>
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
										<th>Usuario</th>
										<th>Rol</th>
										<th>Email</th>
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
													<td>
														<span className={`${styles["table-role"]} ${styles.admin}`}>Admin</span>
													</td>
													<td style={{width: '400px'}}>{user.email}</td>
													<td>
														<div className={styles["table-action"]}>
															<span className={styles["table-edit"]}><BiEdit/></span>
															<span className={styles["table-delete"]}><BiTrashAlt/></span>
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
			<ToastContainer />
		</div>
	);
};

export default Users;
