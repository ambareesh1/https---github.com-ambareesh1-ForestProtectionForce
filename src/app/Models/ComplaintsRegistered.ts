export interface ComplaintsRegistered {
    id: number;
    sno:number,
    complaintNo: string;
    dateTimeOfReceipt: Date;
    sourceOfComplaint: string;
    briefDescription: string;
    complaintArea: string;
    cognizanceUnderSection: string;
    actionTaken: string;
    nameSignMunshiMoharir: string;
    provinceId: number;
    districtId: number;
    month: number;
    year: number;
    dateOfInsertion: Date;
    isActive: boolean;
    lastUpdatedOn: Date;
    updatedBy: string;
  }