import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HistorySheet } from '../Models/HistorySheet';
import { ManagedataService } from '../services/managedata.service';
import { HistorysheetService } from '../services/historysheet.service';
import { MessageService } from 'primeng/api';
import { BaselinedataService } from '../services/baselinedata.service';
import { SharedService } from '../services/shared.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { OffenderdataService } from '../services/offenderdata.service';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit{
  formHistory: FormGroup =new FormGroup({});
  filteredOffenders: any[] = [];
  selectedOffenders: any[] = [];
  offenders : any = [];
  offenderProfilePicPath = environment.fileUploadPath;
  isEdit : boolean = false;
  id:any;
  aadhar : string = "";
  offenderName : string = "";
  needSpinner : boolean = true;
  isEditOrAdd = "Add";

  constructor(private fb: FormBuilder, 
    private manageDataService : ManagedataService,
    private historyService: HistorysheetService,
    private messageService: MessageService,
    private sharedService : SharedService, 
    private baseLineservice : BaselinedataService,
    private offenderDataService : OffenderdataService,
     private route: ActivatedRoute, private router: Router,) { 
      this.id = this.route.snapshot.paramMap.get('id')!;
      this.isEdit = this.id != null;
    }

  ngOnInit(): void {
    this.loadOffenders().then(()=>{
      if(this.isEdit){
        this.isEditOrAdd = "Edit";
      //  this.loadHistorySheetById(this.id);
        }else{
         this.initFormHistory({} as HistorySheet);
        }
    });
      
  }


  initFormHistory =(historySheet:HistorySheet) =>{
 
    this.formHistory = this.fb.group({
      id :[historySheet.id],
      aadharCard: [historySheet.aadharCard || []],
      offender: [historySheet.offender ||''],
      identifierOfficerName: [historySheet.identifierOfficerName ||''],
      usualFieldOfOperation: [historySheet.usualFieldOfOperation ||''],
      placeOfHabitualResort : [historySheet.placeOfHabitualResort || ''],
      modusOperandi: [historySheet.modusOperandi ||''],
      previousHistory: [historySheet.previousHistory ||''],
      nameOfRelative: [historySheet.nameOfRelative|| ''],
      relationship : [historySheet.relationship],
      criminality: [historySheet.criminality || ''],
      nameOfAssociate: [historySheet.nameOfAssociate ||''],
      parentage: [historySheet.parentage ||''],
      address: [historySheet.address ||'']
    });
  }


  onSubmitHistory = () => {
    debugger;
  
    if(this.formHistory.valid) {
      let historyData: HistorySheet = {
        id: this.isEdit ? this.id : 0,
        aadharCard: this.aadhar,
        offender: this.offenderName,
        identifierOfficerName: this.formHistory.value.identifierOfficerName,
        usualFieldOfOperation: this.formHistory.value.usualFieldOfOperation,
        modusOperandi: this.formHistory.value.modusOperandi,
        previousHistory: this.formHistory.value.previousHistory,
        placeOfHabitualResort: this.formHistory.value.placeOfHabitualResort,
        nameOfRelative: this.formHistory.value.nameOfRelative,
        relationship: this.formHistory.value.relationship,
        criminality: this.formHistory.value.criminality,
        nameOfAssociate: this.formHistory.value.nameOfAssociate,
        parentage: this.formHistory.value.parentage,
        address: this.formHistory.value.address,
        district: this.sharedService.getDistrictId(),
        province: this.sharedService.getProvinceForSuperAdminOrNormal(),
        lastUpdatedDate: new Date(),
        updatedBy: this.sharedService.getUserName(),
        isActive: false
      }

      if (this.isEdit) {
        this.historyService.updateHistorySheet(parseInt(this.id), historyData).subscribe(data => {
          let provinceAddmsg = "History sheet are updated";
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: provinceAddmsg, life: 10000 });
          this.router.navigate(['/historygrid'])
        })
      } else {
        this.historyService.createHistorySheet(historyData).subscribe((x) => {
          debugger;
          if (x) {
            console.log(x);
        
            let provinceAddmsg = "History Sheet created";
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: provinceAddmsg, life: 10000 });
            this.router.navigate(['/historygrid'])
            //this.isDataLoaded = true;
           
          }
        })
      }
    }else{
      let provinceAddmsg = "Please provide the valid input in required fields"
      this.messageService.add({severity:'warn', summary: 'Validation Failed', detail: provinceAddmsg, life: 5000});
    }
    }
  
    loadHistorySheetById = async(id:any) =>{
      this.historyService.getHostorySheetbyId(id).subscribe((x)=>{
        debugger;
        this.needSpinner = false
        this.selectedOffenders.push(this.offenders.filter((y:any) => y.aadhaarNo == x.aadharCard)[0]);
        this.offenderName = this.selectedOffenders[0].name;
      //  this.formHistory.controls['offender'].setValue(this.selectedOffenders);
        this.initFormHistory(x);
       
      })
    }
  
    getAccusedNames = () => {
      debugger
      let result = this.selectedOffenders.map(x => x.aadhaarNo);
      this.aadhar = result[0];
      this.offenderName = this.selectedOffenders.map(x => x.name)[0];
      return result;
    }


  loadOffenders = async () => {
    debugger;
    (await this.offenderDataService.getOffendersData()).subscribe(x => {
      this.offenders = x;
     
      if(this.isEdit){
        this.loadHistorySheetById(this.id);
      }else{
        this.needSpinner = false
      }
    })
  }

  filterCountry(event: any) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.offenders.length; i++) {
      let country = this.offenders[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(this.offenders[i]);
      }
    }

    this.filteredOffenders = filtered;
  }

  onSelect(event: any) {
    debugger;
    // Access the selected item from the event object
    const selectedItem = event;

    // Push the selected item to the selectedOffenders array
    this.selectedOffenders.push(selectedItem);
    let result = this.selectedOffenders.map(x => x.aadhaarNo);
    this.aadhar = result[0];
    this.offenderName = this.selectedOffenders.map(x => x.name)[0];
   
  }


  

}
