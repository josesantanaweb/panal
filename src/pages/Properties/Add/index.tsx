import React, {useState, useEffect} from 'react';
import { Button, Input, Modal, Select, Checkbox, Textarea } from 'components';
import { Field, Form, Formik } from 'formik';
import { validationSchema } from './validations';
import { toastError, toastSuccess } from 'utils/libs/toast';
import { initialValues } from './initialValues';
import useFormProperty from 'hooks/useFormProperty';

const AddProperty = () => {
	const {
		properties,
		getProperties,
		loading,
		setProperty,
		setOperationId,
		operationId,
		operationType,
		propertyType,
		propertyId,
		setPropertyId,
		currencyId,
		setCurrencyId,
		currencyType,
	}:any = useFormProperty();

	const onSubmit = async (values: any, { resetForm }: any) => {
		console.log(values);
	};

	return (
		<div className="content">
			<div className="content-body">
				<div className="content-head">
					<div className="add-property">
						<div className="add-property-header mb-5">
							<h3>Agregar Propiedades</h3>
						</div>
						<Formik
							initialValues={initialValues}
							validationSchema={validationSchema.addProperty}
							onSubmit={onSubmit}>
							{({ errors, touched, isValid, dirty }) => (
								<Form className="add-property-form">
									<div className="row mb-4">
										<div className="col-md-4">
											<Select
												label="Tipo de Operacion"
												options={operationType}
												setSelected={setOperationId}
												selected={operationId}
											/>
										</div>
									</div>
									<div className="row mb-4">
										<div className="col-md-4">
											<Select
												label="Tipo de Modeda"
												options={currencyType}
												setSelected={setCurrencyId}
												selected={currencyId}
											/>
										</div>
										<div className="col-md-4">
											<Field
												type="text"
												name="price"
												label="Precio"
												placeholder="Ingrese Precio"
												component={Input}
												error={
													errors.price && touched.price ? errors.price : null
												}
											/>
										</div>
										<div className="col-md-4" style={{'marginTop': '20px'}}>
											<Button block>
                        Agregar requisitos de arriendo
											</Button>
										</div>
									</div>
									<div className="row mb-4">
										<div className="col md-12">
											<h4>Asignación de Ejecutivo</h4>
										</div>
									</div>
									<div className="row mb-4">
										<div className="col-md-4">
											<Select
												label="Corredor Vendedor"
												options={currencyType}
												setSelected={setCurrencyId}
												selected={currencyId}
											/>
										</div>
										<div className="col-md-4">
											<Select
												label="Corredor Comprador"
												options={currencyType}
												setSelected={setCurrencyId}
												selected={currencyId}
											/>
										</div>
									</div>
									<div className="row">
										<div className="col-md-3">
											<Button block disabled={!isValid || !dirty}>
                        Guardar
											</Button>
										</div>
									</div>
								</Form>
							)}
						</Formik>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddProperty;
