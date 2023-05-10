export interface Seizure_GammaUni_FormB {
    id: number;
    serialNo:number;
    provinceId: number;
    districtId: number;
    month: number;
    year: number;
    gamma_Unit: string;
    nakas_Laid: number;
    patrollings_Performed: number;
    jungle_Gashts_Performed: number;
    JOP_Reports_Received: number;
    complaints_Received: number;
    complaints_Verified: number;
    requisitions_Made: number;
    requisitions_Attended: number;
    No_Of_Fire_Fighting_Operations:number;
    dateOfInsertion: Date;
    isActive: boolean;
    lastUpdatedOn: Date;
  }
  