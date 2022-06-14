import React, {useEffect, useState} from 'react';
import { Button, Input, Modal, Select, Checkbox } from 'components';
import { Field, Form, Formik } from 'formik';
import { validationSchema } from './validations';
import { toastError, toastSuccess } from 'utils/libs/toast';
import { initialValues } from './initialValues';
import RealtorsServices from 'services/realtorsService';
import useShared from 'hooks/useShared';
import useRealtors from 'hooks/useRealtors';

import portalInmobilario from 'assets/images/portal-inmobilario.png';
import goplaceit from 'assets/images/goplaceit.png';
import icasa from 'assets/images/icasa.png';
import chilePropiedades from 'assets/images/chile-propiedades.png';
import enlaceInmobilario from 'assets/images/enlace-inmobilario.png';
import doomos from 'assets/images/doomos.png';
import toctoc from 'assets/images/toctoc.png';
import emol from 'assets/images/emol.png';
import portalTerreno from 'assets/images/portal-terreno.png';
import zoom from 'assets/images/zoom.png';
import propiv from 'assets/images/propiv.png';
import yapo from 'assets/images/yapo.png';

export interface AddRealtorsProps {
  modal: boolean;
	setModal: any;
}

const AddRealtors:React.FC<AddRealtorsProps> = ({modal, setModal}) => {

	const {
		documentSelected,
		setDocumentSelected,
		documents,
		countrySelected,
		setCountrySelected,
		countries,
		stateSelected,
		setStateSelected,
		states,
	}:any = useShared();
	const { getRealtors }:any = useRealtors();

	const onSubmit = async (values: any, { resetForm }: any) => {
		const formData = {
			...values,
			identityDocumentId: documentSelected.value,
			address: {
				countryId: countrySelected.value,
				stateId: stateSelected.value,
				...values.address
			}
		};
		try {
			await RealtorsServices.addRealtor(formData);
			toastSuccess('Asesor Guardado Exitosamente');
			getRealtors();
			resetForm();
			setTimeout(() => {
				setModal(false);
			}, 1500);
		} catch (error) {
			toastError('Error al Crear Asesor');
		}
	};

	return (
		<Modal
			modal={modal}
			setModal={setModal}
			title="Crear Asesor">
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema.addRealtor}
				onSubmit={onSubmit}>
				{({ errors, touched, isValid, dirty }) => (
					<Form className="modal-scroll">
						<div className="row mb-4">
							<div className="row mb-4">
								<div className="col-md-6">
									<h3>Información del agente</h3>
								</div>
							</div>
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
						<div className="row mb-4">
							<div className="col-md-6">
								<Field
									type="text"
									name="whatsappPhone"
									label="Telefono de Whatsapp"
									placeholder="Ingrese su Telefono de Whatsapp"
									component={Input}
								/>
							</div>
							<div className="col-md-6">
								<Field
									type="text"
									name="contactPhone"
									label="Telefono"
									placeholder="Ingrese su Telefono"
									component={Input}
								/>
							</div>
						</div>
						<div className="row mb-4">
							<div className="col-md-6">
								<h3>Ubicacion</h3>
							</div>
						</div>
						<div className="row mb-4">
							<div className="col-md-6">
								<Select
									label="Pais"
									options={countries}
									setSelected={setCountrySelected}
									selected={countrySelected}
								/>
							</div>
							<div className="col-md-6">
								<Select
									label="Ciudad"
									options={states}
									setSelected={setStateSelected}
									selected={stateSelected}
								/>
							</div>
						</div>
						<div className="row mb-4">
							<div className="col-md-6">
								<Field
									type="text"
									name="address.detailedAddress.comune"
									label="Comuna"
									placeholder="Ingrese su ComunA"
									component={Input}
								/>
							</div>
							<div className="col-md-6">
								<Field
									type="text"
									name="address.detailedAddress.officeNumber"
									label="Numero de Oficina"
									placeholder="Ingrese su Numero de Oficina"
									component={Input}
								/>
							</div>
						</div>
						<div className="row mb-4">
							<div className="col-md-6">
								<Field
									type="text"
									name="address.detailedAddress.address"
									label="Direccion"
									placeholder="Ingrese su Direccion"
									component={Input}
								/>
							</div>
						</div>
						{/* TODO: Agregar funcionalidad a checkbox */}
						<div className="row mb-4">
							<div className="col-md-6">
								<h3>Sitio web</h3>
							</div>
						</div>
						<div className="row mb-4">
							<div className="col-md-6">
								<Field
									name="website"
									type="checkbox"
									label="Visible en web"
									component={Checkbox}
								/>
							</div>
						</div>
						<div className="row mb-4">
							<div className="col-md-6">
								<h3>VendeID</h3>
							</div>
						</div>
						<div className="row mb-4">
							<div className="col-md-6">
								<Field
									name="externalPortals"
									imagen={portalInmobilario}
									component={Checkbox}
								/>
							</div>
							<div className="col-md-6">
								<Field
									name="externalPortals"
									imagen={goplaceit}
									component={Checkbox}
								/>
							</div>
						</div>
						<div className="row mb-4">
							<div className="col-md-6">
								<Field
									name="externalPortals"
									imagen={chilePropiedades}
									component={Checkbox}
								/>
							</div>
							<div className="col-md-6">
								<Field
									name="externalPortals"
									imagen={enlaceInmobilario}
									component={Checkbox}
								/>
							</div>
						</div>
						<div className="row mb-4">
							<div className="col-md-6">
								<Field
									name="externalPortals"
									imagen={doomos}
									component={Checkbox}
								/>
							</div>
							<div className="col-md-6">
								<Field
									name="externalPortals"
									imagen={toctoc}
									component={Checkbox}
								/>
							</div>
						</div>
						<div className="row mb-4">
							<div className="col-md-6">
								<Field
									name="externalPortals"
									imagen={emol}
									component={Checkbox}
								/>
							</div>
							<div className="col-md-6">
								<Field
									name="externalPortals"
									imagen={zoom}
									component={Checkbox}
								/>
							</div>
						</div>
						<div className="row mb-4">
							<div className="col-md-6">
								<Field
									name="externalPortals"
									imagen={portalTerreno}
									component={Checkbox}
								/>
							</div>
							<div className="col-md-6">
								<Field
									name="externalPortals"
									imagen={propiv}
									component={Checkbox}
								/>
							</div>
						</div>
						<div className="row mb-4">
							<div className="col-md-6">
								<Field
									name="externalPortals"
									imagen={yapo}
									component={Checkbox}
								/>
							</div>
							<div className="col-md-6">
								<Field
									name="externalPortals"
									imagen={icasa}
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

export default AddRealtors;
