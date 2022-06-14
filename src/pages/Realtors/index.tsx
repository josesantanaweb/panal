import React, { useState, useEffect } from 'react';
import { BiPencil, BiTrash } from 'react-icons/bi';
import { ToastContainer } from 'react-toastify';
import { Button, Input, Preloader, Badge } from 'components';
import Content from 'layout/Content';
import ContentHead from 'layout/ContentHead';
import AddRealtors from './Add';
import EditRealtors from './Edit';
import { toastError, toastSuccess } from 'utils/libs/toast';
import { findFirstLetter } from 'utils';
import useRealtors from 'hooks/useRealtors';
import useShared from 'hooks/useShared';
import RealtorsServices from 'services/realtorsService';

const Realtors: React.FC = () => {
	const [modalAdd, setModalAdd] = useState(false);
	const [modalEdit, setModalEdit] = useState(false);
	const [editData, setEditData] = useState({});

	const { realtors, loading, getRealtors }:any = useRealtors();
	const { getDocuments, getCountries, getStates }:any = useShared();

	useEffect(() => {
		getRealtors();
	}, []);

	useEffect(() => {
		getDocuments();
	}, []);

	useEffect(() => {
		getCountries();
	}, []);

	useEffect(() => {
		getStates();
	}, []);

	const onEdit = async (item: any) => {
		setEditData(item);
		setModalEdit(true);
	};

	const onDelete = async (id: number) => {
		try {
			await RealtorsServices.deleteRealtor(id);
			toastSuccess('Asesor Eliminado Exitosamente');
			getRealtors();
		} catch (error) {
			toastError('Error al Eliminar Asesor');
		}
	};

	if (loading) return <Preloader />;

	return (
		<React.Fragment>
			<Content>
				<ContentHead
					title="Lista de Asesores"
					onClick={() => setModalAdd(true)}
				/>
				<div className="table-list mb-3">
					<div className="table-item table-head">
						<div className="table-col">
							<span className="table-text">Asesor</span>
						</div>
						<div className="table-col table-col-md">
							<span className="table-text">Rol</span>
						</div>
						<div className="table-col">
							<span className="table-text">Telefono</span>
						</div>
						<div className="table-col">
							<span className="table-text">Telefono Whatsapp</span>
						</div>
						<div className="table-col">
							<span className="table-text">Estado</span>
						</div>
						<div className="table-col"></div>
					</div>
					{
						realtors.length
							? realtors.map((item: any, index: number) => (
								<div className="table-item" key={index}>
									<div className="table-col">
										<a className="table-user">
											<div className="table-user-avatar">
												<span>{findFirstLetter(item.name)}</span>
											</div>
											<div className="table-user-info">
												<span className="table-lead">{item.name} {item.lastName}</span>
												<span>{item.email}</span>
											</div>
										</a>
									</div>
									<div className="table-col table-col-mb">
										<span className="table-text">{item.rol?.name === 'REALTOR ADMIN' ? 'Asesor' : ''}</span>
									</div>
									<div className="table-col">
										<span className="table-text">{item.contactPhone || '+584454548'}</span>
									</div>
									<div className="table-col">
										<span className="table-text">{item.whatsappPhone || '+584454548'}</span>
									</div>
									<div className="table-col">
										<Badge variant="success"  label="Activo"/>
									</div>
									<div className="table-col table-col-mb">
										<span className="table-icon table-edit-icon" onClick={() => onEdit(item)}>
											<BiPencil size={24} />
										</span>
										<span className="table-icon table-delete-icon" onClick={() => onDelete(item.id)}>
											<BiTrash size={24} />
										</span>
									</div>
								</div>
							))
							: null
					}
				</div>
			</Content>
			<AddRealtors modal={modalAdd} setModal={setModalAdd}/>
			<EditRealtors modal={modalEdit} setModal={setModalEdit} editData={editData}/>
			<ToastContainer />
		</React.Fragment>
	);
};

export default Realtors;
