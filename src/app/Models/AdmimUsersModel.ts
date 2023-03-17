export interface UserTypes {
    id?: string;
    userType?: string;
    isActive?: boolean;
}

export interface AdminUser {
    userType?: 'Director',
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    alternativeEmail:string;
    phone: string;
    address: string;
  }
  
  