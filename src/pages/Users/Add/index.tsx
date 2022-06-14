import React, {useEffect, useState} from 'react';
import { Button, Input, Modal, Select } from 'components';
import { Field, Form, Formik } from 'formik';
import { validationSchema } from './validations';
import { toastError, toastSuccess } from 'utils/libs/toast';
import { initialValues } from './initialValues';
import UsersServices from 'services/usersService';
import useShared from 'hooks/useShared';
import useUsers from 'hooks/useUsers';
export interface AddUsersProps {
  modal: boolean;
	setModal: any;
}

const AddUsers:React.FC<AddUsersProps> = ({modal, setModal}) => {

	const {
		documentSelected,
		setDocumentSelected,
		documents,
	}:any = useShared();
	const { getUsers }:any = useUsers();

	const onSubmit = async (values: any, { resetForm }: any) => {
		const formData = {
			...values,
			identityDocumentId: documentSelected.value
		};
		try {
			await UsersServices.addUser(formData);
			toastSuccess('Usuario Guardado Exitosamente');
			getUsers();
			resetForm();
			setTimeout(() => {
				setModal(false);
			}, 1500);
		} catch (error) {
			toastError('Error al Crear Usuario');
		}
	};


	return (
		<Modal
			modal={modal}
			setModal={setModal}
			title="Crear Usuario">
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema.addUser}
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
								/>
							</div>
							<div className="col-md-6">
								<Field
									type="password"
									name="password"
									label="Contraseña"
									placeholder="Ingrese su Contraseña"
									component={Input}
									error={
										errors.password && touched.password ? errors.password : null
									}
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

export default AddUsers;
