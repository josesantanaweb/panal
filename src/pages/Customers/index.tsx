import React, { useState, useEffect } from 'react';
import { BiPencil, BiTrash, BiSpreadsheet } from 'react-icons/bi';
import { ToastContainer } from 'react-toastify';
import { Preloader, Badge, Search } from 'components';
import Content from 'layout/Content';
import ContentHead from 'layout/ContentHead';
import AddCustomers from './Add';
import EditCustomers from './Edit';
import Bitacora from './Bitacora';
import { toastError, toastSuccess } from 'utils/libs/toast';
import { findFirstLetter } from 'utils';
import CustomersServices from 'services/customersService';
import useCustomers from 'hooks/useCustomers';
import useShared from 'hooks/useShared';

const Customers: React.FC = () => {
	const [modalAdd, setModalAdd] = useState(false);
	const [modalEdit, setModalEdit] = useState(false);
	const [modalBitacora, setModalBitacora] = useState(false);
	const [editData, setEditData] = useState({});
	const [history, setHistory] = useState([]);

	const { customers, loading, getCustomers }:any = useCustomers();
	const { getDocuments }:any = useShared();

	useEffect(() => {
		getCustomers();
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
			await CustomersServices.deleteCustomer(id);
			toastSuccess('Cliente Eliminado Exitosamente');
			getCustomers();
		} catch (error) {
			toastError('Error al Eliminar Cliente');
		}
	};

	if (loading) return <Preloader />;

	const searchCustomer =  async (e: any) => {
		getCustomers(e.target.value);
	};

	const onBitacora =  async (id: number) => {
		const response = await CustomersServices.getCustomerHistory(id);
		setHistory(response.data.data);
		setModalBitacora(true);
	};

	return (
		<React.Fragment>
			<Content>
				<ContentHead
					title="Lista de Clientes"
					onClick={() => setModalAdd(true)}
				/>
				<div className="row mb-4">
					<div className="col-md-2">
						<div className="search-customer">
							<Search
								placeholder="Buscar Cliente"
								onChange={searchCustomer}
							/>
						</div>
					</div>
				</div>
				<div className="table-list mb-3">
					<div className="table-item table-head">
						<div className="table-col">
							<span className="table-text">Direccion Propiedad</span>
						</div>
						<div className="table-col">
							<span className="table-text">Cliente Propietario</span>
						</div>
						<div className="table-col center">
							<span className="table-text">Estado</span>
						</div>
						<div className="table-col center">
							<span className="table-text">Tipo de Operacion</span>
						</div>
						<div className="table-col center">
							<span className="table-text">Oportunidad de canje</span>
						</div>
						<div className="table-col center">
							<span className="table-text">Bitacora</span>
						</div>
						<div className="table-col"></div>
					</div>
					{
						customers.length
							? customers.map((item: any, index: number) => (
								<div className="table-item" key={index}>
									<div className="table-col">
										<span className="table-text">{item.address}</span>
									</div>
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
									<div className="table-col center">
										<Badge variant="success"  label="Activo"/>
									</div>
									<div className="table-col center">
										<Badge variant="danger"  label="Arriendo"/>
									</div>
									<div className="table-col center">
										<span className="table-text">22</span>
									</div>
									<div className="table-col center">
										<span onClick={() => onBitacora(item.id)} style={{'cursor': 'pointer'}}>
											<BiSpreadsheet size={24} />
										</span>
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
			<AddCustomers modal={modalAdd} setModal={setModalAdd}/>
			<EditCustomers modal={modalEdit} setModal={setModalEdit} editData={editData}/>
			<Bitacora modal={modalBitacora} setModal={setModalBitacora} history={history}/>
			<ToastContainer />
		</React.Fragment>
	);
};

export default Customers;
