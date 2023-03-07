import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
    loading = false;
    submitted = false;
  captcha: string = "";
  siteKey = 'your_site_key';
  constructor(private router: Router, 
     private formBuilder: FormBuilder,
   
   ) {}

   get f() { return this.form.controls; }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  public onSubmit = () =>{
    // Submit forgot password form

    // Navigate back to login page
    this.router.navigate(['/TwoWayAuthentication']);
  }

}
