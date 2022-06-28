import React, { useState, useEffect } from 'react';
import Content from 'layout/Content';
import { Button, Preloader } from 'components';
import ContentHead from 'layout/ContentHead';
import Property from './Property';
import Detail from './Detail';
import useProperties from 'hooks/useProperties';

const Properties = () => {
	const [tab, setTab] = useState(1);
	const { properties, getProperties, loading, setProperty }: any =
		useProperties();
	const [modalDetail, setModalDetail] = useState(false);

	useEffect(() => {
		getProperties();
	}, []);

	if (loading) return <Preloader />;

	const handleDetail = (property: any) => {
		setModalDetail(true);
		setProperty(property);
	};

	return (
		<React.Fragment>
			<Content>
				<div className="tabs">
					<div className="tabs-head">
						<div className="tabs-nav">
							<li
								className={tab === 1 ? 'is-active' : ''}
								onClick={() => setTab(1)}>
								Propiedades
							</li>
							<li
								className={tab === 2 ? 'is-active' : ''}
								onClick={() => setTab(2)}>
								Borradores
							</li>
							<li>Caracteristicas</li>
						</div>
					</div>
					<div className="tabs-content">
						<div className="tabs-item" hidden={tab != 1}>
							<ContentHead
								title="Lista de Propiedades"
								onClick={() => console.log('Agregar Propiedad')}
								btnText="Agregar"
							/>
							<div className="properties">
								<div className="properties-items">
									{properties.length
										? properties.map((property: any, index: number) => (
												<Property
													key={index}
													property={property}
													setModalDetail={() => handleDetail(property)}
												/>
										  ))
										: null}
								</div>
							</div>
						</div>
						<div className="tabs-item" hidden={tab != 2}>
							borradores
						</div>
					</div>
				</div>
				<Detail modal={modalDetail} setModal={setModalDetail} />
			</Content>
		</React.Fragment>
	);
};

export default Properties;
