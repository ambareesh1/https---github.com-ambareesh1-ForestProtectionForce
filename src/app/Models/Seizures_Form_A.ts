export interface  Seizures_Form_A {
    id: number;
    serialNo: string;
    name: string;
    ob_independent: any;
    during_month_independent: any;
    total_independent: any;
    ob_joint: any;
    during_month_joint: any;
    total_joint: any;
    provinceId: number;
    districtId: number;
    month: number;
    year: number;
    DateOfInsertion: Date;
    IsActive: boolean;
    LastUpdatedOn: Date;
  }