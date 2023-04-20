import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BaselineModel } from '../Models/BaselineModel';
import { BaselinedataService } from '../services/baselinedata.service';
import { ManagedataService } from '../services/managedata.service';
import { Offender } from '../Models/OffenderModel';
import { OffenderdataService } from '../services/offenderdata.service';
import { DatePipe } from '@angular/common';
import { changeColorOnStatus } from '../utilities/shared';
import { environment } from 'src/environments/environment.development';
@Component({
  selector: 'app-baseline-view',
  templateUrl: './baseline-view.component.html',
  styleUrls: ['./baseline-view.component.css']
})
export class BaselineViewComponent implements OnInit {

  baselineId : number = 0;
  baseline:BaselineModel[] = [];
  offender : Offender[] = [];
  caseId : any = "";
  reasonForrejection : string = "";
  offenderProfilePicUrl : string = environment.fileUploadPath;
  constructor(private baselineService : BaselinedataService, private ref: DynamicDialogRef, private config: DynamicDialogConfig, private manageService : ManagedataService, private offenderService : OffenderdataService){

  }
  ngOnInit(): void {
    debugger;
    this.baselineId = this.config.data;
      this.baselineService.getBaseline().subscribe(data=>{
        this.baseline = data.filter(x=>x.id == this.baselineId);
        this.caseId = this.baseline[0].caseNo;
        this.reasonForrejection = this.baseline[0].reason;
        this.bindOffenderData();
      })

  }

  bindOffenderData = async () =>{
  
      (await this.offenderService.getOffendersData()).subscribe(x=>{
        this.offender = x.filter(y=>y.caseId .includes(this.caseId));
      })
  }

  getCircleNameByid = (id:any) =>{
      this.manageService.getCircleByid(id).subscribe(data=>{
        debugger;
        return data.name;
      })
  }

  convertToDate = (onlyDate:any)=>{
    const datePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(onlyDate, 'yyyy-MM-dd');
    return formattedDate;
  }

  changeColorOnStatusOfBaselineView = (status:any) =>{
   
    return  changeColorOnStatus(status);
  }

}
