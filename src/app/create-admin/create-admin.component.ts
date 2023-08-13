import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserDetails } from '../Models/UserDetails';
import { UserTypes } from '../Models/UserTypes';
import { UserDetailService } from '../services/user-detail.service';
import { map, of } from 'rxjs';
import { CircleView, District, Province } from '../Models/ManageDataModels';
import { ManagedataService } from '../services/managedata.service';
import { emailValidator, phoneValidator, usernameTakenValidator } from '../custom-validators/customvalidators';
import {UserTypeEnum} from '../enums/UsereTypes';
import {markAllFieldsAsDirty} from '../utilities/makedirty'
import { fadeInEffect } from '../animations/custom-animations';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css'],
  animations:[fadeInEffect]
})
export class CreateAdminComponent implements OnInit, AfterViewInit {
  userForm: FormGroup = new FormGroup({});
  userTypes: UserTypes[] = [];
  province: Province[] = [];
  circle: CircleView[] = [];
  district: District[] = [];
  userDetails: UserDetails[] = [];
  isEdit: boolean = false;
  isUsernameTaken: boolean = false;
  isEmailTaken: boolean = false;
  isPhoneNoTaken: boolean = false;
  isProvinceRequired: boolean = true;
  isDistrictRequired: boolean = false;
  editOrCreateText: string = "Create Users";
  userTypeId : number = 1;
  isEditOrCaseEntryOperatorSelected:boolean = false;
  usernameToCompare : any;
  editedUserDetails : any;
  search : any = "";

  constructor(private formBuilder: FormBuilder, private userDetailsService: UserDetailService,
    private messageService: MessageService, private manageDataService: ManagedataService, 
    private confirmationService: ConfirmationService, private sharedService : SharedService) {
      
     }
  ngAfterViewInit(): void {
    if(this.isEditOrCaseEntryOperatorSelected){
      // this.userForm.controls['province'].disable();
      // this.userForm.controls['circle'].disable();
      // this.userForm.controls['district'].disable();
    }

  }

  ngOnInit(): void {
    this.getDistrictData();
    this.initFormUserDetails({} as UserDetails);
    this.getUserTypes();
    this.getUserDetails();
    this.isEditOrCaseEntryOperatorSelected = this.sharedService.isUserCaseEntryOperatorOrDuptyDirector();
  }

  getUserTypes = () => {
    this.userDetailsService.getUserTypes().subscribe(data => {
      this.userTypes = data;
    })
  }

  getUserDetails = () => {
    this.userDetailsService.getUserDetails().subscribe(data => {
      
      const userDetails = JSON.parse(window.localStorage.getItem('userDetails')!);
     this.usernameToCompare = userDetails.username;
      this.userDetails = data;
    })
  }

  getProvinceData() {
    this.manageDataService.getProvince().subscribe((data) => {
      let userProvince = this.sharedService.getProvinceForSuperAdminOrNormal();
      data = userProvince == 0 ? data :  data.filter(x=>x.id === userProvince)
      data.unshift({
        id: -1,
         name: 'Select',
        isActive: false
      });
    
      this.province = data;
    })
  }
  getCircleData() {
    this.manageDataService.getCircle().subscribe((data) => {
      this.circle = data;
    })
  }

  getDistrictData() {
    this.manageDataService.getDistrict().subscribe((data) => {
      this.district = data;
    });
  }

  onChangeUserType = (event: any) => {
    this.getProvinceData();
    this.userTypeId = event.value;
    //this.userTypeId == UserTypeEnum.CaseEntryOperator ? this.removeValidator() : this.addValidator();
    this.ProvinceCircleDistrictDDlVisibility(event.value);
  }


  onProvinceChange = (event: any) => {
    if (event.value == -1) {
      this.circle = [];
      this.district = [];
      return;
    }
    this.manageDataService.getCircle().subscribe((data) => {
      data = data.filter(x => x.provinceId == event.value);
      data.unshift({
        id: -1, name: 'Select',
        provinceId: -1,
        isActive: false,
        province: { id: 1, name: "", isActive: false }
      });
      this.circle = data;
    })
    this.district = [];
  }

  onCircleChange = (event: any) => {
    if (event.value == -1) {
      this.circle = [];
      this.district = [];
      return;
    }
    this.manageDataService.getDistrict().subscribe((data) => {
      data = data.filter(x => x.circleId == event.value);
      data.unshift({
        id: -1, name: 'Select',
        circleId: -1,
        isActive: false,
        circle: { id: -1, name: "", isActive: false, provinceId: -1 },
        provinceId: 0
      });
      this.district = data;
    })
  }

  onSubmitUserDetails(): void {
    
    if (this.userForm.valid) {
    let userDetails: UserDetails = {
      id: this.isEdit ? this.userForm.value.id : 0,
      userType_Id: this.userForm.value.userType_Id,
      userType_Name: this.userTypes.filter(x => x.id == this.userForm.value.userType_Id)[0].name,
      username: this.userForm.value.username,
      password:  this.userForm.value.password,
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
      circleId: this.userForm.value.circle ,
      districtId: this.userForm.value.district == null ? this.sharedService.getDistrictId() : this.userForm.value.district,
      otp: 0
    }
    let userType = this.userForm.value.userType_Id;
    //if (userType == UserTypeEnum.CaseEntryOperator || userType == UserTypeEnum.DeputyDirector && this.isEdit) {
      
      //this.checkUserOfDistrictAlreadyExist(userDetails);
       //this.checkUserOfDistrictAlreadyExist(userDetails);
    
   // } else {
      this.saveAndUpdateTheData(userDetails);
    //}
  }else{
    markAllFieldsAsDirty(this.userForm);
    let provinceAddmsg = "Please fill all required details with valid input.";
    this.messageService.add({
      severity: 'warning',
      summary: 'Validation fails',
      detail: provinceAddmsg,
      life: 5000,
      contentStyleClass: 'bg-warning'
    });
  }
  }

  saveAndUpdateTheData = (userDetails: UserDetails) => {
      if (this.isEdit) {
        this.userDetailsService.editUserDetails(userDetails, userDetails.id).subscribe(x => {
          let provinceAddmsg = "User details updated for the username " + userDetails.username + "";
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: provinceAddmsg, life: 50000 });
          this.userForm.reset();
          this.getUserDetails();
          this.isEdit = false;
          
        })
      } else {
        this.userDetailsService.createUserDetails(userDetails).subscribe(data => {
          if (data) {
            let username = data.username;
            let provinceAddmsg = "User details saved & user name is :" + username + "";
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: provinceAddmsg, life: 10000 });
            this.userForm.reset();
            this.getUserDetails();
          }
        })
    } 
    this.getUserDetails();
  }

  initFormUserDetails = (userDetails: UserDetails = {} as UserDetails) => {
    
    this.userForm = this.formBuilder.group({
      id: [this.isEdit ? userDetails.id : 0 || 0],
      userType_Id: [userDetails.userType_Id || 0],
      userType_Name: [userDetails.userType_Name || ''],
      province: [userDetails.provinceId || 0],
      circle: [userDetails.circleId || 0],
      district: [userDetails.districtId || 0],
      username: [userDetails.username || '',  Validators.required ,this.isEdit ? '' :  usernameTakenValidator(this.userDetailsService)],
      password: ['' || userDetails.password],
      firstName: [userDetails.first_Name || '', Validators.required],
      lastName: [userDetails.last_Name || '', Validators.required],
      email: [userDetails.email || '', [Validators.required, Validators.email], this.isEdit ? '' : [emailValidator(this.userDetailsService)]],
      alternateEmail: [userDetails.alternate_Email || ''],
      mobile: [userDetails.mobile || '', Validators.required,this.isEdit ? '' : [phoneValidator(this.userDetailsService)]],
      address: [userDetails.address || '', Validators.required],
      isActive: [true]
    });
    this.setDistrictOnAndDisableOtherControls();
  }

  editUserDetails = (userDetails: UserDetails) => {
    
    this.isEdit = true;
    this.disableTheControlsOnEdit();
    this.editOrCreateText = "Update User";
    this.getCircleData();
    this.getDistrictData();
    this.getProvinceData();
    this.ProvinceCircleDistrictDDlVisibility(userDetails.userType_Id);
    this.editedUserDetails = userDetails;
    this.initFormUserDetails(userDetails);
  }

  ActivateUserDetails = (userDetails: UserDetails) => {
    userDetails.isActive = !userDetails.isActive;
    this.userDetailsService.lockOrUnLockUserDetails(userDetails, userDetails.id).subscribe(data => {
      let provinceAddmsg = userDetails.isActive ? userDetails.username + " profile is unlocked" : userDetails.username + " profile is locked";
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: provinceAddmsg, life: 10000 });
    })
  }

  ProvinceCircleDistrictDDlVisibility = (value: any) => {
    this.isProvinceRequired = value == 2 || value == 3 || value == 4 ? true : false; // terinary operator
    this.isDistrictRequired = value == 3 || value == 4 ? true : false;
  }

  onFocusUsername(event: any) {
    const usernameControl = this.userForm.get('username');
    if (usernameControl && usernameControl.value) {
      this.userDetailsService.verifyUserName(usernameControl.value).subscribe(x => {
        this.isUsernameTaken = true;
      })
    }
  }

  onFocusEmail(event: any) {
    const usernameControl = this.userForm.get('username');
    if (usernameControl && usernameControl.value) {
      this.userDetailsService.verifyEmail(usernameControl.value).subscribe(x => {
        this.isEmailTaken = true;
      })
    }
  }
  onFocusPhone(event: any) {
    const usernameControl = this.userForm.get('username');
    if (usernameControl && usernameControl.value) {
      this.userDetailsService.verifyPhone(usernameControl.value).subscribe(x => {
        this.isPhoneNoTaken = true;
      })
    }
  }

  checkUserOfDistrictAlreadyExist = (userDetails: UserDetails) => {
    
    this.userDetailsService.verifyEmail(userDetails.email).subscribe((alreadyExistedUser) => {
      if (alreadyExistedUser != null) {
        let district = this.district.filter(x=>x.id == alreadyExistedUser.districtId)[0].name;
        this.confirmationService.confirm({
          message: `<div style="font-size: 16px; line-height: 1.2;">
          <p style="margin-bottom: 10px;">The user <strong>${alreadyExistedUser.first_Name} ${alreadyExistedUser.last_Name}</strong> already exists in the database with district : <strong>${district}</strong>.</p>
          <p style="margin-bottom: 10px;">Email  <strong>${alreadyExistedUser.email} </strong> </p>
          <p style="margin-bottom: 10px;">  Phone No : <strong>${alreadyExistedUser.mobile}</strong>. </p>
          <p style="margin-bottom: 10px;>  Address: <strong>${alreadyExistedUser.address}</strong>.</p> </p>
          <p style="margin-bottom: 10px;"><b>Do you want to interchange the details? </b> </p>
          <p style="margin-bottom: 10px;">Are you sure you want to proceed?</p>
        </div>`,
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
          // Interchanging the user details with existing user 
          let currentUserEmail = this.editedUserDetails.email;
          let currentUserPhone = this.editedUserDetails.mobile;
          let currentAdress = this.editedUserDetails.address;
          let currentAlternateEmail = this.editedUserDetails.alternate_Email;
          let currentFirstName = this.editedUserDetails.first_Name;
          let currentLastName = this.editedUserDetails.last_Name;

          userDetails.email = alreadyExistedUser.email
          userDetails.address = alreadyExistedUser.address;
          userDetails.mobile = alreadyExistedUser.mobile;
          userDetails.alternate_Email = alreadyExistedUser.alternate_Email;
          userDetails.first_Name = alreadyExistedUser.first_Name;
          userDetails.last_Name = alreadyExistedUser.last_Name;

           this.saveAndUpdateTheData(userDetails);

           alreadyExistedUser.email = currentUserEmail;
           alreadyExistedUser.address = currentAdress;
           alreadyExistedUser.alternate_Email = currentAlternateEmail;
           alreadyExistedUser.mobile = currentUserPhone;
           alreadyExistedUser.first_Name = currentFirstName;
           alreadyExistedUser.last_Name = currentLastName;

           this.saveAndUpdateTheData(alreadyExistedUser);
          // locking the user if already exists with same district
          // this.ActivateUserDetails(alreadyExistedUser);

          }, reject: () => {

          }
        });
      }else{
        this.saveAndUpdateTheData(userDetails);
      }
    })
  }

   // as of now not using 
  checkUserAlreadyExistInOtherDepartment = (userDetails: UserDetails) => {
    
    this.userDetailsService.verifyUserAlreadyExistedWithSameDistrict(userDetails).subscribe((alreadyExistedUser) => {
      if (alreadyExistedUser != null) {
        let district = this.district.filter(x=>x.id == userDetails.districtId)[0].name;
        this.confirmationService.confirm({
          message: `<div style="font-size: 16px; line-height: 1.2;">
          <p style="margin-bottom: 10px;">The user <strong>${userDetails.first_Name} ${userDetails.last_Name}</strong> already exists in the database with district : <strong>${district}</strong>.</p>
          <p style="margin-bottom: 10px;">If you create the user with the same details, the previous user will be locked automatically in other district.</p>
          <p style="margin-bottom: 10px;">Are you sure you want to proceed?</p>
        </div>`,
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {

           this.saveAndUpdateTheData(userDetails);
          // locking the user if already exists with same district
           this.ActivateUserDetails(alreadyExistedUser);

          }, reject: () => {

          }
        });
      }else{
        this.saveAndUpdateTheData(userDetails);
      }
    })
  }

  setDistrictOnAndDisableOtherControls = () =>{
    
    
      if(this.sharedService.isUserCaseEntryOperatorOrDuptyDirector()){
        this.getDistrictData();
        this.getCircleData();
        this.getProvinceData();
       this.userDetailsService.getUserDetailsByUserName(this.sharedService.getUserName()).subscribe((x)=>{
        
        this.userForm.controls['province'].setValue(x.provinceId);
          this.userForm.controls['circle'].setValue(x.circleId);
          this.userForm.controls['district'].setValue(x.districtId);
         
       })
      }
  }

  getDistrictName = (district : any) =>{
    this.district.filter(x=> x.id == district)[0].name;
  }

 // Remove the validator from the form control
 removeValidator() {
  this.emailControl?.clearAsyncValidators();
  this.emailControl?.updateValueAndValidity();

  this.phoneControl?.clearAsyncValidators();
  this.phoneControl?.updateValueAndValidity();
}

// Add the validator back to the form control
addValidator() {
  this.emailControl?.setValidators([Validators.required, Validators.email]);
  this.emailControl?.addAsyncValidators([emailValidator(this.userDetailsService)])
  this.emailControl?.updateValueAndValidity();

  this.phoneControl?.setValidators([Validators.required]);
  this.phoneControl?.addAsyncValidators([phoneValidator(this.userDetailsService)]);
  this.phoneControl?.updateValueAndValidity();
}
   

  onReset = () => {
   
    this.isDistrictRequired = false;
    this.isProvinceRequired = false;
    this.isEdit = false;
    this.editOrCreateText = "Create Users";
    this.enableTheControlsOnEdit();
    this.userForm.reset();

  }

  disableTheControlsOnEdit = () =>{
    this.userForm.get('username')?.disable();
    this.userForm.get('email')?.disable();
    this.userForm.get('mobile')?.disable();
    this.userForm.get('userType_Id')?.disable();
    this.userForm.get('province')?.disable();
    this.userForm.get('circle')?.disable();
    this.userForm.get('district')?.disable();

  }
  enableTheControlsOnEdit = () =>{
    this.userForm.get('username')?.enable();
    this.userForm.get('email')?.enable();
    this.userForm.get('mobile')?.enable();
    this.userForm.get('userType_Id')?.enable();
    this.userForm.get('province')?.enable();
    this.userForm.get('circle')?.enable();
    this.userForm.get('district')?.enable();
  }

  get usernameControl() {
    return this.userForm.get('username');
  }
  get emailControl() {
    return this.userForm.get('email');
  }
  get phoneControl() {
    return this.userForm.get('mobile');
  }
}
