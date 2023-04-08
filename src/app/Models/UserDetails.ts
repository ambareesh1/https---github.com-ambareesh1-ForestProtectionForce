export interface UserDetails {
    id: number;
    userType_Id: number;
    userType_Name:string;
    provinceId : number;
    circleId : number;
    districtId : number;
    username: string;
    password: string;
    first_Name: string;
    last_Name: string;
    email: string;
    alternate_Email: string;
    mobile: string;
    address: string;
    isActive:boolean;
    createdOn: Date;
    updatedOn: Date;
    otp:number;
  }
  