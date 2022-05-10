import React, { useState } from 'react';
import {
	BiMap,
	BiHotel,
	BiBath,
	BiCar,
	BiFilterAlt,
	BiListUl,
	BiSquare,
	BiGrid,
	BiGridAlt,
} from 'react-icons/bi';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useNavigate } from 'react-router-dom';

import Button from 'components/Button';
import Input from 'components/Input';
import Select from 'components/Select';
import Property from 'components/Property';
import { ISelect } from 'interfaces';
import styles from './styles.module.scss';

import PropertiesServices from 'services/propertiesServices';
import Features from './features/index';
// Operation Options
const operationOptions = [
	{
		label: 'Tipo de Operacion',
		value: 'publicada',
	},
];

const propertyOptions = [
	{
		label: 'Tipo de Propiedad',
		value: 'publicada',
	},
];

const regionOptions = [
	{
		label: 'Region',
		value: 'publicada',
	},
];

const comunaOptions = [
	{
		label: 'Comuna',
		value: 'publicada',
	},
];

const monedaOptions = [
	{
		label: 'Tipo de Moneda',
		value: 'publicada',
	},
];

const dormitoriosOptions = [
	{
		label: 'Dormitorios',
		value: 'publicada',
	},
];

const banosOptions = [
	{
		label: 'Banos',
		value: 'publicada',
	},
];

const Properties = () => {
	const navigate = useNavigate();
	const [openSelectStatus, setOpenSelectStatus] = useState<boolean>(false);
	const [openSelectPage, setOpenSelectPage] = useState<boolean>(false);
	const [operation, setOperation] = useState<ISelect>(operationOptions[0]);
	const [comuna, setComuna] = useState<ISelect>(comunaOptions[0]);
	const [property, setProperty] = useState<ISelect>(propertyOptions[0]);
	const [region, setRegion] = useState<ISelect>(regionOptions[0]);
	const [dormitorios, setDormitorios] = useState<ISelect>(
		dormitoriosOptions[0]
	);
	const [moneda, setMoneda] = useState<ISelect>(monedaOptions[0]);
	const [banos, setBanos] = useState<ISelect>(banosOptions[0]);
	const { data, isLoading, isError } = useQuery(
		['properties', ''],
		PropertiesServices.getProperties
	);
	const queryClient = useQueryClient();
	const handleOpenStatus = () => setOpenSelectStatus(true);
	const handleOpenPage = () => setOpenSelectPage(true);

	return (
		<div className={styles.properties}>
			<Tabs className="tabs">
				<TabList>
					<Tab>Propiedades</Tab>
					<Tab>Borradores</Tab>
					<Tab>Caracteristicas</Tab>
				</TabList>
				<TabPanel>
					<div className={styles['properties-wrapper']}>
						<div className={styles['properties-top']}>
							<div>
								<h2 className={styles['properties-title']}>Mis Propiedades</h2>
								<p className={styles['properties-total']}>10 Total</p>
							</div>
							<Button onClick={() => navigate(`/add-property`)}>
								Agregar Propiedad
							</Button>
						</div>
						<div className={styles['properties-search']}>
							<div className={styles['properties-column']}>
								<Input placeholder="Buscar..." search />
							</div>
							<div className={styles['properties-toggle']}>
								<BiGridAlt />
							</div>
							<div className={styles['properties-toggle']}>
								<BiListUl />
							</div>
						</div>
						<div className={styles['properties-filter']}>
							<div className={styles['properties-column']}>
								<Select
									options={operationOptions}
									selectedOption={operation}
									setSelectedOption={setOperation}
									open={openSelectStatus}
									setOpen={setOpenSelectStatus}
									handleOpenSelect={handleOpenStatus}
								/>
							</div>
							<div className={styles['properties-column']}>
								<Select
									options={propertyOptions}
									selectedOption={property}
									setSelectedOption={setProperty}
									open={openSelectStatus}
									setOpen={setOpenSelectStatus}
									handleOpenSelect={handleOpenStatus}
								/>
							</div>
							<div className={styles['properties-column']}>
								<Select
									options={regionOptions}
									selectedOption={region}
									setSelectedOption={setRegion}
									open={openSelectStatus}
									setOpen={setOpenSelectStatus}
									handleOpenSelect={handleOpenStatus}
								/>
							</div>
							<div className={styles['properties-column']}>
								<Select
									options={comunaOptions}
									selectedOption={comuna}
									setSelectedOption={setComuna}
									open={openSelectStatus}
									setOpen={setOpenSelectStatus}
									handleOpenSelect={handleOpenStatus}
								/>
							</div>
							<div className={styles['properties-column']}>
								<Select
									options={monedaOptions}
									selectedOption={moneda}
									setSelectedOption={setMoneda}
									open={openSelectStatus}
									setOpen={setOpenSelectStatus}
									handleOpenSelect={handleOpenStatus}
								/>
							</div>
							<div className={styles['properties-prices']}>
								<Input placeholder="Precio min..." />
								<Input placeholder="Precio max..." />
							</div>
							<div className={styles['properties-column']}>
								<Select
									options={dormitoriosOptions}
									selectedOption={dormitorios}
									setSelectedOption={setDormitorios}
									open={openSelectStatus}
									setOpen={setOpenSelectStatus}
									handleOpenSelect={handleOpenStatus}
								/>
							</div>
							<div className={styles['properties-column']}>
								<Select
									options={banosOptions}
									selectedOption={banos}
									setSelectedOption={setBanos}
									open={openSelectStatus}
									setOpen={setOpenSelectStatus}
									handleOpenSelect={handleOpenStatus}
								/>
							</div>
						</div>
						<div className={styles['properties-items']}>
							{data?.data?.map((property: any, index: number) => (
								<Property key={index} property={property} />
							))}
						</div>
					</div>
				</TabPanel>
				<TabPanel>Borradores</TabPanel>
				<TabPanel>
					<Features />
				</TabPanel>
			</Tabs>
		</div>
	);
};

export default Properties;
