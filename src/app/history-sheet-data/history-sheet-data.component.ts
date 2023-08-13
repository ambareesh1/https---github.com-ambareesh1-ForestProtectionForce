import { Component, OnInit } from '@angular/core';
import { fadeInEffect } from '../animations/custom-animations';
import { HistorySheet } from '../Models/HistorySheet';
import { BaselinedataService } from '../services/baselinedata.service';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HistorysheetService } from '../services/historysheet.service';
import { HistorySheetViewComponent } from '../history-sheet-view/history-sheet-view.component';
import { OffenderdataService } from '../services/offenderdata.service';
import { Offender } from '../Models/OffenderModel';
import { OffenderViewComponent } from '../offender-view/offender-view.component';

@Component({
  selector: 'app-history-sheet-data',
  templateUrl: './history-sheet-data.component.html',
  styleUrls: ['./history-sheet-data.component.css'],
  animations:[fadeInEffect]
})
export class HistorySheetDataComponent implements OnInit {
  historyData : HistorySheet[] = [];
  isDataLoaded : boolean = false;
  searchValue : any = null;
  rangeDates: Date[] = [];
  ref: DynamicDialogRef | undefined;
  
constructor( private router: Router,
  public dialogService: DialogService, public messageService: MessageService, private sharedService: SharedService, 
  private historySheetService : HistorysheetService, private offenderService : OffenderdataService){

}

ngOnInit(): void {
 this.getHistoryData();
}


getHistoryData = () =>{
  this.isDataLoaded = true;
   this.historySheetService.getHostorySheet().subscribe((x)=>{
    this.historyData = x;
    this.isDataLoaded = false;
   });
}
onDateRangeSelect=(event:any)=>{
  if(event[0] !== null && event[1] !== null){
    let startDate = new Date(event[0]);
    let endDate = new Date(event[1]);
    this.historyData = this.historyData = this.historyData.filter(x => {
      const detectionDate = new Date(x.lastUpdatedDate);
      return detectionDate >= startDate &&
      detectionDate <= endDate;
    });
  }
}

navigateToHistorySheet = () =>{
  this.router.navigate(['/history'])
}

editHistory = (history : HistorySheet) =>{
  this.router.navigate(['/history/'+history.id+'']);
}

viewHistory = (history : HistorySheet) =>{
  this.show(history);
}

addHistory = (history : HistorySheet) =>{
  
}

onClickAadhar = (aadhaarNo:any) =>{
  
  this.offenderService.getOffenderWithAdhar(aadhaarNo).subscribe((x)=>{
    this.showOffender(x);
  })
}

onClear = () =>{
  this.rangeDates = [];
  this.searchValue = "";
}
show(baseline:HistorySheet) {
  this.ref = this.dialogService.open(HistorySheetViewComponent, {
      header: 'History Sheet Details',
      width: '90%',
      contentStyle: {"max-height": "600px", "overflow": "auto"},
      baseZIndex: 10000,
      data: baseline.id
  });
}

showOffender(offender:any) {
  this.ref = this.dialogService.open(OffenderViewComponent, {
      header: 'Offender Details',
      width: '90%',
      contentStyle: {"max-height": "600px", "overflow": "auto"},
      baseZIndex: 10000,
      data: offender.id
  });
}
}
