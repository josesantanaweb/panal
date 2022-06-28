import React, { useState, useEffect } from 'react';
import { BiPencil, BiTrash } from 'react-icons/bi';
import { ToastContainer } from 'react-toastify';
import { Preloader, Badge } from 'components';
import Content from 'layout/Content';
import ContentHead from 'layout/ContentHead';
import AddUsers from './Add';
import EditUsers from './Edit';
import { toastError, toastSuccess } from 'utils/libs/toast';
import { findFirstLetter } from 'utils';
import useUsers from 'hooks/useUsers';
import UsersServices from 'services/usersService';
import useShared from 'hooks/useShared';

const Users: React.FC = () => {
	const [modalAdd, setModalAdd] = useState(false);
	const [modalEdit, setModalEdit] = useState(false);
	const [editData, setEditData] = useState({});

	const { users, loading, getUsers }: any = useUsers();
	const { getDocuments }: any = useShared();

	useEffect(() => {
		getUsers();
	}, []);

	useEffect(() => {
		getDocuments();
	}, []);

	const onEdit = async (item: any) => {
		setEditData(item);
		setModalEdit(true);
	};

	const onDelete = async (id: number) => {
		try {
			await UsersServices.deleteUser(id);
			toastSuccess('Usuario Eliminado Exitosamente');
			getUsers();
		} catch (error) {
			toastError('Error al Eliminar Usuario');
		}
	};

	if (loading) return <Preloader />;

	return (
		<React.Fragment>
			<Content>
				<ContentHead
					title="Lista de Usuarios"
					onClick={() => setModalAdd(true)}
					btnText="Agregar"
				/>
				<div className="table-list mb-3">
					<div className="table-item table-head">
						<div className="table-col">
							<span className="table-text">Usuario</span>
						</div>
						<div className="table-col table-col-md">
							<span className="table-text">Rol</span>
						</div>
						<div className="table-col">
							<span className="table-text">Telefono</span>
						</div>
						<div className="table-col">
							<span className="table-text">Estado</span>
						</div>
						<div className="table-col"></div>
					</div>
					{users.length
						? users.map((item: any, index: number) => (
								<div className="table-item" key={index}>
									<div className="table-col">
										<a className="table-user">
											<div className="table-user-avatar">
												<span>{findFirstLetter(item.name)}</span>
											</div>
											<div className="table-user-info">
												<span className="table-lead">
													{item.name} {item.lastName}
												</span>
												<span>{item.email}</span>
											</div>
										</a>
									</div>
									<div className="table-col table-col-mb">
										<span className="table-text">Admin</span>
									</div>
									<div className="table-col">
										<span className="table-text">
											{item.phone || '+584454548'}
										</span>
									</div>
									<div className="table-col">
										<Badge variant="success" label="Activo" />
									</div>
									<div className="table-col table-col-mb">
										<span
											className="table-icon table-edit-icon"
											onClick={() => onEdit(item)}>
											<BiPencil size={24} />
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
			<AddUsers modal={modalAdd} setModal={setModalAdd} />
			<EditUsers
				modal={modalEdit}
				setModal={setModalEdit}
				editData={editData}
			/>
			<ToastContainer />
		</React.Fragment>
	);
};

export default Users;
