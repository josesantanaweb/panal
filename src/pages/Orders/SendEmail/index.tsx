import React, {useState} from 'react';
import {SendEmailProps} from "./types";
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from "react-datepicker";
import moment from  'moment';
import 'moment-timezone';
import "react-datepicker/dist/react-datepicker.css";
import styles from "./styles.module.scss";
import Button from "components/Button";
import Input from "components/Input";
import OrdersServices from 'services/ordersServices';

const SendEmail:React.FC<SendEmailProps> = ({setOpenModal, property, setSendEmail, setSearch}) => {
	const [scheduledDate, setScheduledDate] = useState(new Date());
	const queryClient = useQueryClient();
	const time = moment(scheduledDate).format('LT');
	const { mutate } = useMutation(OrdersServices.sendEmail, {
		onSuccess: (data) => {
			toast.success("Correo enviado exitosamente", {
				position: "top-right",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
			});
			queryClient.invalidateQueries(['orders']);
			setTimeout(() => {
			  setOpenModal(false);
			  setSearch("");
				setSendEmail(false);
			}, 3000);
		},
		onError: (error: any) => {
			toast.error("Hubo un error al enviar el Email", {
				position: "top-right",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
			});
		}
	});

  	// Initial values
	const INITIAL_VALUES = {
		scheduledDate: scheduledDate,
		toEmail: '',
		subject: '',
		message: '',
	};

	const onSubmit = (values: any, {resetForm}: any) => {
		const orderId = 11;
		const {
			toEmail,
			subject,
			message,
		} = values;
		mutate({
			orderId,
			scheduledDate: scheduledDate,
			toEmail: toEmail,
			subject: subject,
			message: message,
		});
	};

	return (
		<div className={styles["sendemail"]}>
			<h3 className={styles["sendemail-title"]}>Programacion de Envio</h3>
			<Formik
				initialValues={INITIAL_VALUES}
				onSubmit={onSubmit}
				enableReinitialize
			>
				{({ isValid, dirty}) => (
					<Form className={styles["form-container"]}>
						<div className={styles["form-rows"]}>
							<DatePicker
								selected={scheduledDate}
								showTimeSelect
								onChange={(date:Date) => setScheduledDate(date)}
								customInput={<Input label="Fecha" />}
							/>
							<div>
								<Input label="Hora" value={time} />
							</div>
						</div>
						<div className={styles["form-single"]}>
							<Field
								type="email"
								name="toEmail"
								placeholder="Ingrese su Email"
								required
								label="Email"
								component={Input}
							/>
						</div>
						<div className={styles["form-single"]}>
							<Field
								type="text"
								name="subject"
								placeholder="Asunto"
								required
								label="Asunto"
								component={Input}
							/>
						</div>
						<div className={styles["form-single"]}>
							<Field
								name="message"
								placeholder="Ingrese Mensaje"
								label="Mensaje"
								textarea
								component={Input}
							/>
						</div>
						<div className={styles["form-footer"]}>
							<Button type='button' variant="outline">Atras</Button>
							<Button type='submit' variant="tertiary">Envia</Button>
						</div>
					</Form>
        	)}
			</Formik>
		</div>
	);
};

export default SendEmail;
