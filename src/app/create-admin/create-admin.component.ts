import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UserDetails } from '../Models/UserDetails';
import { UserTypes } from '../Models/UserTypes';
import { UserDetailService } from '../services/user-detail.service';
import { map, of } from 'rxjs';
import { CircleView, District, Province } from '../Models/ManageDataModels';
import { ManagedataService } from '../services/managedata.service';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css']
})
export class CreateAdminComponent implements OnInit {
  userForm: FormGroup =new FormGroup({});
  userTypes : UserTypes[] = [];
  province : Province[] = [];
  circle : CircleView[] = [];
  district: District[] = [];
  userDetails : UserDetails[] = [];
  isEdit : boolean = false;
  isUsernameTaken : boolean = false;
  isEmailTaken : boolean = false;
  isPhoneNoTaken : boolean = false;
  isProvinceRequired : boolean = false;
  isDistrictRequired : boolean = false;
  editOrCreateText : string = "Create Users";
  
  constructor(private formBuilder: FormBuilder, private userDetailsService : UserDetailService, private messageService : MessageService, private manageDataService: ManagedataService ) { }

  ngOnInit(): void {
    this.initFormUserDetails({} as UserDetails);

    this.getUserTypes();
    this.getUserDetails();
    this.getProvinceData();
  }

  getUserTypes = () =>{
    this.userDetailsService.getUserTypes().subscribe(data=>{
      this.userTypes = data;
    })
  }

  getUserDetails = () =>{
    this.userDetailsService.getUserDetails().subscribe(data=>{
         this.userDetails = data;
    })
  }

  getProvinceData(){
    this.manageDataService.getProvince().subscribe((data)=>{
      this.province = data;
    })
  }
  getCircleData(){
    this.manageDataService.getCircle().subscribe((data)=>{
      this.circle = data;
    })
   }

   getDistrictData(){
    this.manageDataService.getDistrict().subscribe((data)=>{
      this.district = data;
    })
   }

  onChangeUserType = (event:any) =>{
 this.ProvinceCircleDistrictDDlVisibility(event.value);
  }

  
  onProvinceChange = (event:any) =>{
    if(event.value == -1){
      this.circle = [];
      this.district = [];
      return;
    }
    this.manageDataService.getCircle().subscribe((data)=>{
      data = data.filter(x=>x.provinceId == event.value);
      data.unshift({
        id: -1, name: 'Select',
        provinceId: -1,
        isActive: false,
        province: {id:1, name:"", isActive : false}
      });
      this.circle = data;
    })
    this.district = [];
  }

  onCircleChange = (event:any) =>{
    if(event.value == -1){
      this.circle = [];
      this.district = [];
      return;
    }
    this.manageDataService.getDistrict().subscribe((data)=>{
      data = data.filter(x=>x.circleId == event.value);
      data.unshift({
        id: -1, name: 'Select',
        circleId: -1,
        isActive: false,
        circle: {id:-1, name:"", isActive:false, provinceId:-1}
      });
      this.district = data;
    })
  }

  onSubmitUserDetails(): void {
console.log(this.userForm.value);
    if(this.userForm.valid){
    
      let userDetails: UserDetails = {
        id: this.isEdit ? this.userForm.value.id : 0,
        userType_Id: this.userForm.value.userType_Id,
        userType_Name: this.userTypes.filter(x => x.id == this.userForm.value.userType_Id)[0].name,
        username: this.userForm.value.username,
        password: '',
        first_Name: this.userForm.value.firstName,
        last_Name: this.userForm.value.lastName,
        email: this.userForm.value.email,
        alternate_Email: this.userForm.value.alternateEmail,
        mobile: this.userForm.value.mobile,
        address: this.userForm.value.address,
        isActive: true,
        createdOn: new Date(),
        updatedOn: new Date(),
        provinceId: this.userForm.value.province,
        circleId: this.userForm.value.circle ?? -1,
        districtId: this.userForm.value.district ?? -1,
        otp:0
      }
      if(this.isEdit){
            this.userDetailsService.editUserDetails(userDetails, userDetails.id).subscribe(x=>{
             debugger;
              let provinceAddmsg = "Admin details updated for the username" +userDetails.username+"";
              this.messageService.add({severity:'success', summary: 'Successful', detail: provinceAddmsg, life: 50000});
              this.userForm.reset();
              this.getUserDetails();
              this.isEdit = false;
            })
      }else{
        
     
     this.userDetailsService.createUserDetails(userDetails).subscribe(data=>{
      if(data){
        let username = data.username;
        let provinceAddmsg = "Admin details saved & user name is :" +username+"";
        this.messageService.add({severity:'success', summary: 'Successful', detail: provinceAddmsg, life: 10000});
        this.userForm.reset();
        this.getUserDetails();
      }
     })
    }
    }else{
      let provinceAddmsg = "Please fill all required details";
      this.messageService.add({
        severity: 'warning',
        summary: 'Validation fails',
        detail: provinceAddmsg,
        life: 5000,
        contentStyleClass : 'bg-warning'
      });
    }
    this.getUserDetails();
    
  }

  initFormUserDetails =(userDetails: UserDetails = {} as UserDetails) =>{
    debugger;
    this.userForm = this.formBuilder.group({
      id : [this.isEdit ? userDetails.id : 0 || 0],
      userType_Id : [userDetails.userType_Id ||'',Validators.required],
      userType_Name: [userDetails.userType_Name ||''],
      province : [userDetails.provinceId || 0],
      circle : [userDetails.circleId || 0],
      district : [userDetails.districtId || 0],
      username: [userDetails.username||'', Validators.required],
      password: [''],
      firstName: [userDetails.first_Name||'', Validators.required],
      lastName: [userDetails.last_Name||'', Validators.required],
      email: [userDetails.email || '', [Validators.required, Validators.email]],
      alternateEmail: [userDetails.alternate_Email||''],
      mobile: [userDetails.mobile||'', Validators.required],
      address: [userDetails.address||'', Validators.required],
      isActive: [true]
    });

  }

  editUserDetails = (userDetails : UserDetails) =>{
    this.isEdit = true;
    this.editOrCreateText = "Update User";
    this.getCircleData();
    this.getDistrictData();
    this.ProvinceCircleDistrictDDlVisibility(userDetails.userType_Id);
    this.initFormUserDetails(userDetails);
  }

  ActivateUserDetails = (userDetails : UserDetails) =>{
    userDetails.isActive = !userDetails.isActive;
    this.userDetailsService.lockOrUnLockUserDetails(userDetails, userDetails.id).subscribe(data=>{
      let provinceAddmsg = userDetails.isActive ? userDetails.username+" profile is unlocked": userDetails.username+" profile is locked";
      this.messageService.add({severity:'success', summary: 'Successful', detail: provinceAddmsg, life: 10000});
    })
  }

   ProvinceCircleDistrictDDlVisibility = (value:any) =>{
    this.isProvinceRequired = value == 2 || value == 3 ||value == 4  ? true : false; // terinary operator
    this.isDistrictRequired = value == 3 || value == 4 ? true : false;
   }

  onFocusUsername(event: any) {
    const usernameControl = this.userForm.get('username');
    if (usernameControl && usernameControl.value) {
      this.userDetailsService.verifyUserName(usernameControl.value).subscribe(x=>{
        this.isUsernameTaken = true;
      })
    }
  }

  onFocusEmail(event: any) {
    const usernameControl = this.userForm.get('username');
    if (usernameControl && usernameControl.value) {
      this.userDetailsService.verifyEmail(usernameControl.value).subscribe(x=>{
        this.isEmailTaken = true;
      })
    }
  }
  onFocusPhone(event: any) {
    const usernameControl = this.userForm.get('username');
    if (usernameControl && usernameControl.value) {
      this.userDetailsService.verifyPhone(usernameControl.value).subscribe(x=>{
        this.isPhoneNoTaken = true;
      })
    }
  }

  onReset = () =>{
    this.isDistrictRequired = false;
    this.isProvinceRequired = false;
    this.isEdit = false;
    this.editOrCreateText = "Create Users";
    this.userForm.reset();
  }


}
