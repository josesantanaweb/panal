export interface EditCustomersProps {
  setOpenModal: any;
  openModal: boolean;
  userId: number;
}

export interface IValues {
  name: string,
  lastName: string,
  email: string,
  documentType: string,
  documentNumber: string,
  localPhone: string,
  phone: string,
  cashPayment: boolean,
  mortgage: boolean,
  address: string,
  comments: string,
}
