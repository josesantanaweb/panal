import React from 'react';
import { Modal } from 'components';
import moment from 'moment';
import 'moment-timezone';
import { findFirstLetter } from 'utils';

export interface BitacoraProps {
  modal: boolean;
	setModal: any;
	history: any;
}

const Bitacora:React.FC<BitacoraProps> = ({modal, setModal, history}) => {

	return (
		<Modal
			modal={modal}
			setModal={setModal}
			title="Bitacora del Cliente">
			<div className="row mb-4">
				<div className="col-md-6">
					<h3>Información del cliente</h3>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-md-6">
					<div className="binnacle-user">
						<div className="binnacle-avatar">
							<span>{findFirstLetter('Jose')}</span>
						</div>
						<div className="binnacle-info">
							<p>Jonh Doe</p>
							<span>jonh@gmail.com</span>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
						<div className="binnacle-property">
							{
								history.length &&
                history.map((item: any, index: number) => (
                	<div className="binnacle-item" key={index}>
                		<div>
                			<i className="binnacle-mark"></i>
                			<p>{item.customer.name} {item.customer.lastName}
                				<span>
                					{moment(item.entryDate).format(
                						'MMMM Do YYYY, h:mm:ss a'
                					)}
                				</span>
                			</p>
                		</div>
                		<li><b>Emisión de orden de visita</b> n° 12.412</li>
                		<li><b>Enviada a:</b> Juanito.perez@gmail.com</li>
                		<li><b>Asunto: </b>{item.action}</li>
                		{
                			item.customer?.visits[0]?.property?.address?.address &&
                      <li><b>Dirección Propiedad:</b> {item.customer?.visits[0]?.property?.address?.address}</li>
                		}
                	</div>
                ))
							}
						</div>
					</div>
				</div>
			</div>
  	</Modal>
	);
};

export default Bitacora;
