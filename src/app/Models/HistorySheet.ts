export interface HistorySheet {
  id: number;
  aadharCard:string;
  offender: string;
  identifierOfficerName: string;
  usualFieldOfOperation: string;
  modusOperandi: string;
  previousHistory: string;
  placeOfHabitualResort: string;
  nameOfRelative: string;
  relationship: string;
  criminality: string;
  nameOfAssociate: string;
  parentage: string;
  address: string;
  district: number;
  province: number;
  lastUpdatedDate: Date;
  updatedBy: string;
  isActive: boolean;
}