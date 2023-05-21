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

  ngOnInit() {
     this.authService.isLoggedIn$.subscribe((value)=>{
      this.isUserLoggedIn=localStorage.getItem('isLoggedIn')
    });
    console.log(this.isUserLoggedIn)
    if (this.isUserLoggedIn) {
      debugger;
      let details = this.sharedService.getUserDetails()
      this.name = details.name;
      this.userName = details.username;
      if (this.notASuperAdminOfAnyProvince()) {
        this.userDetailsService.getUserDetailsByUserName(this.userName).subscribe((x) => {
          debugger;
          if (this.isOnlyDistrictVisibility) {
            this.getDistrictName(x);
          } else {
            this.getProvinceName(x);
          }
          this.getUserTypes(x);
        })
      }else {
        this.setProvinceAndUserTypeForSuperadmin();
      }
    }else{
      this.userName = '';
    }

  }

  getDistrictName (userDetails: any) {
    this.manageDataService.getDistricteByid(userDetails.districtId).subscribe((y)=>{
      this.districtName = y.name;
    })
  }

  getProvinceName(userDetails:any) {
    debugger;
      this.manageDataService.getProvinceByid(userDetails.provinceId).subscribe((z)=>{
        this.provisionName = z.name;
      })
      if(userDetails.userType_Id == 1){
        this.provisionName = "Jammu & Kashmir";
      }
  }

  getUserTypes(userDetails:any){
    this.userTypeService.getUserTypesById(userDetails.userType_Id).subscribe((x)=>{
      this.userType = x.name;
    })
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
