export interface GenerateOrderProps {
	hanleBack: () => void;
	property: any;
	openModal: boolean;
	setOpenModal: any;
}

export interface IValues {
	name: string;
	lastName: string;
	email: string;
	documentType: string;
	documentNumber: string;
	localPhone: string;
	phone: string;
	cashPayment: boolean;
	mortgage: boolean;
	address: string;
	comments: string;
}
