export interface DisposedCasesModel {
    id: number;
    caseId: string;
    dateOfFillingComplaints: Date;
    nameOfCourt: string;
    toolsAmplements: string;
    noOfAccused: number;
    finalDisposalOfCase: number;
    ifConvictedPunishment: string;
    attachment: string;
    sectionsOfLaws: string;
    detailsOfSeizuresRecory: string;
    nameOfAccused: string;
    amount: number;
    appealFilledIfAny: string;
    district: number;
    province: number;
    lastUpdatedDate: Date;
    updatedBy: string;
    isActive: boolean;
  }
  