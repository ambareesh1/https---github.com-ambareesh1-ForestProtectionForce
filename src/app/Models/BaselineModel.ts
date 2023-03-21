export interface BaselineModel {
    id: number;
    dateOfDetection: Date;
    officerName: string;
    crimeDetails: string;
    toolsUsed: string;
    circleId: number;
    circleName: string;
    forestDivisionName: string;
    forestDivisionId: number;
    forestRangeName: string;
    forestRangeId: number;
    compartmentId: number;
    compartmentName: string;
    caseNo: string;
    policeStation: string;
    firNo: string;
    crimeDate: Date;
    sectionOfLaw: string;
    quantity: number;
    weight: number;
    noOfAccused: number;
    nameOfAccused: string;
    speciesDetected: string;
    itemDescription: string;
    status:string,
    isActive: boolean;
    updatedOn: Date;
    updatedBy: string;
}
