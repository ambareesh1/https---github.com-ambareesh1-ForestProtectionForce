import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UserDetails } from '../Models/UserDetails';
import { SharedService } from '../services/shared.service';
import { UserDetailService } from '../services/user-detail.service';

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.css']
})
export class ManageProfileComponent implements OnInit {

  userForm: FormGroup =new FormGroup({});
  passwordForm: FormGroup = new FormGroup({});
  userDetails : UserDetails[] =[];

  constructor(private formBuilder: FormBuilder, private userDetailsService : UserDetailService, private sharedServices : SharedService, private messageService : MessageService){}

  ngOnInit(): void {

    this.passwordForm = this.formBuilder.group({
      password : ['',Validators.required],
      newPassword:['',Validators.required],
      conformPassword:['',Validators.required]
    })
    this.userDetailsService.getUserDetails().subscribe(data=>{
      this.userDetails = data.filter(x=>x.username == this.sharedServices.getUserDetails()?.username);
      this.initForm(this.userDetails[0]);
    })

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

  onSubmitIserDetails = () =>{

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
        updatedOn: new Date()
      }
    
      this.userDetailsService.editUserDetails(userDetails, userDetails.id).subscribe(data=>{
      
          this.messageService.add({severity:'success', summary: 'Successful', detail: "Details Updated Successfully.", life: 10000});
       
      })
    }

  }

  onSubmitPassword = () =>{
    
  }

}
