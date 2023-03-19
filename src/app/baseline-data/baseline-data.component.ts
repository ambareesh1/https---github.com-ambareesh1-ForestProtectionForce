import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { District } from '../Models/ManageDataModels';
import { ManagedataService } from '../services/managedata.service';
import { environment } from 'src/environments/environment.development';
import { OffenderdataService } from '../services/offenderdata.service';
import { MessageService } from 'primeng/api';
import { Offender } from '../Models/OffenderModel';
import { BaselineModel } from '../Models/BaselineModel';
@Component({
  selector: 'app-baseline-data',
  templateUrl: './baseline-data.component.html',
  styleUrls: ['./baseline-data.component.css']
})
export class BaselineDataComponent implements OnInit {

  numberOfTextboxes:number=0;
  public separatorExp: RegExp = /,| /;
  constructor(private fb: FormBuilder, 
    private manageDataService : ManagedataService,
    private offenderDataService: OffenderdataService,
    private messageService: MessageService) {}


  ngOnInit(): void {
    this.initFormBaseline();
  }

    formBaseline: FormGroup =new FormGroup({});


    initFormBaseline =() =>{
      this.formBaseline = this.fb.group({
        DateOfDetection: ['', Validators.required],
        OfficerName: ['', Validators.required],
        CrimeDetails: ['', Validators.required],
        ToolsUsed: ['', Validators.required],
        CircleId: ['', Validators.required],
        CircleName: ['', Validators.required],
        ForestDivisionName: ['', Validators.required],
        ForestDivisionId: ['', Validators.required],
        ForestRangeName: ['', Validators.required],
        ForestRangeId: ['', Validators.required],
        CompartmentId: ['', Validators.required],
        CompartmentName: ['', Validators.required],
        CaseNo: ['', Validators.required],
        PoliceStation: ['', Validators.required],
        FIRNo: ['', Validators.required],
        CrimeDate: ['', Validators.required],
        SectionOfLaw: ['', Validators.required],
        Quantity: ['', Validators.required],
        Weight: ['', Validators.required],
        NoOfAccused: ['', Validators.required],
        NameOfAccused: ['', Validators.required],
        SpeciesDetected: ['', Validators.required],
        ItemDescription: ['', Validators.required],
        IsActive: ['', Validators.required],
        UpdatedBy: ['', Validators.required]
      });
    }

    onChipAdd(event:any) {
      const chip = event.value;
      const icon = '<i class="pi pi-user"></i> ';
      event.value = icon + chip;
    }
    

}
