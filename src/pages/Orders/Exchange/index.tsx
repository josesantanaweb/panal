import React, { useEffect, useState } from 'react';
import { Button, Search, Modal } from 'components';
import Properties from './Properties';
import List from './List';

export interface CanjeProps {
	modalCanje: boolean;
	setModalCanje: any;
}

const Exchange: React.FC<CanjeProps> = ({ modalCanje, setModalCanje }) => {
	const [tab, setTab] = useState(1);

	return (
		<Modal
			modal={modalCanje}
			setModal={setModalCanje}
			size="lg"
			outside={false}
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
							<Properties />
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

export default Exchange;
