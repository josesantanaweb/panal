import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { BiImageAdd } from 'react-icons/bi';
import { ToastContainer } from 'react-toastify';
import { Button, Preloader} from 'components';
import { toastError, toastSuccess } from 'utils/libs/toast';
import PropertiesServices from 'services/propertiesService';

export interface UploadProps {
  propertyId: any;
}

const Upload:React.FC<UploadProps> =({propertyId}) => {
	const navigate = useNavigate();

	const [images, setImages] = useState<any>();
	const [preview, setPreview] = useState([]);
	const [loading, setLoading] = useState<boolean>(false);

	const onUploadImagen = (e: any) => {
		setImages(e.target.files);
		const selectedFiles: any = [];
		const targetFiles = e.target.files;
		const targetFilesObject= [...targetFiles];
		targetFilesObject.map((file) => {
			return selectedFiles.push(URL.createObjectURL(file));
		});
		setPreview(selectedFiles);
	};

	const onSubmit = () => {
		setLoading(true);
		const formData: any = new FormData();
		if(images) {
			let newArr = [];
			for (let i = 0; i < images.length; i++) {
				newArr.push(images[i]);
				formData.append('images', images[i]);
			}
		}

		PropertiesServices.uploadImages(formData, propertyId)
			.then((response) => {
				toastSuccess('Archivos Guardados');
				setLoading(false);
				setTimeout(() => {
					return navigate('/properties');
				}, 3000);
			})
			.catch((error) => {
				setLoading(false);
				toastError('Error al Subir Archivos');
			});
	};

	if (loading) return <Preloader />;

	return (
		<>
			<div className="row mb-4">
				<div className="col-md-12">
					<h4>Archivos multimedia</h4>
				</div>
			</div>
			<div className="row mb-4">
				<div className="colmd-12">
					{
						preview.length > 0 &&
          <div className="add-property-upload-list">
          	{
          		preview.map((img: any, index: number) =>
          			<img key={index} src={img} alt="" />)
          	}
          </div>
					}
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-md-12">
					<label htmlFor="upload" className="add-property-upload-imagen">
						<BiImageAdd  size={24} />
						<span>Haga click aqui para agregar imagen</span>
						<input type="file" id="upload" multiple onChange={onUploadImagen} />
					</label>
				</div>
			</div>
			<div className="row">
				<div className="col-md-2 offset-md-10">
					<Button block onClick={onSubmit}>
            Guardar
					</Button>
				</div>
				<ToastContainer />
			</div>
		</>
	);
};

export default Upload;
