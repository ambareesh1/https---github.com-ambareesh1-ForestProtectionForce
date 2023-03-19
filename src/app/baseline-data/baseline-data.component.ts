import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Circle, Compartment, District, Division } from '../Models/ManageDataModels';
import { ManagedataService } from '../services/managedata.service';
import { environment } from 'src/environments/environment.development';
import { OffenderdataService } from '../services/offenderdata.service';
import { MessageService } from 'primeng/api';
import { Offender } from '../Models/OffenderModel';
import { BaselineModel } from '../Models/BaselineModel';
import { BaselinedataService } from '../services/baselinedata.service';
@Component({
  selector: 'app-baseline-data',
  templateUrl: './baseline-data.component.html',
  styleUrls: ['./baseline-data.component.css']
})
export class BaselineDataComponent implements OnInit {

  numberOfTextboxes:number=0;
  public separatorExp: RegExp = /,| /;
  circles : Circle[] = [];
  forestDivisions:District[]=[];
  forestRanges:Division[] = [];
  compartments : Compartment[] = [];

  circleName : string = "";
  forestDivisionName: string = "";
  forestRangeName : string = "";
  compartmentName : string ="";

  constructor(private fb: FormBuilder, 
    private manageDataService : ManagedataService,
    private offenderDataService: OffenderdataService,
    private baselineDataService :BaselinedataService,
    private messageService: MessageService) {}
    

  ngOnInit(): void {
    this.loadData();
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
        IsActive: [true, Validators.required],
        UpdatedBy: ['', Validators.required]
      });
    }

    loadData = () =>{
        this.manageDataService.getCircle().subscribe((data)=>{
          data.unshift({
            id: -1, name: 'Select',
            provinceId: 0,
            isActive: false,
            province: {id:-1, name:"", isActive:true}
          });
          this.circles = data;
        })
    }

    

    onChipAdd(event:any) {
      const chip = event.value;
      const icon = '<i class="pi pi-user"></i> ';
      event.value = icon + chip;
    }

    onSubmitBaseline = () =>{
    
      let baseLineData: BaselineModel = {
        id: 0, // assign the id value if available, otherwise null
        dateOfDetection: this.formBaseline.value.DateOfDetection,
        officerName: this.formBaseline.value.OfficerName,
        crimeDetails: this.formBaseline.value.CrimeDetails,
        toolsUsed: this.formBaseline.value.ToolsUsed.join(","),
        circleId: this.formBaseline.value.CircleId,
        circleName: this.formBaseline.value.CircleName,
        forestDivisionName: this.formBaseline.value.ForestDivisionName,
        forestDivisionId: this.formBaseline.value.ForestDivisionId,
        forestRangeName: this.formBaseline.value.ForestRangeName,
        forestRangeId: this.formBaseline.value.ForestRangeId,
        compartmentId: this.formBaseline.value.CompartmentId,
        compartmentName: this.formBaseline.value.CompartmentName,
        caseNo: this.formBaseline.value.CaseNo,
        policeStation: this.formBaseline.value.PoliceStation,
        firNo: this.formBaseline.value.FIRNo,
        crimeDate: this.formBaseline.value.CrimeDate,
        sectionOfLaw: this.formBaseline.value.SectionOfLaw.join(","),
        quantity: this.formBaseline.value.Quantity,
        weight: this.formBaseline.value.Weight,
        noOfAccused: this.formBaseline.value.NoOfAccused,
        nameOfAccused: this.formBaseline.value.NameOfAccused.join(","),
        speciesDetected: this.formBaseline.value.SpeciesDetected.join(","),
        itemDescription: this.formBaseline.value.ItemDescription,
        Status : "Open",
        isActive: this.formBaseline.value.IsActive,
        updatedOn: new Date(), // assign the updatedOn value if available, otherwise null
        updatedBy: this.formBaseline.value.UpdatedBy
    };
    
    this.baselineDataService.createBaseline(baseLineData).subscribe((x)=>{
      if(x){
        console.log(x);
        let caseNo = x.caseNo;
       let provinceAddmsg = "Baseline details saved & Case No:" +caseNo+"";
       this.messageService.add({severity:'success', summary: 'Successful', detail: provinceAddmsg, life: 10000});
       this.formBaseline.reset();
       //this.getProvinceData();
      }
     })

    }

    onCircleChange = (event:any) =>{
      if(event.value == -1){
        this.forestDivisions = [];
        this.forestRanges = [];
        this.compartments = [];
        return;
      }
      this.manageDataService.getDistrict().subscribe((data)=>{
        data = data.filter(x=>x.circleId == event.value);
        data.unshift({
          id: -1, name: 'Select',
          circleId: 0,
          isActive: false,
          circle: {id:-1, name:"", isActive:true, provinceId:-1}
        });
        this.forestDivisions = data;
      })
    }
    
    onForestDivisionChange = (event:any) =>{
      this.manageDataService.getDivison().subscribe((data)=>{
       data = data.filter(x=>x.districtId == event.value);;
       data.unshift({
          id: -1, name: 'Select',
          districtId: 0,
          isActive: false,
          district: {id:-1, name:"", isActive:true, circleId:-1}
        });
        this.forestRanges = data;
      })
    }
    onForestRangeChange = (event:any) =>{
      this.manageDataService.getCompartment().subscribe((data)=>{
        data = data.filter(x=>x.divisionId == event.value);
        data.unshift({
          id: -1, name: 'Select',
          divisionId: 0,
          isActive: false,
          division: {id:-1, name:"", isActive:true, districtId:-1}
        });
        this.compartments = data;
      })
    }

}
