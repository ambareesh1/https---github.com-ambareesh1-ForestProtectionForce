import { Component } from '@angular/core';
import { Offender } from '../Models/OffenderModel';
import { OffenderdataService } from '../services/offenderdata.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ManagedataService } from '../services/managedata.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-offender-view',
  templateUrl: './offender-view.component.html',
  styleUrls: ['./offender-view.component.css']
})
export class OffenderViewComponent {
 offenderId : number = 0;
  offender : any[] = [];
  caseId : any = "";
  constructor(private offenderService : OffenderdataService, private ref: DynamicDialogRef, private config: DynamicDialogConfig, private manageService : ManagedataService){

  }
  ngOnInit(): void {
    debugger;
    this.offenderId = this.config.data;
      this.offenderService.getOffendersData().subscribe((data:any)=>{
        this.offender = data.filter((x:any)=>x.id == this.offenderId);
        console.log(this.offender);
      })

  }

  bindOffenderData = () =>{
    debugger;
      this.offenderService.getOffendersData().subscribe(x=>{
       
        this.offender = x.filter(y=>y.caseId == this.caseId);
      })
  }


  convertToDate = (onlyDate:any)=>{
    const datePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(onlyDate, 'yyyy-MM-dd');
    return formattedDate;
  }
}
