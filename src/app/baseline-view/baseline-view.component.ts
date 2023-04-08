import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BaselineModel } from '../Models/BaselineModel';
import { BaselinedataService } from '../services/baselinedata.service';
import { ManagedataService } from '../services/managedata.service';

@Component({
  selector: 'app-baseline-view',
  templateUrl: './baseline-view.component.html',
  styleUrls: ['./baseline-view.component.css']
})
export class BaselineViewComponent implements OnInit {

  baselineId : number = 0;
  baseline:BaselineModel[] = [];

  constructor(private baselineService : BaselinedataService, private ref: DynamicDialogRef, private config: DynamicDialogConfig, private manageService : ManagedataService){

  }
  ngOnInit(): void {
    debugger;
    this.baselineId = this.config.data;
      this.baselineService.getBaseline().subscribe(data=>{
        this.baseline = data.filter(x=>x.id == this.baselineId);
        console.log(this.baseline);
      })
  }

  getCircleNameByid = (id:any) =>{
      this.manageService.getCircleByid(id).subscribe(data=>{
        debugger;
        return data[0].name;
      })
  }
}
