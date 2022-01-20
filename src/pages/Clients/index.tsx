import React, {useState} from 'react';
import {BiEdit, BiListUl, BiTrashAlt} from "react-icons/bi";
import { useQuery } from 'react-query';

import Button from "components/Button";
import Select from "components/Select";
import Input from "components/Input";
import AddCustomers from "./components/AddCustomers";

import { ISelect } from "interfaces";
import styles from "./styles.module.scss";
import CustomersServices from 'services/customersServices';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const limitOptions = [
	{
		label: 10,
		value: 10,
	},
	{
		label: 20,
		value: 20,
	},
	{
		label: 30,
		value: 30,
	}
];

const skeleton = [0,1,2,3];

const Customers = () => {
	const [limit, setLimit] = useState(limitOptions[0]);
	const { data, isLoading, isError } = useQuery(["customers", limit.value], CustomersServices.getCustomers);
	const [openSelectLimit, setOpenSelectLimit] = useState<boolean>(false);
	const [openModal, setOpenModal] = useState<boolean>(false);

	// Handle Open limit select
	const handleOpenLimit = () => setOpenSelectLimit(true);

	// Handle Add Customers
	const handleAddCustomers = () => setOpenModal(true);

	return (
		<div className={styles.customers}>
			<div className={styles["customers-top"]}>
				<h2 className={styles["customers-title"]}>Listado de Clientes</h2>
				<Button onClick={handleAddCustomers}>Agregar Cliente</Button>
			</div>
			<div className={styles["customers-filter"]}>
				<div>
					<Select
						options={limitOptions}
						selectedOption={limit}
						setSelectedOption={setLimit}
						open={openSelectLimit}
						setOpen={setOpenSelectLimit}
						handleOpenSelect={handleOpenLimit}
					/>
				</div>
				<div>
					<Input placeholder="Buscar..." search/>
				</div>
			</div>
			<div className={styles.content}>
				{
					isError
						?
						<div className={styles["table-error"]}>Hubo un error!</div>
						:
						<table className={styles.table}>
							<thead>
								<tr className={styles["table-head"]}>
									<th>#</th>
									<th>Cliente</th>
									<th>Ejecutivo</th>
									<th>Estado</th>
									<th>Tipo</th>
									<th>Bitacora</th>
									<th>Acciones</th>
								</tr>
							</thead>
							{
								isLoading
									?
									<tbody className={styles["table-body"]}>
            	<SkeletonTheme
            		baseColor="#E8F6FC"
            		highlightColor="#DDF4FF"
            		borderRadius={2}
            	>
            		{skeleton.map((item: any, index: number) => (
            			<tr key={index}>
            				<td>
            					<Skeleton width="30px" height="20px" />
            				</td>
            				<td style={{width: '300px'}}>
            					<span className={styles["table-user"]}>
            						<Skeleton width="100px" height="20px" />
            					</span>
            				</td>
            				<td style={{width: '300px'}}>
            					<span className={styles["table-user"]}>
            						<Skeleton width="100px" height="20px" />
            					</span>
            				</td>
            				<td>
            					<Skeleton width="100px" height="20px" />
            				</td>
            				<td style={{width: '200px'}}>
            					<Skeleton width="200px" height="20px" />
            				</td>
            				<td>
            					<Skeleton width="100px" height="20px" />
            				</td>
            				<td>
            					<Skeleton width="100px" height="20px" />
            				</td>
            			</tr>
            		))}
            	</SkeletonTheme>
									</tbody>
									:
									<tbody className={styles["table-body"]}>
										{data?.data?.map((client: any, index: number) => (
											<tr key={index}>
												<td>{index + 1}</td>
												<td style={{width: '300px'}}>
													{client.name} {client.lastName}
												</td>
												<td style={{width: '300px'}}>
													{client.createdByRealtor.name} {client.createdByRealtor.lastName}
												</td>
												<td>
													<span className={`${styles["table-status"]} ${styles.admin}`}>{client.status.name}</span>
												</td>
												<td style={{width: '300px'}}>Casa</td>
												<td style={{width: '200px'}}>
													<span className={styles["table-bitacora"]}><BiListUl/></span>
												</td>
												<td>
													<div className={styles["table-action"]}>
														<span className={styles["table-edit"]}><BiEdit/></span>
														<span className={styles["table-delete"]}><BiTrashAlt/></span>
													</div>
												</td>
											</tr>
										))}
									</tbody>
							}
						</table>
				}
			</div>
			<AddCustomers openModal={openModal} setOpenModal={setOpenModal} />
		</div>
	);
};

export default Customers;
