export interface GenerateOrderProps {
	hanleBack: () => void;
	property: any;
	setOpenModal: any;
	setSendEmail: any;
	setGeneratedOrder: any;
	setOrderId: any;
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
