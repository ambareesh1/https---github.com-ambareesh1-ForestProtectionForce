import { Component, OnInit } from '@angular/core';
import { HistorySheet } from '../Models/HistorySheet';
import { HistorysheetService } from '../services/historysheet.service';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ManagedataService } from '../services/managedata.service';
import { fadeInEffect } from '../animations/custom-animations';


@Component({
  selector: 'app-history-sheet-view',
  templateUrl: './history-sheet-view.component.html',
  styleUrls: ['./history-sheet-view.component.css'],
  animations:[fadeInEffect]
})
export class HistorySheetViewComponent implements OnInit{

  history : any;
  historyId : any;
  constructor(private historyService : HistorysheetService, private ref: DynamicDialogRef, private config: DynamicDialogConfig, 
    private manageService : ManagedataService, public dialogService: DialogService,){

  }
  ngOnInit(): void {
    debugger;
    this.historyId = this.config.data;
      this.historyService.getHostorySheetbyId(this.historyId).subscribe(data=>{
        this.history = data;
        
      })

  }


  show(history:HistorySheet) {
    this.ref = this.dialogService.open(HistorySheetViewComponent, {
        header: 'Baseline Details',
        width: '90%',
        contentStyle: {"max-height": "600px", "overflow": "auto"},
        baseZIndex: 10000,
        data: history.id
    });
}
}
