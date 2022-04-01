import React, {useState} from 'react';
import { useQuery } from 'react-query';
import 'react-toastify/dist/ReactToastify.css';

import Select from "components/Select";
import Input from "components/Input";

import { ISelect } from "interfaces";
import styles from "./styles.module.scss";
import SupportServices from 'services/supportServices';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const pageOptions = [
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

const Support = () => {
	const [page, setPage] = useState<ISelect>(pageOptions[0]);
	const [openSelectPage, setOpenSelectPage] = useState<boolean>(false);
	const { data, isLoading, isError } = useQuery('support', SupportServices.getSupports);

	const handleOpenPage = () => setOpenSelectPage(true);

	return (
		<div className={styles.support}>
			<div className={styles["support-top"]}>
				<h2 className={styles["support-title"]}>Listado de Tickets</h2>
			</div>
			<div className={styles["support-filter"]}>
				<div>
					<Select
						options={pageOptions}
						selectedOption={page}
						setSelectedOption={setPage}
						open={openSelectPage}
						setOpen={setOpenSelectPage}
						handleOpenSelect={handleOpenPage}
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
						<div className={styles["table-container"]}>
							<table className={styles.table}>
								<thead>
									<tr className={styles["table-head"]}>
										<th>#</th>
										<th>Nombre</th>
										<th>Email</th>
										<th>Tipo</th>
										<th>Mensaje</th>
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
															<Skeleton width="100px" height="20px" />
														</td>
														<td style={{width: '400px'}}>
															<Skeleton width="400px" height="20px" />
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
											{data?.data?.map((support: any, index: number) => (
												<tr key={index}>
													<td>{index + 1}</td>
													<td>
														{support.name}
													</td>
													<td>
														{support.email}
													</td>
													<td>
														{support.type}
													</td>
													<td>
														{support.message}
													</td>
												</tr>
											))}
										</tbody>
								}
							</table>
						</div>
				}
			</div>
		</div>
	);
};

export default Support;
