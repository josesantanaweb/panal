export interface AddPropertyProps {}

export interface IOwnerLessor {
  name: string,
  lastName: string,
  rut: string,
  email: string,
  fono: string,
  privateObservations: string,
  propertyTypeId: number,
  customerId: number,
  rolNumber: number,
}

export interface IAddress {
  country: string,
  region: string,
  city: string,
  commune: string,
  number: number,
  sector: string,
  address: string,
}

export interface IDistribution {
  numberOfSuites: number,
  rooms: number,
  serviceRooms: number,
  totalRooms: number,
  bathrooms: number,
  totalBathrooms: number,
  livingRoom: number,
  studio: boolean,
  warehouse: boolean,
  receipts: boolean,
  serviceBathrooms: boolean,
}

export interface IObservation {
  publicTitle: string,
  description: string,
}

export interface ICharacteristics {
  constructedSurface: string,
  terraceSurface: string,
  typeOfFloor: number,
  typeOfApartment: number,
  finalReception: number,
  orientation: number,
  numberOfFloors: number,
  numberOfElevators: number,
  washingMachine: number,
  typeOfGas: number,
  typeOfHotWater: number,
  typeOfHeating: number,
  typeOfKitchen: number,
  typeOfConstruction: number,
  typesOfWindows: number,
  furnished: boolean,
  regularized: boolean,
  petsAllowed: boolean,
  outdoorParkingNumber: number,
  subwayParkingNumber: number,
  gym: boolean,
  multipurposeRooms: boolean,
  childrensGames: boolean,
  barbecue: boolean,
  studyRoom: boolean,
  pool: boolean,
  laundryRoom: boolean,
  parkingVisit: boolean,
  haveAPoster: boolean,
  keysInTheOffice: boolean,
}
export interface IValues {
  name: string,
  operationId: number,
  currencyTypeId: number,
  price: string,
  realtorSalerId: number,
  realtorBuyerId: number,
  realtorCatcherId: number,
  commission: string,
  ownerLessor: IOwnerLessor,
  address: IAddress,
  distribution: IDistribution,
  characteristics: ICharacteristics,
  observation: IObservation,
}
