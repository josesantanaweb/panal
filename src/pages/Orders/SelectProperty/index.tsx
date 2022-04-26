import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import Button from "components/Button";
import Modal from "components/Modal";
import Input from "components/Input";
import Property from "../Property";

import styles from "./styles.module.scss";
import {SelectPropertyProps} from "./types";
import PropertiesServices from 'services/propertiesServices';

const SelectProperty:React.FC<SelectPropertyProps> = ({setOpenModal, openModal}) => {
	const { data: properties, isLoading, isError } = useQuery('properties', PropertiesServices.getProperties);
	return (
		<Modal openModal={openModal} setOpenModal={setOpenModal} title="Seleccionar propiedades" size="large">
			<div className={styles['select-property']}>
				<div className={styles['select-property-top']}>
					<div className={styles['search-property']}>
						<Input placeholder="Que titulo o ocodigo de propeidad buscas?"/>
					</div>
				</div>
				<div className={styles['select-property-label']}>
					<p>Filtrar por categoria:</p>
				</div>
				<div className={styles['select-property-filter']}>
					<Button>Mi Cartera</Button>
					<Button>Empresa</Button>
					<Button>Cartera abierta</Button>
					<Button>Cartera Broker</Button>
				</div>
				<div className={styles['select-property-items']}>
        	{properties?.data?.map((property: any, index: number) => (
						<Property key={index} property={property}/>
					))}
				</div>
				<div className={styles['select-property-footer']}>
					<Button variant='secondary'>Siguiente</Button>
				</div>
			</div>
			<ToastContainer />
		</Modal>
	);

};

export default SelectProperty;
