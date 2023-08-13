import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { AuthenticationService } from '../services/authentication.service';
import { SharedService } from '../services/shared.service';
import { UserDetailService } from '../services/user-detail.service';
import { SuperadminService } from '../services/superadmin.service';
import { markAllFieldsAsDirty } from '../utilities/makedirty';
import { passwordValidator } from '../custom-validators/customvalidators';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  captcha: string = "";
  siteKey = 'your_site_key';
  changeForm!: FormGroup;
  messages: Message[]=[];
  isLoading:boolean = false;
  isSuperAdminOrJammuOrkashmir: boolean = false;
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private authService : AuthenticationService,
    private userDetailsService : UserDetailService,
    private sharedService: SharedService,
    private superadminServices : SuperadminService

  ) {
       if(this.sharedService.isSuperAdminOrJammuOrKashmir()){
        this.isSuperAdminOrJammuOrkashmir = true;
       }
   }

   ngOnInit(): void {
    this.changeForm = this.formBuilder.group({
      password: ['', Validators.required],
      newpassword: ['', Validators.compose([Validators.required, passwordValidator])],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.matchingPasswords('newpassword', 'confirmPassword')
    });
  }
  
  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup) => {
      const password = group.controls[passwordKey];
      const confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return confirmPassword.setErrors({ mismatchedPasswords: true });
      }
    }
  }

  onSubmitPassword = ()=>{
    console.log(this.changeForm)
    
   this.isLoading = true;
    let userName = this.sharedService.getUserDetails().username;
    let password = this.changeForm.value.password;
    let newpassword = this.changeForm.value.newpassword;
   if(this.changeForm.valid){
    if(this.isSuperAdminOrJammuOrkashmir){
      this.superadminServices.changeSuperPassword(userName, password, newpassword).subscribe(x=>{
        if(x !=null ){
          this.isLoading = false;
          this.changeForm.reset();
          this.messages = [{ severity: 'success', summary: 'Success', detail: 'The password changed sucessfully. Please login again. ',   }];
          // setInterval(() => {
          //   localStorage.clear();
          //   this.router.navigate(['']);
          // }, 5000);
         this.isLoading = false
        }else {
          this.messages = [{ severity: 'error', summary: 'Error', detail: 'Invalid password. Please provide valid password' }];
        }
      })
    }else{
      this.userDetailsService.changePassword(userName, password, newpassword).subscribe(x=>{
        if(x !=null ){
          this.isLoading = false;
          this.changeForm.reset();
          this.messages = [{ severity: 'success', summary: 'Success', detail: 'The password changed sucessfully. Please login again. ',   }];
          // setInterval(() => {
          //   localStorage.clear();
          //   this.router.navigate(['']);
          // }, 5000);
         
        }else {
          this.messages = [{ severity: 'error', summary: 'Error', detail: 'Invalid password. Please provide valid password' }];
        }
      })
    }
  }else{
    markAllFieldsAsDirty(this.changeForm);
    this.messages = [{ severity: 'warn', summary: 'Error', detail: 'Please enter the required data. ',   }];
  }
 
  } //SQL 1. 


  get passwordControl() {
    return this.changeForm.get('newpassword');
  }
}
