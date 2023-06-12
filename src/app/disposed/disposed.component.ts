import { Component } from '@angular/core';
import { BaselineModel } from '../Models/BaselineModel';
import { BaselinedataService } from '../services/baselinedata.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { SharedService } from '../services/shared.service';
import { DisposedCasesService } from '../services/disposed-cases.service';
import { DisposedCasesModel } from '../Models/DisposedCasesModel';
import { FormBuilder, FormGroup } from '@angular/forms';
import { fadeInEffect } from '../animations/custom-animations';
import { BaselineViewComponent } from '../baseline-view/baseline-view.component';
import { changeColorOnStatus } from '../utilities/shared';
@Component({
  selector: 'app-disposed',
  templateUrl: './disposed.component.html',
  styleUrls: ['./disposed.component.css'],
  animations:[fadeInEffect]
 
})
export class DisposedComponent {

  formDisposedCases: FormGroup =new FormGroup({});
  baselineData : BaselineModel[] = [];
  searchValue : any = null;
  rangeDates: Date[] = [];
  caseId : any =null;
  disposedStatus : DisposedStatus[] = [];
  isEdit : boolean = false;
  id : any;
  isDataLoaded : boolean = false;
  ref: DynamicDialogRef | undefined;
  
  constructor(private fb: FormBuilder,private baselineDataService : BaselinedataService, private router: Router, 
    public dialogService: DialogService, public messageService: MessageService, private sharedService: SharedService,
    private route: ActivatedRoute, 
     private disposedCasesService : DisposedCasesService)
  {
    debugger;
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.isEdit = this.id != null;
  }

  ngOnInit(): void {
    this.disposedStatus  = [
      {name : 'Select', code : -1},
       {name : 'Confiscated', code : 1},
       {name : 'Released', code : 2}
    ];
    this.getOffenderData();
    this.isEdit ? this.getDisposedOnEdit() : this.initFormDisposalCases({} as DisposedCasesModel);
     
  }

  getOffenderData = () =>{
     this.baselineDataService.getBaseline().subscribe((data)=>{
        this.baselineData = data;
        this.isDataLoaded = true;
     })
  }

  getDisposedOnEdit = () =>{
    this.disposedCasesService.getDisposedCasesbyId(this.id).subscribe((x)=>{
      debugger;
       this.initFormDisposalCases(x);
      
    })
  }

  initFormDisposalCases =(disposalCases:DisposedCasesModel) =>{
    this.isDataLoaded = true;
   this.caseId = disposalCases.caseId;
    this.formDisposedCases = this.fb.group({
      id :[disposalCases.id],
      caseId: [disposalCases.caseId || ''],
      dateOfFillingComplaints: [Object.keys(disposalCases).length !== 0 ? new Date(disposalCases.dateOfFillingComplaints) : ''],
      nameOfCourt: [disposalCases.nameOfCourt ||''],
      toolsAmplements: [disposalCases.toolsAmplements ||''],
      noOfAccused : [disposalCases.noOfAccused || ''],
      finalDisposalOfCase: [disposalCases.finalDisposalOfCase ||''],
      attachment: [disposalCases.attachment ||''],
      sectionsOfLaws: [ this.isEdit ? disposalCases.sectionsOfLaws.split(',') : disposalCases.sectionsOfLaws || ''],
      detailsOfSeizuresRecory : [disposalCases.detailsOfSeizuresRecory],
      nameOfAccused: [disposalCases.nameOfAccused || ''],
      appealFilledIfAny: [disposalCases.appealFilledIfAny ||''],
      amount: [disposalCases.amount ||''],
      ifConvictedPunishment :  [disposalCases.ifConvictedPunishment ||''],
    });
   
  }

  onSubmitDisposed = () => {
    debugger;
  
    if(this.formDisposedCases.valid) {
      let disposalData: DisposedCasesModel = {
        id: this.isEdit ? this.id : 0,
        caseId: this.formDisposedCases.value.caseId,
        dateOfFillingComplaints: this.formDisposedCases.value.dateOfFillingComplaints,
        nameOfCourt: this.formDisposedCases.value.nameOfCourt,
        toolsAmplements: this.formDisposedCases.value.toolsAmplements,
        nameOfAccused: this.formDisposedCases.value.nameOfAccused,
        finalDisposalOfCase: this.formDisposedCases.value.finalDisposalOfCase,
        ifConvictedPunishment: this.formDisposedCases.value.ifConvictedPunishment,
        attachment: this.formDisposedCases.value.attachment,
        sectionsOfLaws: this.formDisposedCases.value.sectionsOfLaws.join(","),
        detailsOfSeizuresRecory: this.formDisposedCases.value.detailsOfSeizuresRecory,
        amount: this.formDisposedCases.value.amount,
        appealFilledIfAny: this.formDisposedCases.value.appealFilledIfAny,
        district: this.sharedService.getDistrictId(),
        province: this.sharedService.getProvinceForSuperAdminOrNormal(),
        lastUpdatedDate: new Date(),
        updatedBy: this.sharedService.getUserName(),
        isActive: true,
        noOfAccused: this.formDisposedCases.value.noOfAccused
      }

      if (this.isEdit) {
        this.disposedCasesService.updateDisposedCases(parseInt(this.id), disposalData).subscribe(data => {
          let provinceAddmsg = "Disposal case are updated";
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: provinceAddmsg, life: 10000 });
          //this.router.navigate(['/historygrid'])
        })
      } else {
        this.disposedCasesService.createDisposedCases(disposalData).subscribe((x) => {
          debugger;
          if (x) {
            console.log(x);
        
            let provinceAddmsg = "Case moved to Disposal";
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: provinceAddmsg, life: 10000 });
           // this.router.navigate(['/historygrid'])
            //this.isDataLoaded = true;
           
          }
        })
      }
    }else{
      let provinceAddmsg = "Please provide the valid input in required fields"
      this.messageService.add({severity:'warn', summary: 'Validation Failed', detail: provinceAddmsg, life: 5000});
    }
    }

  convertToDate = (onlyDate:any)=>{
    const datePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(onlyDate, 'yyyy-MM-dd');
    return formattedDate;
  }

  editBaseline = (baseline:BaselineModel) =>{

  }

  viewBaseline=(baseline:BaselineModel)=>{
       this.show(baseline);
  }

  addOffender=(baseline:BaselineModel)=>{
    this.router.navigate(['/offenderprofile']);
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

  navigateToDisposedCases(){
    this.router.navigate(['/disposedgrid'])
  }
  onClear = () =>{
    this.rangeDates = [];
    this.searchValue = "";
    this.getOffenderData();
  }

  onCaseIdClick = (baseline:any) =>{
    debugger;
    this.caseId = baseline.caseNo;
    this.formDisposedCases.controls['caseId'].setValue(baseline.caseNo);
    this.formDisposedCases.controls['noOfAccused'].setValue(baseline.noOfAccused);
    this.formDisposedCases.controls['sectionsOfLaws'].setValue(baseline.sectionOfLaw?.split(","));
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

changeColorOnStatusOfBaselineView = (status:any) =>{
   
  return  changeColorOnStatus(status);
}

}

interface DisposedStatus {
  name: string,
  code: number
}


