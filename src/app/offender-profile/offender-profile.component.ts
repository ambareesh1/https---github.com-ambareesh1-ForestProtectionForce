import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-offender-profile',
  templateUrl: './offender-profile.component.html',
  styleUrls: ['./offender-profile.component.css']
})
export class OffenderProfileComponent {
  myForm: FormGroup =new FormGroup({});

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      fatherName: ['', Validators.required],
      caste: ['', Validators.required],
      trade: ['', Validators.required],
      dateOfPhotography: ['', Validators.required],
      photo: ['', Validators.required]
    });
  }

  onSubmit(): void {
    // Do something with the form data
  }
}