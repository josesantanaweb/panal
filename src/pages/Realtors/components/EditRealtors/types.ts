export interface EditRealtorsProps {
  setOpenModal: any;
  openModal: boolean;
  realtorId: number;
}

export interface IValues {
  name: string,
  lastName: string,
  email: string,
  identityDocumentId: number,
  identityDocumentNumber: string,
  contactPhone: string,
  password: string,
  confirm_password: string,
}
