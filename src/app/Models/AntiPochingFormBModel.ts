export interface AntiPochingFormBModel {
    id: number;
    sno: number;
    article: string;
    unit: number;
    details: string;
    provinceId: number;
    districtId: number;
    month: number;
    year: number;
    dateOfInsertion: Date;
    isActive: boolean;
    lastUpdatedOn: Date;
    updatedBy: string;
  }
  