import React, {useState, useEffect} from 'react';
import Content from 'layout/Content';
import { Button, Preloader, Search } from 'components';
import ContentHead from 'layout/ContentHead';
import Property from './Property';
import Detail from './Detail';
import useProperties from 'hooks/useProperties';

const Properties = () => {
	const [tab, setTab] = useState(1);
	const [title, setTitle] = useState('');
	const [bathrooms, setBathrooms] = useState('');
	const [bedrooms, setBedrooms] = useState('');
	const { properties, getProperties, loading, setProperty }:any = useProperties();
	const [modalDetail, setModalDetail] = useState(false);

	useEffect(() => {
		getProperties(`titleOrId=${title}&bathrooms=${bathrooms}&bedrooms=${bedrooms}`);
	}, [title, bathrooms, bedrooms]);

	if (loading) return <Preloader />;

	const handleDetail = (property: any) => {
		setModalDetail(true);
		setProperty(property);
	};

	const searchTiitle =  async (e: any) => setTitle(e.target.value);

	const searchBathrooms =  async (e: any) => setBathrooms(e.target.value);

	const searchBedrooms =  async (e: any) => setBedrooms(e.target.value);

	return (
		<React.Fragment>
			<Content>
				<div className="tabs">
					<div className="tabs-head">
						<div className="tabs-nav">
							<li className={tab === 1 ? 'is-active' : ''} onClick={() => setTab(1)}>Propiedades</li>
							<li className={tab === 2 ? 'is-active' : ''} onClick={() => setTab(2)}>Borradores</li>
							<li>Caracteristicas</li>
						</div>
					</div>
					<div className="tabs-content">
						<div className="tabs-item" hidden={tab != 1}>
							<ContentHead
								title="Lista de Propiedades"
								// onClick={() => console.log('Agregar Propiedad')}
							/>
							<div className="row mb-4">
								<div className="col-md-3">
									<div className="search-customer">
										<Search
											iconSeach
											placeholder="Buscar Propiedades"
											onChange={searchTiitle}
										/>
									</div>
								</div>
							</div>
							<div className="row mb-4">
								<div className="col-md-3">
									<div className="search-customer">
										<Search
											placeholder="Baños"
											onChange={searchBathrooms}
										/>
									</div>
								</div>
								<div className="col-md-3">
									<div className="search-customer">
										<Search
											placeholder="Habitaciones"
											onChange={searchBedrooms}
										/>
									</div>
								</div>
							</div>
							<div className="properties">
								<div className="properties-items">
									{
										properties.length
											? properties.map((property: any, index: number) => (
												<Property key={index} property={property} setModalDetail={() => handleDetail(property)}/>
											))
											: null
									}
								</div>
							</div>
						</div>
						<div className="tabs-item" hidden={tab != 2}>
              borradores
						</div>
					</div>
				</div>
				<Detail modal={modalDetail} setModal={setModalDetail}/>
			</Content>
		</React.Fragment>
	);
};

export default Properties;
