export interface AntiPochingFormCModel{
    id: number;
    sno: number;
    fIRRegistered: string;
    noDate: string;
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