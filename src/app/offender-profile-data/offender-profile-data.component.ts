import { Component, OnInit } from '@angular/core';
import { Offender } from '../Models/OffenderModel';
import { OffenderdataService } from '../services/offenderdata.service';
import { Router } from '@angular/router';
import { OffenderViewComponent } from '../offender-view/offender-view.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';


@Component({
  selector: 'app-offender-profile-data',
  templateUrl: './offender-profile-data.component.html',
  styleUrls: ['./offender-profile-data.component.css']
})
export class OffenderProfileDataComponent implements OnInit {

  offerProfileData : Offender[] = [];
  searchValue : any = null;
  rangeDates: Date[] = [];
  ref: DynamicDialogRef | undefined;
  constructor(private offenderDataService : OffenderdataService, private router : Router, public dialogService: DialogService,){

  }
  ngOnInit(): void {
    this.getOffenderData();
  }

  getOffenderData = async () =>{
     (await this.offenderDataService.getOffendersData()).subscribe((data)=>{
        this.offerProfileData = data;
        console.log(data);
     })
  }

  editOffenderData = (offender:any) =>{
    this.router.navigate(['/offenderprofile/'+offender.id+'']);
  }

  viewOffenderHistory=(offender:Offender)=>{
    this.router.navigate(['/history']);
  }

  viewOffenderProfile=(offender:Offender)=>{
    this.show(offender);
  }

   navigateToOffender = () =>{
    this.router.navigate(['/offenderprofile']);
  }
  show(offender:Offender) {
    debugger;
    console.log(offender);
    this.ref = this.dialogService.open(OffenderViewComponent, {
        header: 'Offender Details',
        width: '90%',
        contentStyle: {"max-height": "600px", "overflow": "auto"},
        baseZIndex: 10000,
        data: (offender as any).id
    });
}

ngOnDestroy() {
    if (this.ref) {
        this.ref.close();
    }
}

}
