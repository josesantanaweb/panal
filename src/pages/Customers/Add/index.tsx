import React, {useEffect, useState} from 'react';
import { Button, Input, Modal, Select, Checkbox, Textarea } from 'components';
import { Field, Form, Formik } from 'formik';
import { validationSchema } from './validations';
import { toastError, toastSuccess } from 'utils/libs/toast';
import { initialValues } from './initialValues';
import CustomersServices from 'services/customersService';
import useCustomers from 'hooks/useCustomers';
import useShared from 'hooks/useShared';

export interface AddCustomersProps {
  modal: boolean;
	setModal: any;
}

const AddCustomers:React.FC<AddCustomersProps> = ({modal, setModal}) => {

	const {
		documentSelected,
		setDocumentSelected,
		documents,
	}:any = useShared();
	const { getCustomers }:any = useCustomers();

	const onSubmit = async (values: any, { resetForm }: any) => {
		const formData = {
			...values,
			identityDocumentId: documentSelected.value
		};
		try {
			await CustomersServices.addCustomer(formData);
			toastSuccess('Cliente Guardado Exitosamente');
			getCustomers();
			resetForm();
			setTimeout(() => {
				setModal(false);
			}, 1500);
		} catch (error) {
			toastError('Error al Crear Cliente');
		}
	};


	return (
		<Modal
			modal={modal}
			setModal={setModal}
			title="Crear Cliente">
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema.addCustomer}
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
									error={
										errors.name && touched.name ? errors.name : null
									}
								/>
							</div>
							<div className="col-md-6">
								<Field
									type="text"
									name="lastName"
									label="Apellido"
									placeholder="Ingrese su Apellido"
									component={Input}
									error={
										errors.lastName && touched.lastName ? errors.lastName : null
									}
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
									error={
										errors.email && touched.email ? errors.email : null
									}
								/>
							</div>
							<div className="col-md-6">
								<Field
									type="text"
									name="phone"
									label="Teléfono celular"
									placeholder="Ingrese su Teléfono celular"
									component={Input}
								/>
							</div>
						</div>
						<div className="row mb-4">
							<div className="col-md-6">
								<Field
									type="text"
									name="address"
									label="Domicilio"
									placeholder="Ingrese su Domicilio"
									component={Input}
								/>
							</div>
						</div>
						<div className="row mb-4">
							<div className="col-md-12">
								<Field
									type="text"
									name="comments"
									label="Comentario"
									placeholder="Ingrese su Comentario"
									component={Textarea}
								/>
							</div>
						</div>
						<div className="row mb-4">
							<div className="col-md-6">
								<Field
									name="mortgage"
									type="checkbox"
									label="Hipotecario"
									component={Checkbox}
								/>
							</div>
							<div className="col-md-6">
								<Field
									name="cashPayment"
									type="checkbox"
									label="Pago al contado"
									component={Checkbox}
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-md-6 offset-md-6">
								<Button block disabled={!isValid || !dirty}>
                  Guardar
								</Button>
							</div>
						</div>
					</Form>
				)}
			</Formik>
		</Modal>
	);
};

export default AddCustomers;
