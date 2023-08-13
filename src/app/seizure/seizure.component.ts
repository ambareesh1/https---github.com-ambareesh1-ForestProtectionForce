import { Component, OnInit, ViewChild } from '@angular/core';
import { Seizures_Form_A } from '../Models/Seizures_Form_A';
import { SeizureService } from '../services/seizure.service';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { Observable, catchError, forkJoin, from, last, share, throwError } from 'rxjs';
import { DatePipe } from '@angular/common';
import {dateFormate} from '../utilities/shared';
import { CircleView, District, Province } from '../Models/ManageDataModels';
import { ManagedataService } from '../services/managedata.service';
import { SharedService } from '../services/shared.service';
import * as FileSaver from 'file-saver';
import { Seizure_GammaUni_FormB } from '../Models/Seizures_GammaUnit_Form_B';
import { Seizure_CasesOfMonth_FormC } from '../Models/Seizures_Cases_Of_Month_Form_C';
import {SumPipe} from '../pipes/sumPipe';
import { SeizureManAnimalConflict } from '../Models/SeizureManAnimalConflict';
import { ForestFire } from '../Models/ForestFire';
import { ComplaintsRegistered } from '../Models/ComplaintsRegistered';
import { ForestOffenderModal } from '../Models/HebitualForestOffender';
import { AntiPochingFormAModel } from '../Models/AntiPochingFormA';
import { AntiPochingFormBModel } from '../Models/AntiPochingFormBModel';
import { AntiPochingFormCModel } from '../Models/AntiPochingFormCModel';
import { HabitualForestOffendersComponent } from '../habitual-forest-offenders/habitual-forest-offenders.component';
import { fadeInEffect } from '../animations/custom-animations';



@Component({
  selector: 'app-seizure',
  templateUrl: './seizure.component.html',
  styleUrls: ['./seizure.component.css'],
  animations:[fadeInEffect]
})

export class SeizureComponent implements OnInit {
  formsTypes:any = []
  formName : any ="";
  formattedDate : any;
  formsVisibility : FormsVisibility[] = []
  formTypeValue : any ;
  formA : Seizures_Form_A[] = [];
  formB : Seizure_GammaUni_FormB[] = [];
  formC : any[] = [];
  forestFire : any[] = [];
  complaints : any [] = [];
  manAnimalConflict : any[] = [];
  forestOffenders : any[] = [];
  AntiPochingFormA:any = [];
  AntiPochingFormB:any = [];
  AntiPochingFormC:any = [];

  editing : boolean = false;
  clonedProducts: { [s: string]: Seizures_Form_A } = {};
  clonedFormB : {[s:string] : Seizure_GammaUni_FormB } = {};
  clonedFormC: {[s: string]: Seizure_CasesOfMonth_FormC} = {};
  value: Date =  new Date();
  districtData : District[]=[];
  districtName : any;
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
  manAnimalConflictVisibility : boolean = false;
  fireIncident : boolean = false;
  complaintsRegistered : boolean = false;
  forestOffendersVisibility = false;
  antiPochingFormAVisibility = false;
  antiPochingFormBVisibility = false;
  antiPochingFormCVisibility = false;
  //form A 

  cols: any[]=[];

  exportColumns_FormA: any[]=[];

  //sum
  totalOpeningBalance : any;
  month : any = new Date().getMonth()+1;

  totalConiferTimber : string = "Total Conifer Timber";
  totalBroadLeavedTimber: string ="Total Broad Leaved Timber (cfts)";

  constructor( private seizureService : SeizureService, private messageService : MessageService,
     private manageDataService : ManagedataService, private sharedServices : SharedService,
      private confirmationService : ConfirmationService ){
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
  this.manAnimalConflictVisibility = false;

  let currentDate = new Date(); // Replace this with your date
  this.formattedDate = this.convertToDate(currentDate);
  this.settingDistrictProvinceOnRole();
    }

    onMonthChange = () =>{
      
      let selectedValue = this.formTypeValue;
      this.month = this.value.getMonth()+1;
      let form : FormDistrictMonth ={
        id: this.districtId,
        month: this.value.getMonth()+1
      }
      this.formattedDate = this.convertToDate(this.value);
      switch (selectedValue) {
        case 1:
          this.FormAExecution(this.districtId);
          break;
        case 2:
          this.FormBGammaUnit(this.districtId);
          break;
        case 3:
          this.FormCGammaUnit(this.districtId);
          break;
        case 4:
         this.FormManAnimalConflict(this.districtId);
         break;
        case 5:
          this.FormFireIncident(this.districtId);
          break;
        case 6:
          this.FormComplaintsRegistered(this.districtId);
          break;
        case 7:
          this.FormForestOffendersRegistered(this.districtId);
          break;
        case 8:
          this.FormAntiPochingFormARegistered(this.districtId);
          break;
        case 9:
          this.FormAntiPochingFormBRegistered(this.districtId);
          break;
        case 10:
         this.FormAntiPochingFormCRegistered(this.districtId);
          break;
        default:
          console.log('Selected value not found');
          break;
      }
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

    onRowEditInitFormB = (formB : any) =>{
      this.clonedFormB[formB.id] = {... formB};
      
  }

    onRowEditInitFormC = (formC : any) =>{
        this.clonedFormC[formC.id] = {... formC};
        
    }

    onRowEditInitAnimalConflicts = (manAnimalConflict : any) =>{
      this.clonedFormC[manAnimalConflict.id] = {... manAnimalConflict};
      
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
              this.onSaveTotalConfire(this.getTypeOnItemPassed(formA.name));
           })
           

        } 
        this.editing = !this.editing;
    }

    onSaveTotalConfire = (type:any) =>{
      let totalConfier = this.formA.filter((x:any)=>x.name == type)[0];
           this.seizureService.updateFormA(totalConfier.id, totalConfier).pipe(
            catchError((error) => {
              // Handle error
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update data' });
              return throwError(() => error);
            })
          ).subscribe((data)=>{
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Total Data is updated' });
           })
    }

    onRowEditSaveFormB = (formB :Seizure_GammaUni_FormB) =>{
 
  if (formB.id > 0) {
           // delete this.clonedProducts[product.id];
           this.seizureService.updateFormB(formB.id, formB).pipe(
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


    onRowEditSaveFormC = (formCDetails : any)=>{
      
      let formcAdded : any[] = []; 
  // adding the sum of two rows in database
      this.formC[2].opening_Balance = this.formC[0].opening_Balance + this.formC[1].opening_Balance;
      this.formC[2].total = this.formC[0].total + this.formC[1].total;
      this.formC[2].balance = this.formC[0].balance + this.formC[1].balance;
      this.formC[2].court = this.formC[0].court + this.formC[1].court;
      this.formC[2].cases_Registered_Month = this.formC[0].cases_Registered_Month + this.formC[1].cases_Registered_Month
      this.formC[2].disposed_Cases_Month = this.formC[0].disposed_Cases_Month + this.formC[1].disposed_Cases_Month;
      this.formC[2].authorized_Officer_FD = this.formC[0].authorized_Officer_FD + this.formC[1].authorized_Officer_FD;
      this.formC[2].under_Investigation = this.formC[0].under_Investigation + this.formC[1].under_Investigation;
      this.formC[2].pccf = this.formC[0].pccf + this.formC[1].pccf;
      this.formC[2].session_Court = this.formC[0].session_Court + this.formC[1].session_Court;
      this.formC[2].high_Court = this.formC[0].high_Court + this.formC[1].high_Court;
      this.formC[2].others = this.formC[0].others + this.formC[1].others
      formcAdded.push(formCDetails);
      formcAdded.push(this.formC[2]);
  // adding to array
       if(formCDetails.id > 0){
        this.seizureService.updateFormC(formCDetails.id, this.formC).pipe(
          catchError((error) => {
            // Handle error
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update data' });
            return throwError(() => error);
          })
        ).subscribe((data)=>{
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data is updated' });
         })
       }
    }

    //man animal conflit

    onRowEditSaveManAnimalConflict = (manAnimalConflict :SeizureManAnimalConflict) =>{
 
      if (manAnimalConflict.id >= 0) {
               // delete this.clonedProducts[product.id];
               this.seizureService.updateManAnimal(manAnimalConflict.id, manAnimalConflict).pipe(
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

    onRowEditCancelFormB = (formB :Seizure_GammaUni_FormB, index: number) =>{
      this.formB[index] = this.clonedFormB[formB.id];
      delete this.clonedFormB[formB.id];
      this.editing = !this.editing;
    }

    onRowEditCancelFormC = (formC :Seizure_CasesOfMonth_FormC, index: number) =>{
      this.formC[index] = this.clonedFormC[formC.id || 0];
      delete this.clonedFormC[formC.id || 0];
      this.editing = !this.editing;
    }

    onRowEditCancelManAnimalConflict = (form :SeizureManAnimalConflict, index: number) =>{
      this.manAnimalConflict[index] = this.clonedFormC[form.id || 0];
      delete this.clonedFormC[form.id || 0];
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
         this.districtName = this.districtData.filter(x=>x.id == this.districtId)[0].name;
       })
     }

    

     onChangeDistrict(event: any) {
      if (event.value > 0) {
        // Disable message display
       
           this.districtId = event.value;
           this.enableMessage = false;
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

      this.formName = this.formsTypes.filter((x:any)=>x.code == this.formTypeValue)[0].name;
      if(this.isSuperAdminOfJammuOrKashmir) {this.districtName =  this.districtData.filter(x=>x.id == this.districtId)[0].name; }
 // Make API call
 if(this.formTypeValue == 1){
  this.formAVisibility = true;
  this.formBVisibility = false;
  this.formCVisibility = false;
  this.manAnimalConflictVisibility = false;
  this.fireIncident = false;
  this.complaintsRegistered = false;
  this.forestOffendersVisibility = false;
  this.antiPochingFormAVisibility = false;
  this.antiPochingFormBVisibility = false;
  this.antiPochingFormCVisibility = false;
  return this.FormAExecution(this.districtId);
 }
 if(this.formTypeValue == 2){
  this.formBVisibility = true;
  this.formAVisibility = false;
  this.formCVisibility = false;
  this.manAnimalConflictVisibility = false;
  this.fireIncident = false;
  this.complaintsRegistered = false;
  this.forestOffendersVisibility = false;
  this.antiPochingFormAVisibility = false;
  this.antiPochingFormBVisibility = false;
  this.antiPochingFormCVisibility = false;
  return this.FormBGammaUnit(this.districtId);
 }

 if(this.formTypeValue == 3){
  this.formCVisibility = true;
  this.formAVisibility = false;
  this.formBVisibility = false;
  this.manAnimalConflictVisibility = false;
  this.fireIncident = false;
  this.complaintsRegistered = false;
  this.forestOffendersVisibility = false;
  this.antiPochingFormAVisibility = false;
  this.antiPochingFormBVisibility = false;
  this.antiPochingFormCVisibility = false;
  return this.FormCGammaUnit(this.districtId);
 }

 if(this.formTypeValue == 4){
  this.manAnimalConflictVisibility = true;
  this.formAVisibility = false;
  this.formBVisibility = false;
  this.formCVisibility = false;
  this.fireIncident = false;
  this.complaintsRegistered = false;
  this.forestOffendersVisibility = false;
  this.antiPochingFormAVisibility = false;
  this.antiPochingFormBVisibility = false;
  this.antiPochingFormCVisibility = false;
  return this.FormManAnimalConflict(this.districtId);
 }

 if(this.formTypeValue == 5){
  this.fireIncident = true;
  this.formAVisibility = false;
  this.formBVisibility = false;
  this.formCVisibility = false;
  this.manAnimalConflictVisibility = false;
  this.complaintsRegistered = false;
  this.forestOffendersVisibility = false;
  this.antiPochingFormAVisibility = false;
  this.antiPochingFormBVisibility = false;
  this.antiPochingFormCVisibility = false;
  return this.FormFireIncident(this.districtId);
 }

 if(this.formTypeValue == 6){
  this.complaintsRegistered = true;
  this.formAVisibility = false;
  this.formBVisibility = false;
  this.formCVisibility = false;
  this.manAnimalConflictVisibility = false;
  this.fireIncident = false;
  this.forestOffendersVisibility = false;
  this.antiPochingFormAVisibility = false;
  this.antiPochingFormBVisibility = false;
  this.antiPochingFormCVisibility = false;
  return this.FormComplaintsRegistered(this.districtId);
 }

 if(this.formTypeValue == 7){
  this.forestOffendersVisibility = true;
  this.formAVisibility = false;
  this.formBVisibility = false;
  this.formCVisibility = false;
  this.manAnimalConflictVisibility = false;
  this.fireIncident = false;
  this.complaintsRegistered = false;
  this.antiPochingFormAVisibility = false;
  this.antiPochingFormBVisibility = false;
  this.antiPochingFormCVisibility = false;
  return this.FormForestOffendersRegistered(this.districtId);
    }

    if(this.formTypeValue == 8){
      this.antiPochingFormAVisibility = true;
      this.formAVisibility = false;
      this.formBVisibility = false;
      this.formCVisibility = false;
      this.manAnimalConflictVisibility = false;
      this.fireIncident = false;
      this.complaintsRegistered = false;
      this.forestOffendersVisibility = false;
      this.antiPochingFormBVisibility = false;
      this.antiPochingFormCVisibility = false;
      return this.FormAntiPochingFormARegistered(this.districtId);
        }

        if(this.formTypeValue == 9){
          this.antiPochingFormBVisibility = true;
          this.formAVisibility = false;
          this.formBVisibility = false;
          this.formCVisibility = false;
          this.manAnimalConflictVisibility = false;
          this.fireIncident = false;
          this.complaintsRegistered = false;
          this.forestOffendersVisibility = false;
          this.antiPochingFormAVisibility = false;
          this.antiPochingFormCVisibility = false;
          return this.FormAntiPochingFormBRegistered(this.districtId);
            }
            
            if(this.formTypeValue == 10){
              this.formAVisibility = false;
              this.formBVisibility = false;
              this.formCVisibility = false;
              this.manAnimalConflictVisibility = false;
              this.fireIncident = false;
              this.complaintsRegistered = false;
              this.forestOffendersVisibility = false;
              this.antiPochingFormAVisibility = false;
              this.antiPochingFormBVisibility = false;
              this.antiPochingFormCVisibility = true;
              return this.FormAntiPochingFormCRegistered(this.districtId);
                }
      
  }

  

    FormAExecution = (event : any) =>{
          
           let form : FormDistrictMonth ={
             id: event,
             month: this.month
           }
            this.seizureService.getFormAOnDistrict(form).subscribe(data=>{
             this.showSeizureReport = true;
             if(data.length>0){
              this.formA = data;
              // API call completed
              this.messageService.add({
                severity: 'success',
                summary: 'Received the Sizure',
                detail: 'The Sizure report is ready with the selected district.',
                life: 10000
              });
             }else{
              this.messageService.add({
                severity: 'info',
                summary: 'Creation of report in progress...',
                detail: 'creating the seizure report for selected district & month. ',
                life: 10000
              
              });

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
                month: this.month,
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
                 this.seizureService.getFormAOnDistrict(form).subscribe(data=>{
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
               this.seizureService.getFormAOnDistrict(form).subscribe(data=>{
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
          
          });
        }
            
          // create new seizure report with selected  district
         

    

    FormBGammaUnit = (event:any)=>{
      this.seizureService.CheckSeizureBlreadyExistForDistrictAndMonth(event, this.month).subscribe(data =>{
        if(data){
           
            this.seizureService.getFormBOnDistrict(event, this.month).subscribe(data=>{
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
            month: this.month,
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
             this.seizureService.getFormBOnDistrict(event, this.month).subscribe(data=>{
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
           this.seizureService.getFormBOnDistrict(event,this.month).subscribe(data=>{
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

    FormCGammaUnit = (event:any)=>{
      this.seizureService.CheckSeizureClreadyExistForDistrictAndMonth(event,this.month).subscribe(data =>{
        if(data.length > 0){
          console.log(data);
             this.showSeizureReport = true;
             this.formC = data;
                 // API call completed
                 this.messageService.add({
                   severity: 'success',
                   summary: 'Received the Sizure',
                   detail: 'The Sizure report is ready with the selected district.',
                   life: 10000
                 });
        }else{
         this.messageService.add({
           severity: 'info',
           summary: 'Creation of report in progress...',
           detail: 'creating the seizure report for selected district & month. ',
           life: 10000
         
         });
          // create new seizure report with selected  district
          let seizure_Report: Seizure_CasesOfMonth_FormC = {
            id: 0,
            provinceId: this.provinceId,
            districtId: this.districtId,
            month: this.month,
            year: 0,
            isActive: false,
            lastUpdatedOn: new Date(),
          };

          this.seizureService.createSeizureReport_C(seizure_Report)
          .pipe(
           catchError((error) => {
             // handle error
             console.error(error);
             this.seizureService.CheckSeizureClreadyExistForDistrictAndMonth(event,0).subscribe(data=>{
               this.showSeizureReport = true;
               this.formC = data;
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
           this.seizureService.CheckSeizureClreadyExistForDistrictAndMonth(event,this.month).subscribe(data=>{
            console.log(data);
             this.showSeizureReport = true;
             this.formC = data;
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

    FormManAnimalConflict = (event:any)=>{
      this.seizureService.CheckManAnimalConflictAlreadyExistForDistrictAndMonth(event, this.month).subscribe(data =>{
        if(data.length > 0 ){
          console.log(data);
             this.showSeizureReport = true;
             this.manAnimalConflict = data;
                 // API call completed
                 this.messageService.add({
                   severity: 'success',
                   summary: 'Received the Sizure',
                   detail: 'The Sizure report is ready with the selected district.',
                   life: 10000
                 });
        }else{
         this.messageService.add({
           severity: 'info',
           summary: 'Creation of report in progress...',
           detail: 'creating the seizure report for selected district & month. ',
           life: 10000
         
         });
          // create new seizure report with selected  district
          let seizure_Report: SeizureManAnimalConflict = {
            id: 0,
            sNo: 0,
            nameOfGammaUnit: '',
            placeOfOccurrence: '',
            noOfFPFPersonnelDeployed: 0,
            remarks: '',
            provinceId: this.provinceId,
            districtId: this.districtId,
            month: this.month,
            year: 0,
            lastUpdatedOn: new Date(),
            isActive: false
          };

          this.seizureService.createManAnimalConflict(seizure_Report)
          .pipe(
           catchError((error) => {
             // handle error
             console.error(error);
             this.seizureService.CheckManAnimalConflictAlreadyExistForDistrictAndMonth(event, this.month).subscribe(data=>{
               this.showSeizureReport = true;
               this.formC = data;
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
           this.seizureService.CheckManAnimalConflictAlreadyExistForDistrictAndMonth(event, this.month).subscribe(data=>{
            console.log(data);
             this.showSeizureReport = true;
             this.manAnimalConflict = data;
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

    FormFireIncident = (event:any) =>{
      this.seizureService.CheckForestFireAlreadyExistForDistrictAndMonth(event, this.month).subscribe(data =>{
        if(data.length > 0 ){
          console.log(data);
             this.showSeizureReport = true;
             this.forestFire = data;
                 // API call completed
                 this.messageService.add({
                   severity: 'success',
                   summary: 'Received the Sizure',
                   detail: 'The Sizure report is ready with the selected district.',
                   life: 10000
                 });
        }else{
         this.messageService.add({
           severity: 'info',
           summary: 'Creation of report in progress...',
           detail: 'creating the seizure report for selected district & month. ',
           life: 10000
         
         });
          // create new seizure report with selected  district
          let seizure_Report: ForestFire = {
            id: 0,
            province_id: this.provinceId,
            district_id: this.districtId,
            gamma_unit_name: '',
            ob_total_cases: 0,
            forest_division_name: '',
            fire_spot: '',
            forest_damage_area: 0,
            forest_crop_damaged: '',
            fire_datetime: new Date(),
            fpf_personnel_name: '',
            total_fire_cases: 0,
            month: this.month,
            year: 0,
            date_of_insertion: new Date(),
            is_active: false,
            last_updated_on: new Date(),
            sno: 0
          };

          this.seizureService.createForestFire(seizure_Report)
          .pipe(
           catchError((error) => {
             // handle error
             console.error(error);
             this.seizureService.CheckForestFireAlreadyExistForDistrictAndMonth(event, this.month).subscribe(data=>{
               this.showSeizureReport = true;
               this.forestFire = data;
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
           this.seizureService.CheckForestFireAlreadyExistForDistrictAndMonth(event, this.month).subscribe(data=>{
            console.log(data);
             this.showSeizureReport = true;
             this.forestFire = data;
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

    FormComplaintsRegistered = (event:any) =>{
      this.seizureService.CheckComplaintsRegisteredlreadyExistForDistrictAndMonth(event, this.month).subscribe(data =>{
        if(data.length > 0 ){
          console.log(data);
             this.showSeizureReport = true;
             this.complaints = data;
                 // API call completed
                 this.messageService.add({
                   severity: 'success',
                   summary: 'Received the Sizure',
                   detail: 'The Sizure report is ready with the selected district.',
                   life: 10000
                 });
        }else{
         this.messageService.add({
           severity: 'info',
           summary: 'Creation of report in progress...',
           detail: 'creating the seizure report for selected district & month. ',
           life: 10000
         
         });
          // create new seizure report with selected  district
          let seizure_Report: ComplaintsRegistered = {
            id: 0,
            sno: 1,
            complaintNo: '',
            dateTimeOfReceipt: new Date(),
            sourceOfComplaint: '',
            briefDescription: '',
            complaintArea: '',
            cognizanceUnderSection: '',
            actionTaken: '',
            nameSignMunshiMoharir: '',
            provinceId: this.provinceId,
            districtId: this.districtId,
            month: this.value.getMonth()+1,
            year: this.value.getFullYear(),
            dateOfInsertion: new Date(),
            isActive: true,
            lastUpdatedOn: new Date(),
            updatedBy: ''
          };

          this.seizureService.createComplaintsRegistered(seizure_Report)
          .pipe(
           catchError((error) => {
             // handle error
             console.error(error);
             this.seizureService.CheckComplaintsRegisteredlreadyExistForDistrictAndMonth(event, this.month).subscribe(data=>{
               this.showSeizureReport = true;
               this.complaints = data;
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
           this.seizureService.CheckComplaintsRegisteredlreadyExistForDistrictAndMonth(event, this.month).subscribe(data=>{
            console.log(data);
             this.showSeizureReport = true;
             this.complaints = data;
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

    FormForestOffendersRegistered = (event:any) =>{
      this.seizureService.CheckForestOffenderalreadyExistForDistrictAndMonth(event, this.month).subscribe(data =>{
        if(data.length > 0 ){
          console.log(data);
             this.showSeizureReport = true;
             this.forestOffenders = data;
                 // API call completed
                 this.messageService.add({
                   severity: 'success',
                   summary: 'Received the Sizure',
                   detail: 'The Sizure report is ready with the selected district.',
                   life: 10000
                 });
        }else{
         this.messageService.add({
           severity: 'info',
           summary: 'Creation of report in progress...',
           detail: 'creating the seizure report for selected district & month. ',
           life: 10000
         
         });
          // create new seizure report with selected  district
          let seizure_Report: ForestOffenderModal = {
            Id: 0,
            Sno: 1,
            ActiveDormant : "",
            AreaOfOperations :"",
            CasesRegistered : 0,
            CasesStatus : "",
            ModusOperandi : "",
            NameOfForestOffender :"",
            ProvinceId: this.provinceId,
            DistrictId: this.districtId,
            Month: this.month,
            Year: this.value.getFullYear(),
            DateOfInsertion: new Date(),
            IsActive: true,
            LastUpdatedOn: new Date(),
            UpdatedBy: ''
          };

          this.seizureService.createForestOffendersRegistered(seizure_Report)
          .pipe(
           catchError((error) => {
             // handle error
             console.error(error);
             this.seizureService.CheckForestOffenderalreadyExistForDistrictAndMonth(event, this.month).subscribe(data=>{
               this.showSeizureReport = true;
               this.complaints = data;
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
           this.seizureService.CheckForestOffenderalreadyExistForDistrictAndMonth(event, this.month).subscribe(data=>{
            console.log(data);
             this.showSeizureReport = true;
             this.complaints = data;
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

    FormAntiPochingFormARegistered = (event:any) =>{
      this.seizureService.CheckAntiPochingFormAalreadyExistForDistrictAndMonth(event, this.month).subscribe(data =>{
        if(data.length > 0 ){
          console.log(data);
             this.showSeizureReport = true;
             this.AntiPochingFormA = data;
                 // API call completed
                 this.messageService.add({
                   severity: 'success',
                   summary: 'Received the Sizure',
                   detail: 'The Sizure report is ready with the selected district.',
                   life: 10000
                 });
        }else{
         this.messageService.add({
           severity: 'info',
           summary: 'Creation of report in progress...',
           detail: 'creating the seizure report for selected district & month. ',
           life: 10000
         
         });
          // create new seizure report with selected  district
          let seizure_Report: AntiPochingFormAModel = {
            id: 0,
            sno: 1,
            provinceId: this.provinceId,
            districtId: this.districtId,
            month: this.month,
            year: this.value.getFullYear(),
            isActive: true,
            updatedBy: '',
            activity: '',
            unit: 0,
            details: '',
            dateOfInsertion: new Date(),
            lastUpdatedOn: new Date()
          };

          this.seizureService.createAntiPochingFormA(seizure_Report)
          .pipe(
           catchError((error) => {
             // handle error
             console.error(error);
             this.seizureService.CheckAntiPochingFormAalreadyExistForDistrictAndMonth(event, this.month).subscribe(data=>{
               this.showSeizureReport = true;
               this.AntiPochingFormA = data;
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
           this.seizureService.CheckAntiPochingFormAalreadyExistForDistrictAndMonth(event, this.month).subscribe(data=>{
            console.log(data);
             this.showSeizureReport = true;
             this.AntiPochingFormA = data;
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
    FormAntiPochingFormBRegistered = (event:any) =>{
      this.seizureService.CheckAntiPochingFormBalreadyExistForDistrictAndMonth(event, this.month).subscribe(data =>{
        if(data.length > 0 ){
          console.log(data);
             this.showSeizureReport = true;
             this.AntiPochingFormB = data;
                 // API call completed
                 this.messageService.add({
                   severity: 'success',
                   summary: 'Received the Sizure',
                   detail: 'The Sizure report is ready with the selected district.',
                   life: 10000
                 });
        }else{
         this.messageService.add({
           severity: 'info',
           summary: 'Creation of report in progress...',
           detail: 'creating the seizure report for selected district & month. ',
           life: 10000
         
         });
          // create new seizure report with selected  district
          let seizure_Report: AntiPochingFormBModel = {
            id: 0,
            sno: 1,
            provinceId: this.provinceId,
            districtId: this.districtId,
            month: this.month,
            year: this.value.getFullYear(),
            isActive: true,
            updatedBy: '',
            article: '',
            unit: 0,
            details: '',
            dateOfInsertion: new Date(),
            lastUpdatedOn: new Date()
          };

          this.seizureService.createAntiPochingFormB(seizure_Report)
          .pipe(
           catchError((error) => {
             // handle error
             console.error(error);
             this.seizureService.CheckAntiPochingFormBalreadyExistForDistrictAndMonth(event, this.month).subscribe(data=>{
               this.showSeizureReport = true;
               this.AntiPochingFormB = data;
               // API call completed
               this.messageService.add({
                 severity: 'success',
                 summary: 'Received the Sizure',
                 detail: 'The Sizure report is ready with the selected district.',
                 life: 10000
               });
          })
             return throwError(error); // no need for type parameter heres
           })
         )
          .subscribe((data:any)=>{
         if(data){
           this.seizureService.CheckAntiPochingFormBalreadyExistForDistrictAndMonth(event, this.month).subscribe(data=>{
            console.log(data);
             this.showSeizureReport = true;
             this.AntiPochingFormB = data;
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

    FormAntiPochingFormCRegistered = (event:any) =>{
      this.seizureService.CheckAntiPochingFormCalreadyExistForDistrictAndMonth(event, this.month).subscribe(data =>{
        if(data.length > 0 ){
          console.log(data);
             this.showSeizureReport = true;
             this.AntiPochingFormC = data;
                 // API call completed
                 this.messageService.add({
                   severity: 'success',
                   summary: 'Received the Sizure',
                   detail: 'The Sizure report is ready with the selected district.',
                   life: 10000
                 });
        }else{
         this.messageService.add({
           severity: 'info',
           summary: 'Creation of report in progress...',
           detail: 'creating the seizure report for selected district & month. ',
           life: 10000
         
         });
          // create new seizure report with selected  district
          let seizure_Report: AntiPochingFormCModel = {
            id: 0,
            sno: 1,
            provinceId: this.provinceId,
            districtId: this.districtId,
            month: this.month,
            year: this.value.getFullYear(),
            isActive: true,
            updatedBy: '',
            details: '',
            dateOfInsertion: new Date(),
            lastUpdatedOn: new Date(),
            fIRRegistered: '',
            noDate: ''
          };

          this.seizureService.createAntiPochingFormC(seizure_Report)
          .pipe(
           catchError((error) => {
             // handle error
             console.error(error);
             this.seizureService.CheckAntiPochingFormCalreadyExistForDistrictAndMonth(event, this.month).subscribe(data=>{
               this.showSeizureReport = true;
               this.AntiPochingFormC = data;
               // API call completed
               this.messageService.add({
                 severity: 'success',
                 summary: 'Received the Sizure',
                 detail: 'The Sizure report is ready with the selected district.',
                 life: 10000
               });
          })
             return throwError(error); // no need for type parameter heres
           })
         )
          .subscribe((data:any)=>{
         if(data){
           this.seizureService.CheckAntiPochingFormCalreadyExistForDistrictAndMonth(event, this.month).subscribe(data=>{
            console.log(data);
             this.showSeizureReport = true;
             this.AntiPochingFormC = data;
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

exportExcelFormB(){
  import('xlsx').then((xlsx) => {
    
    const worksheet = xlsx.utils.json_to_sheet(this.formB);
  
    const workbook = { Sheets: { data: worksheet }, SheetNames: ['data']};
    const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'Form_B_Seizure_Report');
  });
}

exportExcelFormC(){
  import('xlsx').then((xlsx) => {
    
    const worksheet = xlsx.utils.json_to_sheet(this.formC);
  
    const workbook = { Sheets: { data: worksheet }, SheetNames: ['data']};
    const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'Form_C_Seizure_Report');
  });
}

changeVisibilityofSeizureReport = (formValue : number)=>{

 
  
}
getTotal(type: keyof Seizure_CasesOfMonth_FormC): number {
  const total = this.formC.reduce((sum, item) => {
    if (item[type] !== undefined) {
      return sum + Number(item[type]);
    }
    return sum;
  }, 0);
  return total;
}



  getTotalOpeningBalance(): any {
      const total = this.formC.reduce((sum, item) => sum + (item.opening_Balance || 0), 0);
    return total;
}

getCasesRegistered():any {
  const total = this.formC.reduce((sum, item) => sum + (item.cases_Registered_Month || 0), 0);
    return total;
}

AddARowManAnimalConflict = () =>{

  let id = 1;
 from(this.manAnimalConflict)
  .pipe(last())
  .subscribe((lastRow) => {
   id = lastRow.sNo+1;
   let month = this.month;
   let seizure_Report: SeizureManAnimalConflict = {
    id: 0,
    sNo: id,
    nameOfGammaUnit: '',
    placeOfOccurrence: '',
    noOfFPFPersonnelDeployed: 0,
    remarks: '',
    provinceId: this.provinceId,
    districtId: this.districtId,
    month: this.month,
    year: this.value.getFullYear(),
    lastUpdatedOn: new Date(),
    isActive: true
  };
  this.manAnimalConflict.push(seizure_Report); 
  });
}

DeleteARowManAnimalConflict = () =>{
  this.manAnimalConflict.pop();
}
  onRowEditDeleteManAnimalConflict = (form: SeizureManAnimalConflict, id: any) => {

    return this.confirmationService.confirm({
      message: 'Are you sure you want to delete row ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        form.isActive = false;
        this.seizureService.updateManAnimal(form.id, form).pipe(
          catchError((error) => {
            // Handle error
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update data' });
            return throwError(() => error);
          })
        ).subscribe((data) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Row is Deleted' });
          this.manAnimalConflict.pop();
        })
      }
    });

  }

  settingDistrictProvinceOnRole = () =>{
    
    if(this.sharedServices.isUserCaseEntryOperatorOrDuptyDirector()){
      this.districtId = this.sharedServices.getDistrictId();
      this.enableMessage = false;
      this.isSuperAdminOfJammuOrKashmir = false;
      this.getDistrictWithId().then(() => {
      this.formTypeValue = 1;
      this.formAVisibility = true;
      this.formName = this.formsTypes.filter((x:any)=>x.code == this.formTypeValue)[0].name;
      this.FormAExecution(this.districtId);
      });
    }
  }

  getDistrictWithId = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      this.manageDataService.getDistricteByid(this.districtId).subscribe(
        (x) => {
          this.districtName = x.name;
          resolve(); // Resolve the promise once the data is retrieved
        },
        (error) => {
          reject(error); // Reject the promise if an error occurs
        }
      );
    });
  }

  updateIndependentTotal(seizure: any, type: any): void {
    debugger
    const ob_independent = parseFloat(seizure.ob_independent) || 0;
    const during_month_independent = parseFloat(seizure.during_month_independent) || 0;
    const ob_joint = parseFloat(seizure.ob_joint) || 0;
    const during_month_joint = parseFloat(seizure.during_month_joint) || 0;
  
    if (type == 'ob_independent') {
      seizure.total_independent = ob_independent + during_month_independent;
    } else {
      seizure.total_joint = ob_joint + during_month_joint;
    }
  
    this.calculateTotalConiferTimber(seizure.name, type); // Call the other method here
  }
  
calculateTotalConiferTimber(name: string, type: string): any {
  
  if (name === 'Total Conifer Timber' || name === 'Total Broad Leaved Timber (cfts)') {
    const requiredItems =  name === 'Total Conifer Timber' ? ['Deodar', 'Kail', 'Fir', 'Chir', 'Spruce', 'others']
                                  :  ['Broad leaved timber', 'Poplar', 'Walnut', 'Willow', 'Spruce', 'Sheesham', 'Toon', 'Mango', 'Khair', 'Simbal','Oak', 'Others' ]; 
    let total = 0;

    switch (type) {
      case 'ob_independent':
        total = this.formA.filter(item => requiredItems.includes(item.name)).reduce((sum, item) => sum + +item.ob_independent, 0);
        break;
      case 'ob_joint':
        total = this.formA.filter(item => requiredItems.includes(item.name)).reduce((sum, item) => sum + +item.ob_joint, 0);
        break;
      case 'during_month_independent':
        total = this.formA.filter(item => requiredItems.includes(item.name)).reduce((sum, item) => sum + +item.during_month_independent, 0);
        break;
      case 'during_month_joint':
        total = this.formA.filter(item => requiredItems.includes(item.name)).reduce((sum, item) => sum + +item.during_month_joint, 0);
        break;
      case 'total_independent':
        total = this.formA.filter(item => requiredItems.includes(item.name)).reduce((sum, item) => sum + +item.total_independent, 0);
        break;
      case 'total_joint':
        total = this.formA.filter(item => requiredItems.includes(item.name)).reduce((sum, item) => sum + +item.total_joint, 0);
        break;
      default:
        // Handle the default case if necessary
        break;
    }

    // Update the value in formA for "Total Conifer Timber"
    const totalConiferItem = name == this.totalConiferTimber? this.formA.find(item => item.name === this.totalConiferTimber) :
     this.formA.find(item => item.name === this.totalBroadLeavedTimber)
    if (totalConiferItem) {
      switch (type) {
        case 'ob_independent':
          totalConiferItem.ob_independent = total;
          break;
        case 'ob_joint':
          totalConiferItem.ob_joint = total;
          break;
        case 'during_month_independent':
          totalConiferItem.during_month_independent = total;
          break;
        case 'during_month_joint':
          totalConiferItem.during_month_joint = total;
          break;
        case 'total_independent':
          totalConiferItem.total_independent = total;
          break;
        case 'total_joint':
          totalConiferItem.total_joint = total;
          break;
        default:
          // Handle the default case if necessary
          break;
      }
    }
    
    return total;
  }

}

getTypeOnItemPassed = (item:any) =>{
  const totalConiferItemList = ['Deodar', 'Kail', 'Fir', 'Chir', 'Spruce', 'others'];
  const totalConiferTimberList =  ['Broad leaved timber', 'Poplar', 'Walnut', 'Willow', 'Spruce', 'Sheesham', 'Toon', 'Mango', 'Khair', 'Simbal','Oak', 'Others' ]; 

  if(totalConiferItemList.includes(item)){
       return this.totalConiferTimber;
  }
  return this.totalBroadLeavedTimber
}



  convertToDate = (onlyDate: any) => {
    const datePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(onlyDate, 'MM/yyyy');
    return formattedDate;
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

export interface FormDistrictMonth{
  id : number;
  month : number;
}