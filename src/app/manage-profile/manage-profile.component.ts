import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UserDetails } from '../Models/UserDetails';
import { SharedService } from '../services/shared.service';
import { UserDetailService } from '../services/user-detail.service';
import { Superadmin } from '../Models/Superadmin';
import { SuperadminService } from '../services/superadmin.service';
import { fadeInEffect } from '../animations/custom-animations';

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.css'],
  animations:[fadeInEffect]
})
export class ManageProfileComponent implements OnInit {

  isSuperAdminOrJammuOrKasmir : boolean = false;
  userForm: FormGroup =new FormGroup({});
  passwordForm: FormGroup = new FormGroup({});
  userDetails : UserDetails[] =[];
  superadminDetails : Superadmin[] = [];
  constructor(private formBuilder: FormBuilder, private userDetailsService : UserDetailService, 
    private sharedServices : SharedService, private messageService : MessageService, private superadminServices : SuperadminService){
    if(this.sharedServices.isSuperAdminOrJammuOrKashmir()){
      this.isSuperAdminOrJammuOrKasmir = true;
    }
  }

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      password : ['',Validators.required],
      newPassword:['',Validators.required],
      conformPassword:['',Validators.required]
    })

     if(this.sharedServices.isSuperAdminOrJammuOrKashmir()){
      this.superadminServices.getSuperadminDetails().subscribe(data=>{
        this.superadminDetails = data.filter(x=>x.username == this.sharedServices.getUserDetails()?.username);
        this.superadminDetails[0].mobile = this.superadminDetails[0].mobile;
        this.initSuperForm(this.superadminDetails[0]);
      })
     }else{
      this.userDetailsService.getUserDetails().subscribe(data=>{
        this.userDetails = data.filter(x=>x.username == this.sharedServices.getUserDetails()?.username);
        this.initForm(this.userDetails[0]);
      })
     }
  }

  initForm = (userDetails : UserDetails) =>{
    this.userForm = this.formBuilder.group({
      userType_Id : [userDetails.userType_Id ],
      userType_Name: [userDetails.userType_Name ],
      username: [userDetails.username],
      password: [''],
      firstName: [userDetails.first_Name],
      lastName: [userDetails.last_Name],
      email: [userDetails.email ],
      alternateEmail: [userDetails.alternate_Email||''],
      mobile: [userDetails.mobile||''],
      address: [userDetails.address||''],
      isActive: [true]
    });
  }

  
  initSuperForm = (userDetails : Superadmin) =>{
    console.log(userDetails);
    let mobileNo = JSON.stringify (userDetails.mobile);
    this.userForm = this.formBuilder.group({
      userType_Id : [userDetails.id ],
      userType_Name: [userDetails.name ],
      username: [userDetails.username],
      password: [''],
      firstName: [],
      lastName: [],
      email: [userDetails.email ],
      alternateEmail: [userDetails.alternativeemail||''],
      mobile: [userDetails.mobile||''],
      address: [''],
      isActive: [true]
    });
  }

  onSubmitIserDetails = () =>{
debugger;
    if(this.sharedServices.isSuperAdminOrJammuOrKashmir()){
      if(this.userForm.value){
        let userDetails : Superadmin = {
          id: this.superadminDetails[0].id,
          username: this.superadminDetails[0].username,
          email: this.userForm.value.email,
          alternativeemail: this.superadminDetails[0].alternativeemail,
          mobile: this.userForm.value.mobile,
          province: 0,
          ipaddress: '10.10.10',
          name: 'superadmin',
          roleId: 0,
          roleName: 'superadmin',
          otp:0,
          password:this.superadminDetails[0].password,
          lastupdatedOn: new Date()
        }
        this.superadminServices.editSuperAdminDetails(userDetails, userDetails.id).subscribe(data=>{
      
          this.messageService.add({severity:'success', summary: 'Successful', detail: "Details Updated Successfully.", life: 10000});
       
      })
  
    }
    }else{
      if(this.userForm.value){
        let userDetails : UserDetails = {
          id: this.userDetails[0].id,
          userType_Id: this.userDetails[0].userType_Id,
          userType_Name: this.userDetails[0].userType_Name,
          username: this.userDetails[0].username,
          password: this.userDetails[0].password,
          first_Name: this.userForm.value.firstName,
          last_Name: this.userForm.value.lastName,
          email: this.userForm.value.email,
          alternate_Email: this.userDetails[0].alternate_Email,
          mobile: this.userForm.value.mobile,
          address: this.userForm.value.address,
          isActive: true,
          createdOn: new Date(),
          updatedOn: new Date(),
          provinceId: 0,
          circleId: 0,
          districtId: 0,
          otp:0
        }
        this.userDetailsService.editUserDetails(userDetails, userDetails.id).subscribe(data=>{
        
          this.messageService.add({severity:'success', summary: 'Successful', detail: "Details Updated Successfully.", life: 10000});
       
      })
    }

  }

  }

  onSubmitPassword = () =>{
    
  }

}
