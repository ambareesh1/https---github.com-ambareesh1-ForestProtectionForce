import { Component, OnInit } from '@angular/core';
import { Seizures_Form_A } from '../Models/Seizures_Form_A';
import { SeizureService } from '../services/seizure.service';
import { Message, MessageService } from 'primeng/api';
import { Observable, catchError, forkJoin, throwError } from 'rxjs';
import { DatePipe } from '@angular/common';
import {dateFormate} from '../utilities/shared';
import { CircleView, District, Province } from '../Models/ManageDataModels';
import { ManagedataService } from '../services/managedata.service';
import { SharedService } from '../services/shared.service';
import * as FileSaver from 'file-saver';
import { Seizure_GammaUni_FormB } from '../Models/Seizures_GammaUnit_Form_B';


@Component({
  selector: 'app-seizure',
  templateUrl: './seizure.component.html',
  styleUrls: ['./seizure.component.css']
})


export class SeizureComponent implements OnInit {

  formsTypes:any = []
  formsVisibility : FormsVisibility[] = []
  formTypeValue : any ;
  formA : Seizures_Form_A[] = [];
  formB : Seizure_GammaUni_FormB[] = [];
  editing : boolean = false;
  clonedProducts: { [s: string]: Seizures_Form_A } = {};
  value: Date =  new Date();
  districtData : District[]=[];
  provinceData : Province[]=[];
  circleData : CircleView[] =[];

  districtId : any = 0 ;
  provinceId : any;
  circleId : any;

  isSuperAdminOfJammuOrKashmir : boolean = false;
  enableMessage : boolean = true;
  progressValue : number = 0;
  showSeizureReport : boolean = false;

  formAVisibility :boolean = false;
  formBVisibility :boolean = false;
  formCVisibility :boolean = false;
  
  //form A 

  cols: any[]=[];

  exportColumns_FormA: any[]=[];

  constructor( private seizureService : SeizureService, private messageService : MessageService,
     private manageDataService : ManagedataService, private sharedServices : SharedService ){
    this.formsTypes = [
      {name : 'Select', code : -1 },
      {name: 'Form A', code: 1},
      {name: 'Form B', code: 2},
      {name: 'Form C', code: 3}
  ];

   

  }

  sales: any[]=[];

    lastYearTotal: number=0;

    thisYearTotal: number=0;

    ngOnInit() {

       this.isSuperAdminOfJammuOrKashmir = this.sharedServices.isSuperAdminOrJammuOrKashmir();
       const sources$: Observable<any>[] = [
        //this.getDivisionData(),
        //this.getDistrictData(),
        //this.getCircleData(),
        this.getProvinceData(),
       
      ];
    
      forkJoin(sources$).subscribe((data: any[]) => {
       // this.divisontData = data[0];
       // this.districtData = data[1];
        //this.circleData = data[2];
        data[0].unshift({
          id: -1,
          name: 'Select',
          districtId: -1,
          isActive: false,
          circleId: 0,
          provinceId: 0
        });
        this.provinceData = data[0];
      });

      // add customized colums of form A 
      this.exportedColumns_FormA();

      
  this.formAVisibility  = false;
  this.formBVisibility  = false;
  this.formCVisibility  = false;
    }

  getseizureReport_FormA = (districtId : number) =>{
    this.seizureService.getFormA().subscribe((data)=>{
      data.filter(x=>x.districtId == districtId);
      this.formA = data;
     })
  }

    getDistrictData = () => {
      return this.manageDataService.getDistrict();
    }
    
    getProvinceData(){
      return this.manageDataService.getProvince();
     }
    
     getCircleData(){
      return this.manageDataService.getCircle();
     }

    calculateLastYearTotal() {
        let total = 0;
        for(let sale of this.sales) {
            total += sale.lastYearProfit;
        }

        this.lastYearTotal = total;
    }

    calculateThisYearTotal() {
        let total = 0;
        for(let sale of this.sales) {
            total += sale.thisYearProfit;
        }

        this.thisYearTotal = total;
    }

    onRowEditInit = (formA :Seizures_Form_A) =>{
      this.clonedProducts[formA.id] = { ...formA };
      this.editing = true;
    }

    onRowEditSave = (formA :Seizures_Form_A) =>{
      console.log(formA);
  if (formA.id > 0) {
           // delete this.clonedProducts[product.id];
           this.seizureService.updateFormA(formA.id, formA).pipe(
            catchError((error) => {
              // Handle error
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update data' });
              return throwError(() => error);
            })
          ).subscribe((data)=>{
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data is updated' });
           })
        } 
        this.editing = !this.editing;
    }
    onRowEditCancel = (formA :Seizures_Form_A, index: number) =>{
      this.formA[index] = this.clonedProducts[formA.id];
      delete this.clonedProducts[formA.id];
      this.editing = !this.editing;
    }



    onChangeProvince = (event:any)=>{
      this.manageDataService.getCircle().subscribe((data)=>{
       
        data = data.filter(x=>x.provinceId == event.value);
        data.unshift({
          id: -1, name: 'Select',
          isActive: false,
          province: { id: -1, name: "", isActive: true },
          provinceId: 0
        });
         this.circleData = data;
       })
       this.districtData = [];
       this.districtData.unshift({
        id: -1, name: 'Select',
        circleId: 0,
        isActive: false,
        provinceId: 0
      });
     }
     
     onChangeCircle = (event:any) =>{
      this.manageDataService.getDistrict().subscribe((data)=>{
        data= data.filter(x=>x.circleId == event.value);
        data.unshift({
          id: -1, name: 'Select',
          circleId: 0,
          isActive: false,
          circle: { id: -1, name: "", isActive: true, provinceId: -1 },
          provinceId: 0
        });
         this.districtData = data;
       })
     }

    

     onChangeDistrict(event: any) {
      if (event.value > 0) {
        // Disable message display
       
           this.districtId = event.value;
      }
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
     
 // Make API call
 if(this.formTypeValue == 1){
  this.formAVisibility = true;
  this.formBVisibility = false;
  return this.FormAExecution(this.districtId);
 }
 if(this.formTypeValue == 2){
  this.formAVisibility = false;
  this.formBVisibility = true;
  return this.FormBGammaUnit(this.districtId);
 }
    }

    FormAExecution = (event : any) =>{
      this.seizureService.getStatusOfFormAAlreadyCreated(event).subscribe(data =>{
        if(data){
           
            this.seizureService.getFormAOnDistrict(event).subscribe(data=>{
             this.showSeizureReport = true;
             this.formA = data;
                 // API call completed
                 this.messageService.add({
                   severity: 'success',
                   summary: 'Received the Sizure',
                   detail: 'The Sizure report is ready with the selected district.',
                   life: 10000
                 });
            })
        
        }else{
         this.messageService.add({
           severity: 'info',
           summary: 'Creation of report in progress...',
           detail: 'creating the seizure report for selected district & month. ',
           life: 10000
         
         });
          // create new seizure report with selected  district
          let seizure_Report: Seizures_Form_A = {
            id: 0,
            serialNo: '',
            name: '',
            ob_independent: undefined,
            during_month_independent: undefined,
            total_independent: undefined,
            ob_joint: undefined,
            during_month_joint: undefined,
            total_joint: undefined,
            provinceId: this.provinceId,
            districtId: this.districtId,
            month: 0,
            year: 0,
            DateOfInsertion: new Date(),
            IsActive: false,
            LastUpdatedOn: new Date()
          };

          this.seizureService.createSeizureReport_A(seizure_Report)
          .pipe(
           catchError((error) => {
             // handle error
             console.error(error);
             this.seizureService.getFormAOnDistrict(event).subscribe(data=>{
               this.showSeizureReport = true;
               this.formA = data;
               // API call completed
               this.messageService.add({
                 severity: 'success',
                 summary: 'Received the Sizure',
                 detail: 'The Sizure report is ready with the selected district.',
                 life: 10000
               });
          })
             return throwError(error); // no need for type parameter here
           })
         )
          .subscribe((data:any)=>{
         if(data){
           this.seizureService.getFormAOnDistrict(event.value).subscribe(data=>{
             this.showSeizureReport = true;
             this.formA = data;
             // API call completed
             this.messageService.add({
               severity: 'success',
               summary: 'Received the Sizure',
               detail: 'The Sizure report is ready with the selected district.',
               life: 10000
             });
        })
       }else{
         alert("errpr");
       }
          })
        }
})
    }

    FormBGammaUnit = (event:any)=>{
      this.seizureService.CheckSeizureBlreadyExistForDistrictAndMonth(event).subscribe(data =>{
        if(data){
           
            this.seizureService.getFormBOnDistrict(event).subscribe(data=>{
             this.showSeizureReport = true;
             this.formB = data;
                 // API call completed
                 this.messageService.add({
                   severity: 'success',
                   summary: 'Received the Sizure',
                   detail: 'The Sizure report is ready with the selected district.',
                   life: 10000
                 });
            })
        
        }else{
         this.messageService.add({
           severity: 'info',
           summary: 'Creation of report in progress...',
           detail: 'creating the seizure report for selected district & month. ',
           life: 10000
         
         });
          // create new seizure report with selected  district
          let seizure_Report: Seizure_GammaUni_FormB = {
            id: 0,
            serialNo: 0,
            provinceId: this.provinceId,
            districtId: this.districtId,
            month: 0,
            year: 0,
            gamma_Unit: '',
            nakas_Laid: 0,
            patrollings_Performed: 0,
            jungle_Gashts_Performed: 0,
            JOP_Reports_Received: 0,
            complaints_Received: 0,
            complaints_Verified: 0,
            requisitions_Made: 0,
            requisitions_Attended: 0,
            No_Of_Fire_Fighting_Operations: 0,
            dateOfInsertion: new Date(),
            isActive: false,
            lastUpdatedOn: new Date()
          };

          this.seizureService.createSeizureReport_B(seizure_Report)
          .pipe(
           catchError((error) => {
             // handle error
             console.error(error);
             this.seizureService.getFormBOnDistrict(event).subscribe(data=>{
               this.showSeizureReport = true;
               this.formB = data;
               // API call completed
               this.messageService.add({
                 severity: 'success',
                 summary: 'Received the Sizure',
                 detail: 'The Sizure report is ready with the selected district.',
                 life: 10000
               });
          })
             return throwError(error); // no need for type parameter here
           })
         )
          .subscribe((data:any)=>{
         if(data){
           this.seizureService.getFormBOnDistrict(event).subscribe(data=>{
            console.log(data);
             this.showSeizureReport = true;
             this.formB = data;
             // API call completed
             this.messageService.add({
               severity: 'success',
               summary: 'Received the Sizure',
               detail: 'The Sizure report is ready with the selected district.',
               life: 10000
             });
        })
       }else{
         alert("errpr");
       }
          })
        }
})
    }

    exportedColumns_FormA = () =>{
     this.exportColumns_FormA = [
        { field: 'sno', header: 'S.No' },
        { field: '', header: '' },
        { field: 'ind_ob', header: 'O.B (Independent Seizure)' },
        { field: 'ind_dtm', header: 'During the Month (Independent Seizure)' },
        { field: 'ind_total', header: 'Total (Independent Seizure)' },
        { field: 'jnt_ob', header: 'O.B (Joint Seizure)' },
        { field: 'jnt_dtm', header: 'During the Month (Joint Seizure)' },
        { field: 'jnt_total', header: 'Total (Joint Seizure)' },
        { field: '', header: '' }
      ];
    }

    exportPdf() {
      // import('jspdf').then((jsPDF) => {
      //     import('jspdf-autotable').then((x) => {
      //         const doc = new jsPDF.default('p', 'px', 'a4');
      //         (doc as any).autoTable(this.exportColumns, this.formA);
      //         doc.save('products.pdf');
      //     });
      // });
  }

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.formA);
      const columns = [
        { header: 'S.No', key: 'sno', width: 10 },
        { header: '', key: 'empty1', width: 10 },
        { header: 'O.B (Independent Seizure)', key: 'ind_ob', width: 30 },
        { header: 'During the Month (Independent Seizure)', key: 'ind_dtm', width: 30 },
        { header: 'Total (Independent Seizure)', key: 'ind_total', width: 30 },
        { header: 'O.B (Joint Seizure)', key: 'jnt_ob', width: 30 },
        { header: 'During the Month (Joint Seizure)', key: 'jnt_dtm', width: 30 },
        { header: 'Total (Joint Seizure)', key: 'jnt_total', width: 30 },
        { header: '', key: 'empty2', width: 10 }
      ];
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'],  Columns: columns };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'Form_A_Seizure_Report');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
}

changeVisibilityofSeizureReport = (formValue : number)=>{

 
  
}

}

interface Forms {
  name: string,
  code: number
}

interface FormsVisibility {
  code: number,
  isVisible: boolean
}