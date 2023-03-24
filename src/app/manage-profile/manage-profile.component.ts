import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private formBuilder: FormBuilder, private userDetailsService : UserDetailService, private sharedServices : SharedService){}

  ngOnInit(): void {

    this.passwordForm = this.formBuilder.group({
      password : ['',Validators.required],
      newPassword:['',Validators.required],
      conformPassword:['',Validators.required]
    })

    this.userDetailsService.getUserDetails().subscribe(data=>{
      this.userDetails = data.filter(x=>x.username == this.sharedServices.getUserDetails()?.username);
      this.initForm(data[0]);
    })

  }

  initForm = (userDetails : UserDetails) =>{
    this.userForm = this.formBuilder.group({
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

}
