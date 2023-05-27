import { of } from 'rxjs';
import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { AuthenticationService } from '../services/authentication.service';
import { SharedService } from '../services/shared.service';
import { UserDetailService } from '../services/user-detail.service';
import { ManagedataService } from '../services/managedata.service';
import { UserTypeService } from '../services/user-type.service';
import {moveFromRightToLeftAnimation} from '../animations/custom-animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [moveFromRightToLeftAnimation]
})
export class NavbarComponent {


  name: string = '';
  userName: string = '';
  districtName :  string = '';
  provisionName : string = '';
  userType : string = '';
  isUserLoggedIn : any;
  isLoggedIn$ = this.authService.isLoggedIn$;
  isOnlyDistrictVisibility : boolean = false;


  constructor(private authService: AuthServiceService, private sharedService:SharedService, 
    private router : Router, private userDetailsService : UserDetailService, private manageDataService : 
    ManagedataService, private userTypeService : UserTypeService) { 
          this.isOnlyDistrictVisibility = this.sharedService.isUserCaseEntryOperatorOrDuptyDirector();
          
    }

    async ngOnInit() {
      this.authService.isLoggedIn$.subscribe(async (value) => {
        this.isUserLoggedIn = localStorage.getItem('isLoggedIn');
        this.isOnlyDistrictVisibility = this.sharedService.isCaseEntryOperator() || this.sharedService.isDuptyDirector();
        if (this.isUserLoggedIn) {
          let details = this.sharedService.getUserDetails();
          this.name = details.name;
          this.userName = details.username;
          this.userType = details.roleName;
          //is Superadmin of jammu & kashmir
          if (this.sharedService.isSuperAdminOrJammuOrKashmir()) {
            this.setProvinceAndUserTypeForSuperadmin();
          }else{
            //if user is not super admin but deputy director or case entry operator
            let x = await this.userDetailsService.getUserDetailsByUserName(this.userName).toPromise();
            if (this.isOnlyDistrictVisibility) {
              (await this.getDistrictName(x)).subscribe((district)=>{
                  this.districtName = district.name;
              })
            } else {
               //if user is only director
              (await this.getProvinceName(x)).subscribe((province)=>{
                this.provisionName = province.name;
              });
            }
            (await this.getUserTypes(x)).subscribe((usertype)=>{
              this.userType = usertype.name;
            });
          }
        } else {
          this.userName = '';
        }
      });
    }

  async getUserDetailsByUserName(username: string) {
    // Example implementation using `of` to return the user details as an Observable
    const userDetails = this.userDetailsService.getUserDetailsByUserName(username);
    return of(userDetails);
  }
  async getDistrictName(userDetails: any) {
   return  this.manageDataService.getDistricteByid(userDetails.districtId);
  }
  
  async getProvinceName(userDetails: any) {
    debugger;
   return  this.manageDataService.getProvinceByid(userDetails.provinceId);
  
  }

  async getUserTypes(userDetails:any){
    return   this.userTypeService.getUserTypesById(userDetails.userType_Id);
  }

  notASuperAdminOfAnyProvince = () =>{
    return !(this.sharedService.isSuperAdmin() || this.sharedService.isSuperAdminOfJammu()  || this.sharedService.isSuperAdminOfKashmir() )
  }
 
  setProvinceAndUserTypeForSuperadmin = () => {
    if (this.userName === 'superadmin') {
      this.provisionName = 'Jammu & Kashmir';
      this.userType = 'Super Admin'
    } else if (this.userName === 'superadmin_kashmir') {
      this.provisionName = 'Kashmir';
      this.userType = 'Super Admin of Kashmir'
    } else {
      this.provisionName = 'Jammu';
      this.userType = 'Super Admin of Jammu'
    }
  }

  logout() {
    this.isUserLoggedIn = false;
    this.authService.logout();
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.clear();
    this.userName = '';
    this.router.navigate(['/']);
  }
}
