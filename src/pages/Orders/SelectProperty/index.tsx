import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useQuery } from 'react-query';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useDebounce } from 'use-debounce';

import Button from "components/Button";
import Modal from "components/Modal";
import Input from "components/Input";
import Property from "../Property";

import styles from "./styles.module.scss";
import {SelectPropertyProps} from "./types";
import PropertiesServices from 'services/propertiesServices';

const SelectProperty:React.FC<SelectPropertyProps> = ({setOpenModal, openModal}) => {
	const [search, setSearch] = useState("");
	const [loading, setLoading] = useState(false);
	const [selected, setSelectd] = useState({});
	const [compareCode, setCompareCode] = useState();
	const debouncedFilter = useDebounce(search, 500);
	const { data } = useQuery(["properties", debouncedFilter[0]], PropertiesServices.getProperties, { enabled: Boolean(debouncedFilter[0]) });
	const [properties, setProperties] = useState([]);

	const searchProperty = (e: any) => {
		setSearch(e.target.value);
	};

	const handeleSearch = () => {
		setLoading(true);
		setProperties(data?.data);
		setTimeout(() => {
			return setLoading(false);
		}, 3000);
	};

	const handleSelectProperty = (property: any) => {
		setSelectd(property);
		setCompareCode(property.code);
	};

	return (
		<Modal openModal={openModal} setOpenModal={setOpenModal} title="Seleccionar propiedades" size="large">
			<div className={styles['select-property']}>
				<div className={styles['select-property-top']}>
					<div className={styles['search-property']}>
						<Input
							placeholder="Que titulo o ocodigo de propeidad buscas?"
							onChange={searchProperty}
							search
							handeleSearch={handeleSearch}
						/>
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
					{
						loading
							?
							<SkeletonTheme
								baseColor="#E8F6FC"
								highlightColor="#DDF4FF"
								borderRadius={10}
							>
								<div className={styles['property-skeleton']}>
									<Skeleton width="100px" height="100px" />
									<Skeleton width="100%" height="100px" />
								</div>
							</SkeletonTheme>
							:
							properties && properties?.map((property: any, index: number) => (
								<Property
									key={index}
									property={property}
									compareCode={compareCode}
									handleSelectProperty={() => handleSelectProperty(property)}
								/>
							))
					}
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
