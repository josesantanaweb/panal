import React, { useState, useEffect } from 'react';
import { BiPencil, BiTrash, BiSpreadsheet } from 'react-icons/bi';
import { ToastContainer } from 'react-toastify';
import { Preloader, Badge, Search, Select } from 'components';
import Content from 'layout/Content';
import ContentHead from 'layout/ContentHead';
import AddCustomersFind from './Add';
// import EditCustomers from './Edit';
import Bitacora from './Bitacora';
import { toastError, toastSuccess } from 'utils/libs/toast';
import { findFirstLetter } from 'utils';
import CustomersFindServices from 'services/CustomersFindService';
import useCustomersFind from 'hooks/useCustomersFind';
import useShared from 'hooks/useShared';

const CustomerFindList: React.FC = () => {
	const [modalAdd, setModalAdd] = useState(false);
	const [modalEdit, setModalEdit] = useState(false);
	const [modalBitacora, setModalBitacora] = useState(false);
	const [editData, setEditData] = useState({});
	const [history, setHistory] = useState([]);

	const { customersFind, loading, getCustomersFind }: any = useCustomersFind();
	const { getDocuments, getOperations, getPropertyTypes }: any = useShared();

	useEffect(() => {
		getCustomersFind();
	}, []);

	useEffect(() => {
		getDocuments();
	}, []);

	useEffect(() => {
		getOperations();
	}, []);

	useEffect(() => {
		getPropertyTypes();
	}, []);

	const onEdit = async (item: any) => {
		setEditData(item);
		setModalEdit(true);
	};

	const onDelete = async (id: number) => {
		try {
			await CustomersFindServices.deleteCustomer(id);
			toastSuccess('Cliente Eliminado Exitosamente');
			getCustomersFind();
		} catch (error) {
			toastError('Error al Eliminar Cliente');
		}
	};

	if (loading) return <Preloader />;

	const searchCustomer = async (e: any) => {
		getCustomersFind(e.target.value);
	};

	const onBitacora = async (id: number) => {
		const response = await CustomersFindServices.getCustomerHistory(id);
		setHistory(response.data.data);
		setModalBitacora(true);
	};

	const { documentSelected, setDocumentSelected, documents }: any = useShared();

	const onSubmit = async (values: any, { resetForm }: any) => {
		const formData = {
			...values,
			identityDocumentId: documentSelected.value,
		};
		try {
			await CustomersFindServices.addCustomerFind(formData);
			toastSuccess('Cliente Guardado Exitosamente');
			getCustomersFind();
			resetForm();
			// setTimeout(() => {
			// 	setModal(false);
			// }, 1500);
		} catch (error) {
			toastError('Error al Crear Cliente');
		}
	};

	return (
		<React.Fragment>
			<Content>
				<ContentHead
					title="Lista Cliente Busca"
					onClick={() => setModalAdd(true)}
					btnText="Generar cliente"
				/>
				<div className="row mb-4">
					<div className="col-md-2">
						<Select
							label="Filtrar búsqueda"
							options={documents}
							setSelected={setDocumentSelected}
							selected={documentSelected}
						/>
					</div>
					<div className="col-md-3 mt-3">
						<div className="search-customer">
							<Search placeholder="Buscar Cliente" onChange={searchCustomer} />
						</div>
					</div>
				</div>
				<div className="table-list mb-3">
					<div className="table-item table-head">
						<div className="table-col">
							<span className="table-text">Cliente</span>
						</div>
						<div className="table-col">
							<span className="table-text">Ejecutivo</span>
						</div>
						<div className="table-col">
							<span className="table-text">Estado</span>
						</div>
						<div className="table-col">
							<span className="table-text">Tipo</span>
						</div>
						<div className="table-col">
							<span className="table-text">Canje</span>
						</div>
						<div className="table-col">
							<span className="table-text">Acciones</span>
						</div>
					</div>
					{customersFind.length
						? customersFind.map((item: any, index: number) => (
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
										<span className="table-text">
											{item.createdByRealtor?.name}{' '}
											{item.createdByRealtor?.lastName}
										</span>
									</div>
									<div className="table-col">
										<span className="table-text">
											{item.phone || '+584454548'}
										</span>
									</div>
									<div className="table-col">
										<span
											onClick={() => onBitacora(item.id)}
											style={{ cursor: 'pointer' }}>
											<BiSpreadsheet size={24} />
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
			<AddCustomersFind modal={modalAdd} setModal={setModalAdd} />
			{/* <EditCustomers
				modal={modalEdit}
				setModal={setModalEdit}
				editData={editData}
			/> */}
			<Bitacora
				modal={modalBitacora}
				setModal={setModalBitacora}
				history={history}
			/>
			<ToastContainer />
		</React.Fragment>
	);
};

export default CustomerFindList;
