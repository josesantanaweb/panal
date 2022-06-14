import { toast } from 'react-toastify';

export const toastError = (msg: string) => {
	toast.error(msg, {
		position: 'top-right',
		autoClose: 1000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: true,
		progress: undefined,
	});
};

export const toastSuccess = (msg: string) => {
	toast.success(msg, {
		position: 'top-right',
		autoClose: 1000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: true,
		progress: undefined,
	});
};
