import React, {useState, useEffect} from 'react';
import { BiImageAdd, } from "react-icons/bi";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';

import Button from "components/Button";
import Input from "components/Input";

import {AddUploadProps, IValues} from "./types";
import styles from "../../styles.module.scss";
import PropertiesServices from 'services/propertiesServices';


const AddProperty:React.FC<AddUploadProps> = () => {
	const navigate = useNavigate();

	const [images, setImages] = useState("");

    	// Validataions
	const validationSchema = {
		addProperty : Yup.object({
			// video: Yup.string().required("Requerido"),
			// tour: Yup.string().required("Requerido"),
		})
	};

  	// Initial values
	const INITIAL_VALUES = {
		video: '',
		tour: '',
	};

	// Handle Upload Image
	const handleChange = async (e: any) => {
		const selectedFIles: any = [];
		const targetFiles = e.target.files[0];
		// const targetFilesObject= [...targetFiles];
		// targetFilesObject.map((file) => {
		// 	return selectedFIles.push(URL.createObjectURL(file));
		// });
		setImages(targetFiles);
	};

	// Send Upload Image
	const onSubmit = () => {
		const data: any = new FormData();
		data.append('images', images);


		// for(let i = 0; i < images.length; i++) {
		// 	data.append('image', images[i]);
		// }

		PropertiesServices.uploadImagen(data, 4)
			.then((response) => {
				console.log(response);
				toast.success("Propiedad Guardada", {
					position: "top-right",
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: true,
					progress: undefined,
				});
				setTimeout(() => {
					return navigate(`/properties`);
				}, 3000);
			})
			.catch((error) => {
				console.log(error);
			});

	};

	return (
		<div className={styles["add-property"]}>
			<div className={styles["add-property-top"]}>
				<div className={styles["add-property-title"]}>
					<h3>Archivos multimedia</h3>
				</div>
			</div>
			<div className={styles["section-title"]}>
				<h3>Imagenes</h3>
			</div>
			{/* {
				images.length > 0 &&
        <div className={styles["imagen-list"]}>
        	{
        		images.map((img: any, index: number) =>
        			<img key={index} src={img} alt="" />)
        	}
        </div>
			} */}

			{/* {
				images &&
        <div className={styles["imagen-list"]}>
        	<img  src={images} alt="" />
        </div>
			} */}

			<label htmlFor="upload" className={styles["imagen-upload"]}>
				<BiImageAdd size={24} />
				<span>Subir Imagenes</span>
				<input type="file" id="upload" multiple onChange={handleChange} />
			</label>
			{/* <Formik
				initialValues={INITIAL_VALUES}
				validationSchema={validationSchema.addProperty}
				onSubmit={onSubmit}
			>
				{({ errors, touched, isValid, dirty}) => (
					<Form className={styles["form-wrapper"]}>
						<div className={styles["form-row-6"]}>
							<Field
								type="text"
								name="video"
								placeholder="Video"
								required
								label="Video"
								component={Input}
								// error={errors.video && touched.video ? errors.video : null}
							/>
							<Field
								type="text"
								name="tour"
								placeholder="Tour Virtual"
								required
								label="Tour Virtual"
								component={Input}
								// error={errors.tour && touched.tour ? errors.tour : null}
							/>
						</div>
						<div className={styles["form-footer"]}>
						</div>
					</Form>
				)}
			</Formik> */}
			<Button type='button' onClick={onSubmit}>Guardar</Button>
			<ToastContainer />
		</div>
	);
};

export default AddProperty;
