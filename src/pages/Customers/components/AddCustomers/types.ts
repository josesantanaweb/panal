export interface AddCustomersProps {
  setOpenModal: any;
  openModal: boolean;
}

export interface IValues {
  name: string,
  lastName: string,
  email: string,
  identityDocumentId: number,
  identityDocumentNumber: string,
  localPhone: string,
  phone: string,
  cashPayment: boolean,
  mortgage: boolean,
  address: string,
  comments: string,
}
