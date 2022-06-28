import React, { useEffect, useState } from 'react';
import { Button, Search, Modal } from 'components';
import useProperties from 'hooks/useProperties';
import { BiFilter } from 'react-icons/bi';
import Properties from './Properties';
import List from './List';

export interface CanjeProps {
	modalCanje: boolean;
	setModalCanje: any;
	property: any;
}

const Canje: React.FC<CanjeProps> = ({
	modalCanje,
	setModalCanje,
	property
}) => {
	const [tab, setTab] = useState(1);

	return (
		<Modal
			modal={modalCanje}
			setModal={setModalCanje}
			size="lg"
			title="Propiedes en canje">
			<div className="modal-scroll">
				<div className="tabs">
					<div className="tabs-head" style={{ padding: '2rem 0rem' }}>
						<div className="tabs-nav">
							<li
								className={tab === 1 ? 'is-active' : ''}
								onClick={() => setTab(1)}>
								Propiedades
							</li>
							<li
								className={tab === 2 ? 'is-active' : ''}
								onClick={() => setTab(2)}>
								Listado
							</li>
						</div>
					</div>
					<div className="tabs-content">
						<div className="tabs-item" hidden={tab != 1}>
							<Properties orderProperty={property} />
						</div>
						<div className="tabs-item" hidden={tab != 2}>
							<List />
						</div>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default Canje;
