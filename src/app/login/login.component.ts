import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
    loading = false;
    submitted = false;

  constructor(private router: Router, 
     private formBuilder: FormBuilder,
   
   ) {}

 
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      captcha : ['', Validators.required]
  });
  }

  public onSubmit = () =>{
   
    console.log("aa");

    // Navigate back to login page
    this.router.navigate(['/TwoWayAuthentication']);
  }

}
