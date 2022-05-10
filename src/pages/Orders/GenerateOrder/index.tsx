import React, { useState, useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from  'moment';
import 'moment-timezone';

import Button from "components/Button";
import Select from "components/Select";
import Input from "components/Input";
import { useDebounce } from 'use-debounce';

import styles from "./styles.module.scss";
import {ISelect} from "interfaces";
import {GenerateOrderProps} from "./types";
import CustomersServices from 'services/customersServices';
import OrdersServices from 'services/ordersServices';
import {getValue} from 'utils/localStorage';

const documentTypeOptions = [
	{
		label: 'RUT',
		value: 'rut',
	},
	{
		label: 'Pasaporte',
		value: 'pasaporte',
	},
];

const GenerateOrder:React.FC<GenerateOrderProps> = ({hanleBack, property, setOpenModal, setSendEmail, setGeneratedOrder, setOrderId}) => {
	const [documentType, setDocumentType] = useState(documentTypeOptions[0]);
	const [orderDate, setOrderDate] = useState(new Date());
	const [search, setSearch] = useState("");
	const [activeSearch, setActiveSearch] = useState(false);
	const [customer, setCustomer] = useState({});
	const [customerData, setCustomerData] = useState<any>();
	const [openSelectDocumentType, setOpenSelectDocumentType] = useState<boolean>(false);
	const [openSelectCustomer, setOpenSelectCustomer] = useState<boolean>(false);
	const debouncedFilter = useDebounce(search, 500);
	const [customersOptions, setCustomersOptions] = useState<ISelect[]>([]);
	const { data: customers } = useQuery(["customers", debouncedFilter[0]], CustomersServices.getCustomers, { enabled: Boolean(debouncedFilter[0]) });
	const { data: customersData } = useQuery(["customersData", ""], CustomersServices.getCustomers);
	const queryClient = useQueryClient();
	const time = moment(orderDate).format('LT');

	useEffect(() => {
		if (customersData !== undefined) {
			customersOptionsData();
		}
	}, [customersData]);

	const customersOptionsData = () => {
		const customersOptionsData = customersData?.data?.map((item: any) => ({label: item.name, value: item.id}));
		setCustomersOptions(customersOptionsData);
		if(customersOptionsData !== undefined) {
			setCustomerData(customersOptionsData[0]);
		}
	};

	const { mutate } = useMutation(OrdersServices.generateOrder, {
		onSuccess: (data) => {
			toast.success("Orden registrada exitosamente", {
				position: "top-right",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
			});
			queryClient.invalidateQueries(['orders']);
			setSendEmail(true);
			setGeneratedOrder(false);
			setOrderId(data.id);
		},
		onError: (error: any) => {
			toast.error(error.response.data.message, {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
			});
		}
	});


  	// Handle Open limit select
	const handleOpenDocumentType = () => setOpenSelectDocumentType(true);

	const handleOpenCustomer = () => setOpenSelectCustomer(true);

	const onSubmit = (values: any, {resetForm}: any) => {
		const userId = JSON.parse((getValue('userId')));
		const data = {
			customerId: Number(customerData.value),
			realtorId: Number(userId),
			propertyId: Number(property.code),
			dateTimeOfVisits: orderDate
		};
		mutate(data);
	};

	const searchCustomer = (e: any) => {
		setSearch(e.target.value);
		setActiveSearch(true);
	};

	const handleCustomer = (customer: any) => {
		setCustomer(customer);
		setActiveSearch(false);
	};

	return (
		<>
			<div className={styles['search-client']}>
				<Input
					placeholder="Buscar cliente"
					onChange={searchCustomer}
					search
				/>
				{
					activeSearch &&
          <div className={styles['search-options']}>
          	{
          		customers?.data.map((item: any, index: number) => (
          			<li key={index} onClick={() => handleCustomer(item)}>{item.name} {item.lastName}</li>
          		))
          	}
          </div>
				}
			</div>
			<Formik
				initialValues={customer && customer}
				onSubmit={onSubmit}
				enableReinitialize
			>
				{({ isValid, dirty}) => (
					<Form className={styles["form-container"]}>

						<div className={styles['select-property-top']}>
        	</div>
						<div className={styles["form-rows"]}>
							<Field
								type="text"
								name="name"
								placeholder="Ingrese su Nombre"
								required
								label="Nombre"
								component={Input}
							/>
							<Field
								type="text"
								name="lastName"
								placeholder="Ingrese su Apellido"
								label="Apellido"
								required
								component={Input}
							/>
						</div>
						<div className={styles["form-rows"]}>
							<Select
								options={documentTypeOptions}
								label="Tipo de Documento"
								required
								selectedOption={documentType}
								setSelectedOption={setDocumentType}
								open={openSelectDocumentType}
								setOpen={setOpenSelectDocumentType}
								handleOpenSelect={handleOpenDocumentType}
							/>
							<Field
								type="text"
								name="identityDocumentNumber"
								placeholder="Ingrese su Numero de Documento"
								label="Numero de Documento"
								required
								component={Input}
							/>
						</div>
						<div className={styles["form-rows"]}>
							<Field
								type="text"
								name="phone"
								placeholder="Ingrese su Teléfono"
								label="Teléfono"
								component={Input}
							/>
							<Field
								type="email"
								name="email"
								required
								placeholder="Ingrese su Correo Electronico"
								label="Correo Electronico"
								component={Input}
							/>
						</div>
						<div className={styles["form-section"]}>
							<div className={styles["form-label"]}>
								<p>Información de la orden</p>
							</div>
						</div>
						<div className={styles["form-rows"]}>
							<Select
								options={customersOptions}
								label="Ejecutivo"
								required
								selectedOption={customerData}
								setSelectedOption={setCustomerData}
								open={openSelectCustomer}
								setOpen={setOpenSelectCustomer}
								handleOpenSelect={handleOpenCustomer}
							/>
						</div>
						<div className={styles["form-rows"]}>
							<div>
								<DatePicker
									selected={orderDate}
									showTimeSelect
									onChange={(date:Date) => setOrderDate(date)}
									customInput={<Input label="Fecha" />}
								/>
							</div>
							<div>
								<Input label="Hora" value={time} />
							</div>
						</div>
						{/* <div className={styles["form-section"]}>
							<div className={styles["form-label"]}>
								<p>Propiedad</p>
							</div>
						</div>
						<div className={styles["form-single"]}>
							<Field
								type="text"
								name="address"
								required
								label="Direccion*"
								component={Input}
							/>
						</div>
						<div className={styles["form-checkbox"]}>
							<Field
								name="mortgage"
								type="checkbox"
								label="Mostrar direccion exacta"
								component={Checkbox}
							/>
						</div> */}
						<div className={styles["form-footer"]}>
							<Button type='button' variant="outline" onClick={hanleBack}>Atras</Button>
							<div className={styles["form-button-group"]}>
								<Button type='submit' variant="tertiary">Generar</Button>
							</div>
						</div>
					</Form>
				)}
			</Formik>
			<ToastContainer />
		</>
	);

};

export default GenerateOrder;
