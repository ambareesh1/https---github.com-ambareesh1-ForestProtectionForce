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
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { SpinnerService } from '../services/spinner.service';
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
  units : Circle[] =[];
  circleName : string = "";
  forestDivisionName: string = "";
  forestRangeName : string = "";
  compartmentName : string ="";
 
  id: string = "";
  isEdit : boolean = false;
  isDataLoaded : boolean = false;
  titleText = "Manage Base Line Data";
  buttonText = "Submit";

  offendars: any[] = [];

  selectedOffenders: any[]=[];

  filteredOffenders: any[] = [];


  constructor(private fb: FormBuilder, 
    private manageDataService : ManagedataService,
    private offenderDataService: OffenderdataService,
    private baselineDataService :BaselinedataService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private offenderService : OffenderdataService,
    private spinnerService : SpinnerService) {
      this.units.push(
      {id:1, isActive:true, name : 'Kilogram (kg)',provinceId:0},
      {id:2, isActive:true, name : 'Tonne (t)',provinceId:0},
      {id:3, isActive:true, name : 'Grams (g)',provinceId:0})
    }
    

  ngOnInit(): void {
    
    this.id = this.route.snapshot.paramMap.get('id')!;
    if(this.id != null) {
      this.isEdit = true;
      this.buttonText = "Update"
      this.titleText = "Update Manage Base Line Data";
      this.loadData();
      this.loadDistrictData();
      this.loadDRangeData();
      this.loadComppartmentData();
      this.baselineDataService.getBaseline().subscribe((data)=>{
        let baseline = data.filter(x=>x.id == parseInt(this.id))[0];
        this.isDataLoaded = true;
        this.initFormBaseline(baseline);
      })
    }else{
    
      let baseline = [];
      this.initFormBaseline({} as BaselineModel);
      this.loadData();
      this.loadOffenders();
      this.isDataLoaded = true;
    }
   
  }

    formBaseline: FormGroup =new FormGroup({});


    initFormBaseline =(baseline: BaselineModel = {} as BaselineModel) =>{
      console.log(baseline);
      this.formBaseline = this.fb.group({
        DateOfDetection: [Object.keys(baseline).length !== 0 ?new Date(baseline.dateOfDetection):''|| '', Validators.required],
        OfficerName: [baseline.officerName ||'', Validators.required],
        CrimeDetails: [baseline.crimeDetails ||'', Validators.required],
        ToolsUsed: [baseline.toolsUsed?.split(",") ||'', Validators.required],
        CircleId: [baseline.circleId ||'', Validators.required],
        CircleName: [baseline.circleName ||'', Validators.required],
        ForestDivisionName: [baseline.forestDivisionName ||'', Validators.required],
        ForestDivisionId: [baseline.forestDivisionId ||'', Validators.required],
        ForestRangeName: [baseline.forestRangeName ||'', Validators.required],
        ForestRangeId: [baseline.forestRangeId ||'', Validators.required],
        CompartmentId: [baseline.compartmentId ||'', Validators.required],
        CompartmentName: [baseline.compartmentName ||'', Validators.required],
        CaseNo: [baseline.caseNo ||'', Validators.required],
        PoliceStation: [baseline.policeStation ||'', Validators.required],
        FIRNo: [baseline.firNo ||'', Validators.required],
        CrimeDate: [Object.keys(baseline).length !== 0 ?new Date(baseline.crimeDate):'' ||'', Validators.required],
        SectionOfLaw: [baseline.sectionOfLaw?.split(",") ||'', Validators.required],
        Quantity: [baseline.quantity ||'', Validators.required],
        Weight: [baseline.weight ||'', Validators.required],
        NoOfAccused: [baseline.noOfAccused || '', Validators.required],
        NameOfAccused: [baseline.nameOfAccused?.split(",") ||'', Validators.required],
        SpeciesDetected: [baseline.speciesDetected?.split(",") || '', Validators.required],
        ItemDescription: [baseline.itemDescription || '', Validators.required],
        IsActive: [true, Validators.required],
        UpdatedBy: ['', Validators.required]
      });
    }

    loadData = () =>{
      this.spinnerService.setLoading(false);
        this.manageDataService.getCircle().subscribe((data)=>{
          this.spinnerService.setLoading(false);
          data.unshift({
            id: -1, name: 'Select',
            provinceId: 0,
            isActive: false,
            province: {id:-1, name:"", isActive:true}
          });
          this.circles = data;
        })
    }

    loadDistrictData = () =>{
      this.manageDataService.getDistrict().subscribe((data)=>{
        this.forestDivisions = data;
      })
    }
    
    loadDRangeData = () =>{
      this.manageDataService.getDivison().subscribe((data)=>{
        this.forestRanges = data;
      })
    }
    loadComppartmentData = () =>{
      this.manageDataService.getCompartment().subscribe((data)=>{
        this.compartments = data;
      })
    }
    

    onChipAdd(event:any) {
      const chip = event.value;
      const icon = '<i class="pi pi-user"></i> ';
      event.value = icon + chip;
    }

    onSubmitBaseline = () =>{
   
      let baseLineData: BaselineModel = {
        id: this.isEdit?  parseInt(this.id) : 0, // assign the id value if available, otherwise null
        dateOfDetection: this.formBaseline.value.DateOfDetection,
        officerName: this.formBaseline.value.OfficerName,
        crimeDetails: this.formBaseline.value.CrimeDetails,
        toolsUsed: this.formBaseline.value.ToolsUsed.join(","),
        circleId: this.formBaseline.value.CircleId,
        circleName: this.circleName,
        forestDivisionName: this.forestDivisionName,
        forestDivisionId: this.formBaseline.value.ForestDivisionId,
        forestRangeName: this.forestRangeName,
        forestRangeId: this.formBaseline.value.ForestRangeId,
        compartmentId: this.formBaseline.value.CompartmentId,
        compartmentName: this.compartmentName,
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
        status : "Open",
        isActive: this.formBaseline.value.IsActive,
        updatedOn: new Date(), // assign the updatedOn value if available, otherwise null
        updatedBy: this.formBaseline.value.UpdatedBy
    };

    if(this.isEdit){
      this.baselineDataService.updateBaselinet(parseInt(this.id), baseLineData).subscribe(data=>{
           console.log(data);
      })
    }else{
      this.baselineDataService.createBaseline(baseLineData).subscribe((x)=>{
        if(x){
          console.log(x);
          let caseNo = x.caseNo;
         let provinceAddmsg = "Baseline details saved & Case No:" +caseNo+"";
         this.messageService.add({severity:'success', summary: 'Successful', detail: provinceAddmsg, life: 10000});

        
          this.offenderDataService.UpdateOffendersFromBaseLine(caseNo,this.filteredOffenders).subscribe(x=>{
            let provinceAddmsg = "Offenders added to baseline details";
            this.messageService.add({severity:'success', summary: 'Successful', detail: provinceAddmsg, life: 10000});
          })

         this.formBaseline.reset();
        }
       })
    }
    
 

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
        this.circleName = this.circles.filter(x=>x.id == event.value)[0].name;
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
        this.forestDivisionName = this.forestDivisions.filter(x=>x.id == event.value)[0].name;
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
        this.forestRangeName = this.forestRanges.filter(x=>x.id == event.value)[0].name;
      })
    }

    loadOffenders = () =>{
        this.offenderDataService.getOffendersData().subscribe(x=>{
          this.offendars = x;
          this.selectedOffenders = x;
        })
    }

    filterCountry(event:any) {
      //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
      let filtered: any[] = [];
      let query = event.query;

      for (let i = 0; i < this.offendars.length; i++) {
          let country = this.offendars[i];
          if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filtered.push(this.offendars[i]);
          }
      }

      this.filteredOffenders = filtered;
  }

    onCompartmentChange = (event:any) =>{
      this.compartmentName = this.compartments.filter(x=>x.id == event.value)[0].name;
    }
    convertToDate = (onlyDate:any)=>{
      const datePipe = new DatePipe('en-US');
      const formattedDate = datePipe.transform(onlyDate, 'yyyy-MM-dd');
      return formattedDate;
    }

}
