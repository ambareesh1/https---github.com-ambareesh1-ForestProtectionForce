import { Component } from '@angular/core';
import { Offender } from '../Models/OffenderModel';
import { OffenderdataService } from '../services/offenderdata.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ManagedataService } from '../services/managedata.service';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment.development';
@Component({
  selector: 'app-offender-view',
  templateUrl: './offender-view.component.html',
  styleUrls: ['./offender-view.component.css']
})
export class OffenderViewComponent {
 offenderId : number = 0;
  offender : any[] = [];
  caseId : any = "";
  serverImageUrl:string = environment.fileUploadPath;
  districtName : string = '';

  constructor(private offenderService : OffenderdataService, private ref: DynamicDialogRef, private config: DynamicDialogConfig, private manageService : ManagedataService){

  }
  async ngOnInit(): Promise<void> {
    
    this.offenderId = this.config.data;
      (await this.offenderService.getOffendersData()).subscribe((data:any)=>{
        this.offender = data.filter((x:any)=>x.id == this.offenderId);
        this.manageService.getDistricteByid(this.offender[0].districtId).subscribe((x)=>{
          this.districtName = x.name;
        })
        console.log(this.offender);
      })

  }

  bindOffenderData = async () =>{
    
      (await this.offenderService.getOffendersData()).subscribe(x=>{
       
        this.offender = x.filter(y=>y.caseId == this.caseId);
      })
  }


  convertToDate = (onlyDate:any)=>{
    const datePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(onlyDate, 'yyyy-MM-dd');
    return formattedDate;
  }
}
