import React, { useState, useEffect } from 'react';
import { Button, Search, Input, Select } from 'components';
import { Field, Form, Formik } from 'formik';
import moment from  'moment';
import 'moment-timezone';
import { toastError, toastSuccess } from 'utils/libs/toast';
import DatePicker from 'react-datepicker';
import useOrders from 'hooks/useOrders';
import 'react-datepicker/dist/react-datepicker.css';
import CustomersServices from 'services/customersService';
import useShared from 'hooks/useShared';
import OrdersServices from 'services/ordersService';


export interface PropertyProps {
	property: any;
	setGenerate: any;
	setSendEmail: any;
	setOrderId: any;
}

const Generate:React.FC<PropertyProps> = ({property, setGenerate, setSendEmail, setOrderId}) => {
	const [customers, setCustomers] = useState([]);
	const [customer, setCustomer] = useState<any>();
	const [searchActive, setSearchActive] = useState(false);
	const [orderDate, setOrderDate] = useState(new Date());
	const time = moment(orderDate).format('LT');

	const { getOrders }:any = useOrders();

	const {
		documentSelected,
		setDocumentSelected,
		documents,
		getDocuments,
		getRealtors,
		realtors,
		realtorSelected,
		setRealtorSelected,
	}:any = useShared();

	useEffect(() => {
		getDocuments();
	}, []);

	useEffect(() => {
		getRealtors();
	}, []);

	const onSubmit = async (values: any) => {
		const formData = {
			customerId: Number(customer.id),
			realtorId: Number(realtorSelected.value),
			propertyId: Number(property.code),
			dateTimeOfVisits: orderDate
		};
		try {
			await OrdersServices.addOrder(formData);
			toastSuccess('Orden Generada Exitosamente');
			setGenerate(false);
			setSendEmail(true);
			getOrders();
		} catch (error) {
			toastError('Error al Orden Generada');
		}
	};

	const searchCustomer =  async (e: any) => {
		const response = await CustomersServices.getCustomers(e.target.value);
		setCustomers(response.data.data);
		setSearchActive(true);
	};

	const handleCustomer = (item: any) => {
		setCustomer(item);
		setSearchActive(false);
	};

	return (
		<>
			<div className="row mb-4">
				<div className="col-md-12">
					<div className="search-customer">
						<Search
							placeholder="Buscar Cliente"
							onChange={searchCustomer}
						/>
						{
							searchActive &&
              <ul>
              	{
              		customers?.map((item: any, index: number) => (
          			    <li key={index} onClick={() => handleCustomer(item)}>{item.name} {item.lastName}</li>
          		    ))
              	}
              </ul>
						}
					</div>
				</div>
			</div>
			<Formik
				initialValues={customer && customer}
				enableReinitialize
				onSubmit={onSubmit}>
				{({ errors, touched, isValid, dirty }) => (
					<Form>
						<div className="row mb-4">
							<div className="col-md-6">
								<Field
									type="text"
									name="name"
									label="Nombre"
									placeholder="Ingrese su Nombre"
									component={Input}
									readOnly
								/>
							</div>
							<div className="col-md-6">
								<Field
									type="text"
									name="lastName"
									label="Apellido"
									placeholder="Ingrese su Apellido"
									component={Input}
									readOnly
								/>
							</div>
						</div>
						<div className="row mb-4">
							<div className="col-md-6">
								<Select
									label="Tipo de Documento"
									options={documents}
									setSelected={setDocumentSelected}
									selected={documentSelected}
								/>
							</div>
							<div className="col-md-6">
								<Field
									type="text"
									name="identityDocumentNumber"
									label="Numero de Documento"
									placeholder="Ingrese su Numero de Documento"
									component={Input}
									readOnly
								/>
							</div>
						</div>
						<div className="row mb-4">
							<div className="col-md-6">
								<Field
									type="text"
									name="email"
									label="Email"
									placeholder="Ingrese su Email"
									component={Input}
									readOnly
								/>
							</div>
							<div className="col-md-6">
								<Field
									type="text"
									name="phone"
									label="Teléfono celular"
									placeholder="Ingrese su Teléfono celular"
									component={Input}
									readOnly
								/>
							</div>
						</div>
						<div className="row mb-4">
							<div className="col-md-12">
								<h3>Información de la orden</h3>
							</div>
						</div>
						<div className="row mb-4">
							<div className="col-md-6">
								<Select
									label="Ejecutivo"
									options={realtors}
									setSelected={setRealtorSelected}
									selected={realtorSelected}
								/>
							</div>
						</div>
						<div className="row mb-4">
							<div className="col-md-6">
								<DatePicker
									selected={orderDate}
									showTimeSelect
									onChange={(date:Date) => setOrderDate(date)}
									customInput={<Input label="Fecha"/>}
								/>
							</div>
							<div className="col-md-6">
								<Input label="Hora" value={time} readOnly/>
							</div>
						</div>
						<div className="row">
							<div className="col-md offset-md-9">
								<Button block disabled={!isValid}>
                  Guardar
								</Button>
							</div>
						</div>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default Generate;
