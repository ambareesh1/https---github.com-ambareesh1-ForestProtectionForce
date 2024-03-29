import { Component } from '@angular/core';
import { BaselineModel } from '../Models/BaselineModel';
import { BaselinedataService } from '../services/baselinedata.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BaselineViewComponent } from '../baseline-view/baseline-view.component';
import { SharedService } from '../services/shared.service';
import {changeColorOnStatus} from '../utilities/shared';
import { fadeInEffect } from '../animations/custom-animations';
@Component({
  selector: 'app-baseline-grid',
  templateUrl: './baseline-grid.component.html',
  styleUrls: ['./baseline-grid.component.css'],
  animations:[fadeInEffect]
})
export class BaselineGridComponent {

  baselineData : BaselineModel[] = [];
  searchValue : any = null;
  rangeDates: Date[] = [];
  ref: DynamicDialogRef | undefined;
  isDataLoaded : boolean = false;
  constructor(private baselineDataService : BaselinedataService, private router: Router,
    public dialogService: DialogService, public messageService: MessageService, private sharedService: SharedService){

  }
  ngOnInit(): void {
    this.isDataLoaded = true;
    this.getOffenderData();
  }

  getOffenderData = () =>{
     this.baselineDataService.getBaseline().subscribe((data)=>{
        this.baselineData = data;
        this.isDataLoaded = false;
     })
  }

  convertToDate = (onlyDate:any)=>{
    const datePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(onlyDate, 'yyyy-MM-dd');
    return formattedDate;
  }

  editBaseline = (baseline:BaselineModel) =>{
    this.router.navigate(['/baselinedata/'+baseline.id+'']);
  }

  viewBaseline=(baseline:BaselineModel)=>{
    this.show(baseline);
  }

  addOffender=(baseline:BaselineModel)=>{
    this.sharedService.setCaseId(baseline.caseNo);
    this.router.navigate(['/offenderprofile'], { queryParams: { data: baseline.caseNo } });
  }

  onDateRangeSelect=(event:any)=>{
    if(event[0] !== null && event[1] !== null){
      let startDate = new Date(event[0]);
      let endDate = new Date(event[1]);
      this.baselineData = this.baselineData = this.baselineData.filter(x => {
        const detectionDate = new Date(x.dateOfDetection);
        return detectionDate >= startDate &&
        detectionDate <= endDate;
      });
    }
  }

  navigateToBaselineProfile(){
    this.router.navigate(['/baselinedata'])
  }
  onClear = () =>{
    this.rangeDates = [];
    this.searchValue = "";
    this.getOffenderData();
  }

  show(baseline:BaselineModel) {
    this.ref = this.dialogService.open(BaselineViewComponent, {
        header: 'Baseline Details',
        width: '90%',
        contentStyle: {"max-height": "600px", "overflow": "auto"},
        baseZIndex: 10000,
        data: baseline.id
    });
}

changeColorOnStatusOfBaseline = (status:any)=>{
  return changeColorOnStatus(status);
}

ngOnDestroy() {
    if (this.ref) {
        this.ref.close();
    }
}

}

