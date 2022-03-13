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
  stateId: number,
  countryId: number,
  address: string,
  detailedAddress: {
    commune: string,
    number: number,
    sector: string,
    cityId: number,
  }
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
  operationId: number,
  currencyTypeId: number,
  price: number,
  realtorSalerId: number,
  realtorBuyerId: number,
  realtorCatcherId: number,
  commission: number,
  ownerLessor: IOwnerLessor,
  address: IAddress,
  distribution: IDistribution,
  characteristics: ICharacteristics,
  observations: IObservation,
}
