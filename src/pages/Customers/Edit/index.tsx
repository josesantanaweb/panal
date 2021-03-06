import React, {useEffect, useState} from 'react';
import { Button, Input, Modal, Select, Checkbox, Textarea } from 'components';
import { Field, Form, Formik } from 'formik';
import { validationSchema } from './validations';
import { toastError, toastSuccess } from 'utils/libs/toast';
import { initialValues } from './initialValues';
import CustomersServices from 'services/customersService';
import useCustomers from 'hooks/useCustomers';
import useShared from 'hooks/useShared';

export interface EditCustomersProps {
  modal: boolean;
	setModal: any;
	editData: any;
}

const EditCustomers:React.FC<EditCustomersProps> = ({modal, setModal, editData}) => {

	const {
		documentSelected,
		setDocumentSelected,
		documents,
	}:any = useShared();
	const { getCustomers }:any = useCustomers();

	const onSubmit = async (values: any, { resetForm }: any) => {
		const {
			name,
			lastName,
			identityDocumentNumber,
			phone,
			address,
			cashPayment,
			mortgage,
			comments,
		} = values;

		const formData = {
			name: name,
			lastName:lastName,
			identityDocumentNumber: identityDocumentNumber,
			phone:phone,
			address:address,
			cashPayment:cashPayment,
			mortgage:mortgage,
			comments:comments,
			identityDocumentId: documentSelected.value
		};
		try {
			await CustomersServices.editCustomer(editData.id, formData);
			toastSuccess('Cliente Guardado Exitosamente');
			getCustomers();
			resetForm();
			setTimeout(() => {
				setModal(false);
			}, 1500);
		} catch (error) {
			toastError('Error al Editar Cliente');
		}
	};


	return (
		<Modal
			modal={modal}
			setModal={setModal}
			title="Crear Cliente">
			<Formik
				initialValues={editData || initialValues}
				enableReinitialize={true}
				validationSchema={validationSchema.editCustomer}
				onSubmit={onSubmit}>
				{({ errors, touched, isValid }) => (
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
									disabled={true}
								/>
							</div>
							<div className="col-md-6">
								<Field
									type="text"
									name="phone"
									label="Tel??fono celular"
									placeholder="Ingrese su Tel??fono celular"
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
								<Button block disabled={!isValid}>
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

export default EditCustomers;
