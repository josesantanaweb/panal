import React, { useEffect, useState } from 'react';
import { Button, Input, Modal, Select, Checkbox, Textarea } from 'components';
import { Field, Form, Formik } from 'formik';
import { validationSchema } from './validations';
import { toastError, toastSuccess } from 'utils/libs/toast';
import { initialValues } from './initialValues';

// import CustomersServices from 'services/customersService';
import CustomersFindServices from 'services/CustomersFindService';
import SharedServices from 'services/sharedService';

import useCustomersFind from 'hooks/useCustomersFind';
import useShared from 'hooks/useShared';

export interface AddCustomersFindProps {
	modal: boolean;
	setModal: any;
}

const AddCustomersFind: React.FC<AddCustomersFindProps> = ({
	modal,
	setModal,
}) => {
	const {
		documentSelected,
		setDocumentSelected,
		documents,
		operationSelected,
		setOperationSelected,
		operations,
		countries,
		setCountrySelected,
		countrySelected,
		communeSelected,
		setCommuneSelected,
		communes,
		propertyTypeSelected,
		setPropertyTypeSelected,
		propertyTypes,
	}: any = useShared();

	const { getCustomersFind }: any = useCustomersFind();

	const onSubmit = async (values: any, { resetForm }: any) => {
		const formData = {
			...values,
			identityDocumentId: documentSelected.value,
			operationId: operationSelected.value,
			countryId: countrySelected.value,
			communeId: communeSelected.value,
			propertyTypeId: propertyTypeSelected.value,
		};
		try {
			await CustomersFindServices.addCustomerFind(formData);
			toastSuccess('Cliente Busca Guardado Exitosamente');
			getCustomersFind();
			resetForm();
			setTimeout(() => {
				setModal(false);
			}, 1500);
		} catch (error) {
			toastError('Error al Crear Cliente');
		}
	};

	return (
		<Modal modal={modal} setModal={setModal} title="Generar cliente busca">
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema.addCustomer}
				onSubmit={onSubmit}>
				{({ errors, touched, isValid, dirty }) => (
					<Form>
						<div className="row mb-4">
							<h3 className="mb-4">Información del cliente</h3>
							<div className="col-md-6">
								<Field
									type="text"
									name="name"
									label="Nombre"
									placeholder="Ingrese su Nombre"
									component={Input}
									error={errors.name && touched.name ? errors.name : null}
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
									name="identityDocumentType"
									options={documents}
									setSelected={setDocumentSelected}
									selected={documentSelected}
								/>
							</div>
							<div className="col-md-6">
								<Field
									type="text"
									name="identityDocumentNumber"
									label="Número de Documento"
									placeholder="Ingrese su Numero de Documento"
									component={Input}
									error={
										errors.identityDocumentNumber &&
										touched.identityDocumentNumber
											? errors.identityDocumentNumber
											: null
									}
								/>
							</div>
						</div>

						{/* Contact section */}
						<div className="row mb-4" style={{ display: 'flex' }}>
							<div className="col-md-6">
								<Field
									type="text"
									name="contactPhone"
									label="Teléfono de contacto"
									placeholder="Ingrese número de contacto"
									component={Input}
									error={
										errors.contactPhone && touched.contactPhone
											? errors.contactPhone
											: null
									}
								/>
							</div>
							<div className="col-md-6">
								<Field
									type="text"
									name="whatsappPhone"
									label="Teléfono de whatsapp"
									placeholder="Ingrese número de contacto"
									component={Input}
									error={
										errors.whatsappPhone && touched.whatsappPhone
											? errors.whatsappPhone
											: null
									}
								/>
							</div>
						</div>
						{/* Contact section */}

						<div className="row mb-4">
							<div className="col-md-6">
								<Field
									type="email"
									name="email"
									label="Correo Electrónico"
									placeholder="Ingrese su correo electrónico"
									component={Input}
									error={errors.email && touched.email ? errors.email : null}
								/>
							</div>
							<div className="col-md-6">
								<Select
									label="Tipo de Operación"
									options={operations}
									setSelected={setOperationSelected}
									selected={operationSelected}
								/>
							</div>
						</div>

						<div className="row mb-4 mt-5">
							<h3 className="mb-4">Ubicación</h3>
							<div className="col-md-12">
								<Select
									label="País"
									options={countries}
									setSelected={setCountrySelected}
									selected={countrySelected}
								/>
							</div>
						</div>

						<div className="row mb-4">
							<div className="col-md-6">
								<Field
									type="text"
									name="location"
									label="Región(location)"
									placeholder="Escribe tú región"
									component={Input}
									// ! Check this one
									// error={
									// 	errors.location && touched.location ? errors.location : null
									// }
								/>
							</div>
							<div className="col-md-6">
								<Select
									label="Elige una comuna"
									name="commune"
									options={communes}
									setSelected={setCommuneSelected}
									selected={communeSelected}
								/>
							</div>
						</div>

						<div className="row mb-4 mt-5">
							<h3 className="mb-4">Características</h3>
							<div className="col-md-6">
								<Select
									label="Tipo de propiedad"
									options={propertyTypes}
									setSelected={setPropertyTypeSelected}
									selected={propertyTypeSelected}
									name="propertytypeId"
								/>
							</div>
							<div className="col-md-6">
								<Select
									label="Tipo de moneda"
									options={documents}
									setSelected={setDocumentSelected}
									selected={documentSelected}
								/>
							</div>
						</div>
						<div className="row mb-4">
							<div className="col-md-3">
								<Field
									type="text"
									name="lastName"
									label="Precio"
									placeholder="Precio min. $"
									component={Input}
									error={
										errors.lastName && touched.lastName ? errors.lastName : null
									}
								/>
							</div>
							<div className="col-md-3">
								<Field
									type="text"
									name="lastName"
									label="ㅤ"
									placeholder="Precio máx. $"
									component={Input}
									error={
										errors.lastName && touched.lastName ? errors.lastName : null
									}
								/>
							</div>
							<div className="col-md-6">
								<Select
									label="Dormitorios desde"
									options={documents}
									setSelected={setDocumentSelected}
									selected={documentSelected}
								/>
							</div>
						</div>
						<div className="row mb-4">
							<div className="col-md-6">
								<Select
									label="Baños desde"
									options={documents}
									setSelected={setDocumentSelected}
									selected={documentSelected}
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

export default AddCustomersFind;
