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

  isLoggedIn: boolean = false;
  name: string = '';
  userName: string = '';
  districtName :  string = '';
  provisionName : string = '';
  userType : string = '';

  isOnlyDistrictVisibility : boolean = false;
  constructor(private authService: AuthServiceService, private sharedService:SharedService, 
    private router : Router, private userDetailsService : UserDetailService, private manageDataService : 
    ManagedataService, private userTypeService : UserTypeService) { 
          this.isOnlyDistrictVisibility = this.sharedService.isUserCaseEntryOperatorOrDuptyDirector();
    }

  ngOnInit() {
        if (this.authService.isLoggedIn()) {
          this.isLoggedIn = true;
          let details = this.sharedService.getUserDetails()
          this.name = details.name;
          this.userName = details.username;
          this.userDetailsService.getUserDetailsByUserName(this.userName).subscribe((x)=>{
           if(this.isOnlyDistrictVisibility){
              this.getDistrictName(x);
           }else{
               this.getProvinceName(x);
           }
            this.getUserTypes(x);
          })
        } else {
          this.name = '';
        }
  }

  getDistrictName (userDetails: any) {
    this.manageDataService.getDistricteByid(userDetails.districtId).subscribe((y)=>{
      this.districtName = y.name;
    })
  }

  getProvinceName(userDetails:any) {
    this.manageDataService.getDistricteByid(userDetails.provinceId).subscribe((z)=>{
      this.provisionName = z.name;
    })
  }

  getUserTypes(userDetails:any){
    this.userTypeService.getUserTypesById(userDetails.userType_Id).subscribe((x)=>{
      this.userType = x.name;
    })
  }

  logout() {
    localStorage.clear();
    this.userName = '';
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }
}
