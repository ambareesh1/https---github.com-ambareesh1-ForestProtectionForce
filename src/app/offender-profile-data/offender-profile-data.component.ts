import { Component, OnInit } from '@angular/core';
import { Offender } from '../Models/OffenderModel';
import { OffenderdataService } from '../services/offenderdata.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-offender-profile-data',
  templateUrl: './offender-profile-data.component.html',
  styleUrls: ['./offender-profile-data.component.css']
})
export class OffenderProfileDataComponent implements OnInit {

  offerProfileData : Offender[] = [];
  searchValue : any = null;
  rangeDates: Date[] = [];
  constructor(private offenderDataService : OffenderdataService, private router : Router){

  }
  ngOnInit(): void {
    this.getOffenderData();
  }

  getOffenderData = () =>{
     this.offenderDataService.getOffendersData().subscribe((data)=>{
        this.offerProfileData = data;
        console.log(data);
     })
  }

  editOffenderData = (offender:Offender) =>{

  }

  viewOffenderHistory=(offender:Offender)=>{
    this.router.navigate(['/history']);
  }

  viewOffenderProfile=(offender:Offender)=>{

  }

   navigateToOffender = () =>{
    this.router.navigate(['/offenderprofile']);
  }


}
