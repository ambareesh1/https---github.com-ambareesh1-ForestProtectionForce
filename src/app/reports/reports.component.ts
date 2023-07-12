import { Component, OnInit } from '@angular/core';
import { ManagedataService } from '../services/managedata.service';
import { MessageService } from 'primeng/api';
import { SharedService } from '../services/shared.service';
import { ActivatedRoute } from '@angular/router';
import { ReportsServicesService } from '../services/reports-services.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  districtId : any = 0 ;
  formTypeValue : any ;
  value: Date =  new Date();
  formsTypes:any = []
  districts : any = [];
  FormAReportModel:any = [];
  items : any = [];
  constructor(
    private manageDataService : ManagedataService,
    private messageService: MessageService,
    private sharedService : SharedService,
    private reportsServices : ReportsServicesService, 
     private route: ActivatedRoute) { 
   debugger;
       this.reportsServices.getFormAReport();
       this.formsTypes = [
        {name : 'Select', code : -1 },
        {name: 'Form A', code: 1},
        {name: 'Form B', code: 2},
        {name: 'Form C', code: 3},
        {name: 'Man Animal Conflict Activity', code: 4},
        {name: 'Fire Incident Cases', code: 5},
        {name: 'Complaints Registered', code: 6},
        {name: 'Habitual Forest Offenders Register', code: 7},
        {name: 'Anti Poching Part A Activity', code: 8},
        {name: 'Anti Poching Part B SEIZURES', code: 9},
        {name: 'Anti Poching Part C Legal Action', code: 10}
    ];
    }
  ngOnInit(): void {
    this.getReportA();
   this.getDistrictData();
  }

    onChangeForm = () =>{

      this.messageService.clear();
      // Show fetching message
      this.messageService.add({
        severity: 'info',
        summary: 'Fetching Seizure Report',
        detail: 'Fetching the seizure report for selected district...',
        life: 1000
      
      });
    }

    onMonthChange = () =>{
    }

    getDistrictData = () => {
     this.manageDataService.getDistrict().subscribe((x)=>{
           this.districts = x;
      });
    }
   
    getReportA = () =>{
      this.reportsServices.getFormAReport().subscribe((x:any)=>{
        console.log(x);
          this.FormAReportModel = x;
          let itemsList = x.map((y:any)=>y.item);
          this.items = [...new Set(itemsList)];
      })
    }

}
