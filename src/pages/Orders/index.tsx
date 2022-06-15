import React, { useState, useEffect } from 'react';
import { BiTrash, BiHomeSmile, BiSpreadsheet } from 'react-icons/bi';
import moment from 'moment';
import 'moment-timezone';
import Content from 'layout/Content';
import { ToastContainer } from 'react-toastify';
import ContentHead from 'layout/ContentHead';
import useOrders from 'hooks/useOrders';
import { Badge, Preloader, Modal } from 'components';
import { findFirstLetter } from 'utils';
import { toastError, toastSuccess } from 'utils/libs/toast';
import OrdersServices from 'services/ordersService';
import Selection from './Selection';
import Generate from './Generate';
import SendEmail from './SendEmail';
import Canje from './Canje';

const Orders = () => {
	const { orders, loading, getOrders }:any = useOrders();
	const [modal, setModal] = useState(false);
	const [modalCanje, setModalCanje] = useState(false);
	const [selection, setSelection] = useState(true);
	const [generate, setGenerate] = useState(false);
	const [sendEmail, setSendEmail] = useState(false);
	const [property, setProperty] = useState<any>({});
	const [orderId, setOrderId] = useState(1);

	useEffect(() => {
		getOrders();
	}, []);

	const onDelete = async (id: number) => {
		try {
			await OrdersServices.deleteOrder(id);
			toastSuccess('Orden Eliminada Exitosamente');
			getOrders();
		} catch (error) {
			toastError('Error al Eliminar Orden');
		}
	};

	if (loading) return <Preloader />;

	return (
		<React.Fragment>
			<Content>
				<ContentHead
					title="Lista de Ordenes"
					onClick={() => setModal(true)}
				/>
        	<div className="table-list mb-3">
					<div className="table-item table-head">
						<div className="table-col">
							<span className="table-text">Cliente</span>
						</div>
						<div className="table-col">
							<span className="table-text">Ejecutivo/a</span>
						</div>
						<div className="table-col">
							<span className="table-text">Fecha y Hora</span>
						</div>
						<div className="table-col">
							<span className="table-text">Estado</span>
						</div>
						<div className="table-col">
							<span className="table-text">Canje</span>
						</div>
						<div className="table-col"></div>
					</div>
					{
						orders.length
							? orders.map((item: any, index: number) => (
								<div className="table-item" key={index}>
									<div className="table-col">
										<a className="table-user">
											<div className="table-user-avatar">
												<span>{findFirstLetter(item.customer.name)}</span>
											</div>
											<div className="table-user-info">
												<span className="table-lead">{item.customer.name} {item.customer.lastName}</span>
												<span>{item.email}</span>
											</div>
										</a>
									</div>
									<div className="table-col">
										{item.realtor.name} {item.realtor.lastName}
									</div>
									<div className="table-col table-col-mb">
										<span className="table-text">
											{moment(item.dateTimeOfVisits).format(
												'MMMM Do YYYY, h:mm:ss a'
											)}
										</span>
									</div>
									<div className="table-col">
										<Badge variant="success"  label="Activo"/>
									</div>
									<div className="table-col">
										<span onClick={() => setModalCanje(true)} style={{cursor: 'pointer'}}>
											<BiHomeSmile size={24} />
										</span>
									</div>
									<div className="table-col table-col-mb">
										<span className="table-icon">
											<BiSpreadsheet size={24} />
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
			<Modal
				modal={modal}
				setModal={setModal}
				size={selection ? 'lg' : 'md'}
				title={generate ? 'Generar Orden' : sendEmail ? 'Enviar Email' : 'Seleccionar Propiedad/es'}>
				{
					selection &&
					<Selection
						setProperty={setProperty}
						setGenerate={setGenerate}
						setSelection={setSelection}
					/>
				}
				{
					generate &&
          <Generate
          	property={property}
          	setGenerate={setGenerate}
          	setSendEmail={setSendEmail}
          	setOrderId={setOrderId}
          />
				}
				{
					sendEmail &&
          <SendEmail
          	orderId={orderId}
          	setModal={setModal}
          />
				}
			</Modal>
			<Canje modalCanje={modalCanje} setModalCanje={setModalCanje}/>
			<ToastContainer />
		</React.Fragment>
	);
};

export default Orders;
