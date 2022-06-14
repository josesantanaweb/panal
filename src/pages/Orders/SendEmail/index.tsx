import React, { useState, useEffect } from 'react';
import moment from  'moment';
import { Button, Search, Input, Textarea } from 'components';
import { Field, Form, Formik } from 'formik';
import { initialValues } from './initialValues';
import { toastError, toastSuccess } from 'utils/libs/toast';
import { validationSchema } from './validations';
import 'moment-timezone';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import OrdersServices from 'services/ordersService';

export interface SendEmailProps {
	orderId: any;
	setModal: any;
}

const SendEmail:React.FC<SendEmailProps> = ({orderId, setModal}) => {
	const [scheduledDate, setScheduledDate] = useState(new Date());
	const time = moment(scheduledDate).format('LT');

	const onSubmit = async (values: any, { resetForm }: any) => {
		const formData = {
			orderId: orderId,
			scheduledDate: scheduledDate,
			...values
		};
		try {
			await OrdersServices.sendEmail(formData, orderId);
			toastSuccess('Correo Enviado Exitosamente');
			resetForm();
			setTimeout(() => {
				setModal(false);
			}, 1500);
		} catch (error) {
			toastError('Error al Enviar Correo');
		}
	};

	return (
		<div>
			<div className="row mb-4">
				<div className="col-md-12">
					<h3>Programacion de Envio</h3>
				</div>
			</div>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema.sendEmail}
				onSubmit={onSubmit}>
				{({ errors, touched, isValid, dirty }) => (
					<Form>
						<div className="row mb-4">
							<div className="col-md-6">
								<DatePicker
									selected={scheduledDate}
									showTimeSelect
									onChange={(date:Date) => setScheduledDate(date)}
									customInput={<Input label="Fecha"/>}
								/>
							</div>
							<div className="col-md-6">
								<Input label="Hora" value={time} readOnly/>
							</div>
						</div>
						<div className="row mb-4">
							<div className="col-md-12">
								<Field
									type="email"
									name="toEmail"
									label="Email"
									placeholder="Ingrese su Email"
									component={Input}
									error={
										errors.toEmail && touched.toEmail ? errors.toEmail : null
									}
								/>
							</div>
						</div>
						<div className="row mb-4">
							<div className="col-md-12">
								<Field
									type="text"
									name="subject"
									label="Asunto"
									placeholder="Ingrese Asunto"
									component={Input}
									error={
										errors.subject && touched.subject ? errors.subject : null
									}
								/>
							</div>
						</div>
						<div className="row mb-4">
							<div className="col-md-12">
								<Field
									name="message"
									label="Mensaje"
									placeholder="Ingrese Mensaje"
									component={Textarea}
									readOnly
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-md offset-md-9">
								<Button block disabled={!isValid || !dirty}>
                  Guardar
								</Button>
							</div>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default SendEmail;
