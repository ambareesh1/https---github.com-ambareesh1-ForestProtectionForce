export interface Superadmin {
    id: number;
    username: string;
    password : string;
    mobile: string;
    email: string;
    alternativeemail: string;
    province: number;
    ipaddress: string;
    name : string,
    roleId : number,
    roleName: string,
    otp:number,
    lastupdatedOn: Date
}