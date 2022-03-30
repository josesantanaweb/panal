import React from "react";
import { BiCog, BiCreditCard } from "react-icons/bi";
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import styles from "./styles.module.scss";

import CompanyServices from 'services/companyServices';
import AddCompany from './AddCompany';
import EditCompany from './EditCompany';

const Company= () => {
	const { data, isLoading, isError } = useQuery(["companies"], CompanyServices.getCompanies);
	const queryClient = useQueryClient();

	return (
		<div className={styles.business}>
			<div className={styles["business-top"]}>
				<div className={styles["business-avatar"]}>{data?.name?.charAt(0).toUpperCase() ? data?.name?.charAt(0).toUpperCase() : 'M'}</div>
				<div className={styles["business-name"]}>
					<p>Empresa</p>
					<h5>{data?.name}</h5>
				</div>
			</div>
			<div className={styles["business-tabs"]}>
				<div className={styles["business-tabs-items"]}>
					<div className={`${styles["business-tab"]} ${styles.active}`}>
						<BiCog/>
						<h5>General</h5>
					</div>
					<div className={styles["business-tab"]}>
						<BiCreditCard/>
						<h5>Mi plan</h5>
					</div>
				</div>

				{
					data && data
						? <EditCompany data={data} isLoading={isLoading}/>
						: <AddCompany/>
				}
			</div>
		</div>
	);
};

export default Company;
