import { Component } from '@angular/core';
import { fadeInEffect } from '../animations/custom-animations';
import { DisposedCasesService } from '../services/disposed-cases.service';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ManagedataService } from '../services/managedata.service';
import { disposedEnum } from '../enums/DisposedEnum';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-disposal-view',
  templateUrl: './disposal-view.component.html',
  styleUrls: ['./disposal-view.component.css'],
  animations:[fadeInEffect]
})
export class DisposalViewComponent {
  disposed : any;
  disposalId : any;
  constructor(private disposedService : DisposedCasesService, private ref: DynamicDialogRef, private config: DynamicDialogConfig, 
    private manageService : ManagedataService, public dialogService: DialogService){

    }
  ngOnInit(): void {
    debugger;
    this.disposalId = this.config.data;
      this.disposedService.getDisposedCasesbyId(this.disposalId).subscribe(data=>{
        this.disposed = data;
        
      })
}

convertStatus = (id:any) =>{
  debugger;
  return disposedEnum[id];
}

convertToDate = (onlyDate:any)=>{
  const datePipe = new DatePipe('en-US');
  const formattedDate = datePipe.transform(onlyDate, 'yyyy-MM-dd');
  return formattedDate;
}
}
