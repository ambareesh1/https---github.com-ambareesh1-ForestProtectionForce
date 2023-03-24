import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UserDetails } from '../Models/UserDetails';
import { UserTypes } from '../Models/UserTypes';
import { UserDetailService } from '../services/user-detail.service';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css']
})
export class CreateAdminComponent implements OnInit {
  userForm: FormGroup =new FormGroup({});
  userTypes : UserTypes[] = [];
  userDetails : UserDetails[] = [];
  isEdit : boolean = false;
  constructor(private formBuilder: FormBuilder, private userDetailsService : UserDetailService, private messageService : MessageService) { }

  ngOnInit(): void {
    this.initFormUserDetails({} as UserDetails);

    this.getUserTypes();
    this.getUserDetails();
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

  onSubmitUserDetails(): void {

    if(this.userForm.valid){
    
      let userDetails: UserDetails = {
        id:  this.isEdit? this.userForm.value.id : 0,
        userType_Id: this.userForm.value.userType_Id,
        userType_Name: this.userTypes.filter(x=>x.id == this.userForm.value.userType_Id)[0].name,
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
        updatedOn: new Date()
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
    this.initFormUserDetails(userDetails);
  }

  ActivateUserDetails = (userDetails : UserDetails) =>{
    userDetails.isActive = !userDetails.isActive;
    this.userDetailsService.lockOrUnLockUserDetails(userDetails, userDetails.id).subscribe(data=>{
      let provinceAddmsg = userDetails.isActive ? userDetails.username+" profile is unlocked": userDetails.username+" profile is locked";
      this.messageService.add({severity:'success', summary: 'Successful', detail: provinceAddmsg, life: 10000});
    })
  }
}
