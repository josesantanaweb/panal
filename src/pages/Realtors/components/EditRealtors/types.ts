export interface EditRealtorsProps {
  setOpenModal: any;
  openModal: boolean;
  realtorId: number;
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
  website: boolean,
  address: IAdress
}
