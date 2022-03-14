export interface AddRealtorsProps {
  setOpenModal: any;
  openModal: boolean;
}

export interface IAdress {
  countryId: number,
  detailedAddress: {
    cityId: number,
    commune: string,
    officeNumber: number,
    address: string,
  }
}

export interface IValues {
  name: string,
  lastName: string,
  email: string,
  identityDocumentId: number,
  identityDocumentNumber: string,
  contactPhone: string,
  whatsappPhone: string,
  password: string,
  confirm_password: string,
  website: boolean,
  address: IAdress
}
