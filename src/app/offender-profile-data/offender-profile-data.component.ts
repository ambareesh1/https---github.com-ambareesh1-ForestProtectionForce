import { Component, OnInit } from '@angular/core';
import { Offender } from '../Models/OffenderModel';
import { OffenderdataService } from '../services/offenderdata.service';

@Component({
  selector: 'app-offender-profile-data',
  templateUrl: './offender-profile-data.component.html',
  styleUrls: ['./offender-profile-data.component.css']
})
export class OffenderProfileDataComponent implements OnInit {

  offerProfileData : Offender[] = [];
  searchValue : any = null;
  rangeDates: Date[] = [];
  constructor(private offenderDataService : OffenderdataService){

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

  }

  viewOffenderProfile=(offender:Offender)=>{

  }


}
