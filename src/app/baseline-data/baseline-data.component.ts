import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Circle, Compartment, District, Division } from '../Models/ManageDataModels';
import { ManagedataService } from '../services/managedata.service';
import { environment } from 'src/environments/environment.development';
import { OffenderdataService } from '../services/offenderdata.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Offender } from '../Models/OffenderModel';
import { BaselineModel } from '../Models/BaselineModel';
import { BaselinedataService } from '../services/baselinedata.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { SpinnerService } from '../services/spinner.service';
import { async } from 'rxjs';
import { SharedService } from '../services/shared.service';
import { UserDetailService } from '../services/user-detail.service';
import { UserTypeEnum } from '../enums/UsereTypes';
import {markAllFieldsAsDirty} from '../utilities/makedirty'
import { fadeInEffect } from '../animations/custom-animations';
import { SuperadminService } from '../services/superadmin.service';

@Component({
  selector: 'app-baseline-data',
  templateUrl: './baseline-data.component.html',
  styleUrls: ['./baseline-data.component.css'],
  animations:[fadeInEffect]
})
export class BaselineDataComponent implements OnInit {

  userName : string = "";
  userTypeId : number = 0;
  numberOfTextboxes: number = 0;
  public separatorExp: RegExp = /,| /;
  baseLineData : BaselineModel = {} as BaselineModel;
  circles: Circle[] = [];
  forestDivisions: District[] = [];
  forestRanges: Division[] = [];
  compartments: Compartment[] = [];
  units: Circle[] = [];
  provinceId : number = 0;
  provinceName : string = "";
  circleId : number = 0;
  circleName: string = "";
  districtId : number = 0;
  forestDivisionName: string = "";
  forestRangeName: string = "";
  compartmentName: string = "";
  caseId: string = "";
  id: string = "";
  isEdit: boolean = false;
  isDataLoaded: boolean = false;
  titleText = "Manage Base Line Data";
  buttonText = "Submit";
  isDutyDirectorOrSuperAdmin : boolean = false;
  displayPosition: boolean = false;
  reason : string = "";
  offendars: any[] = [];
  offenderProfilePicPath = environment.fileUploadPath;
  selectedOffenders: any[] = [];

  filteredOffenders: any[] = [];


  constructor(private fb: FormBuilder,
    private manageDataService: ManagedataService,
    private offenderDataService: OffenderdataService,
    private baselineDataService: BaselinedataService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private spinnerService: SpinnerService,
    private confirmationService: ConfirmationService, 
    private sharedServices : SharedService, 
    private userDetailsServices : UserDetailService,
    private superAdminService : SuperadminService) {
    this.units.push(
      { id: 1, isActive: true, name: 'Kilogram (kg)', provinceId: 0 },
      { id: 2, isActive: true, name: 'Tonne (t)', provinceId: 0 },
      { id: 3, isActive: true, name: 'Grams (g)', provinceId: 0 })
  }


  async ngOnInit(): Promise<void> {
    // storing the username & typeId in varaibles from local storage.
    this.userName = this.sharedServices.getUserDetails().username;
    this.userTypeId = this.sharedServices.getUserDetails().roleId;
    this.isDutyDirectorOrSuperAdmin = this.sharedServices.isDuptyDirector() || this.sharedServices.isSuperAdminOrJammuOrKashmir();
    this.id = this.route.snapshot.paramMap.get('id')!;
    if (this.id != null) {
      this.isEdit = true;
      this.buttonText = "Update"
      this.titleText = "Update Manage Base Line Data";
      this.loadData();
      this.loadDistrictData();
      this.loadDRangeData();
      this.loadComppartmentData();
      this.sharedServices.isSuperAdminOrJammuOrKashmir() ? this.setCircleIdAndDistrictIdForSuperAdmins() : this.setCircleIdAndDistrictId();
      this.baselineDataService.getBaseline().subscribe(async (data) => {
        this.baseLineData = data.filter(x => x.id == parseInt(this.id))[0];
        this.isDataLoaded = true;
        await this.loadOffenders(this.baseLineData).then(() => { this.initFormBaseline(this.baseLineData); });

      })
    } else {

      let baseline = [];
      await this.loadOffenders({} as BaselineModel);
      this.initFormBaseline({} as BaselineModel);
      this.loadData();
      this.setDistrictOnAndDisableOtherControls();
      this.sharedServices.isSuperAdminOrJammuOrKashmir() ? this.setCircleIdAndDistrictIdForSuperAdmins() : this.setCircleIdAndDistrictId();
    }

  }

  formBaseline: FormGroup = new FormGroup({});


  initFormBaseline = (baseline: BaselineModel = {} as BaselineModel) => {
    this.caseId = baseline.caseNo;
    this.formBaseline = this.fb.group({
      DateOfDetection: [Object.keys(baseline).length !== 0 ? new Date(baseline.dateOfDetection) : '' || '', Validators.required],
      OfficerName: [baseline.officerName || '', Validators.required],
      CrimeDetails: [baseline.crimeDetails || '', Validators.required],
      ToolsUsed: [baseline.toolsUsed?.split(",") || '', Validators.required],
      CircleId: [baseline.circleId || '', Validators.required],
      CircleName: [baseline.circleName || ''],
      ForestDivisionName: [baseline.forestDivisionName || ''],
      ForestDivisionId: [baseline.forestDivisionId || '', Validators.required],
      ForestRangeName: [baseline.forestRangeName || ''],
      ForestRangeId: [baseline.forestRangeId || '', Validators.required],
      CompartmentId: [baseline.compartmentId || '', Validators.required],
      CompartmentName: [baseline.compartmentName || ''],
      CaseNo: [baseline.caseNo || ''],
      PoliceStation: [baseline.policeStation || '', Validators.required],
      FIRNo: [baseline.firNo || '', Validators.required],
      CrimeDate: [Object.keys(baseline).length !== 0 ? new Date(baseline.crimeDate) : '' || '', Validators.required],
      SectionOfLaw: [baseline.sectionOfLaw?.split(",") || '', Validators.required],
      Quantity: [baseline.quantity || ''],
      Weight: [baseline.weight || ''],
      NoOfAccused: [baseline.noOfAccused || '', Validators.required],
      NameOfAccused: [this.getAccusedNames()?.split(",") || this.selectedOffenders, Validators.required],
      SpeciesDetected: [baseline.speciesDetected?.split(",") || '', Validators.required],
      ItemDescription: [baseline.itemDescription || '', Validators.required],
      IsActive: [true, Validators.required]
    });
  }

  loadData = () => {
    this.spinnerService.setLoading(false);
    this.manageDataService.getCircle().subscribe((data) => {
      let province = this.sharedServices.getProvinceForSuperAdminOrNormal();
       data = province == 0 ? data : data.filter(x=>x.provinceId === province);
      this.spinnerService.setLoading(false);
      data.unshift({
        id: -1, name: 'Select',
        provinceId: 0,
        isActive: false,
        province: { id: -1, name: 
          "", isActive: true }
      });
      this.circles = data;
    })
  }

  loadDistrictData = () => {
    this.manageDataService.getDistrict().subscribe((data) => {
      this.forestDivisions = data;
    })
  }

  loadDRangeData = () => {
    this.manageDataService.getDivison().subscribe((data) => {
      this.forestRanges = data;
      if(this.isUserCaseEntryOperatorOrDuptyDirector()){
        let data = this.forestRanges.filter(y=>y.districtId == this.districtId);
        data.unshift({
          id: -1,
           name: 'Select',
           districtId : -1,
          isActive: false
        });
        this.forestRanges = data;
      }
    })
  }
  loadComppartmentData = () => {
    this.manageDataService.getCompartment().subscribe((data) => {
      this.compartments = data;
    })
  }

  setDistrictOnAndDisableOtherControls = () =>{
    debugger;
    
      if(this.isUserCaseEntryOperatorOrDuptyDirector()){
        this.loadDistrictData();
        this.loadDRangeData();
       this.userDetailsServices.getUserDetailsByUserName(this.userName).subscribe((x)=>{
          this.formBaseline.controls['CircleId'].setValue(x.circleId);
          this.formBaseline.controls['ForestDivisionId'].setValue(x.circleId);
          this.formBaseline.controls['CircleId'].disable();
          this.formBaseline.controls['ForestDivisionId'].disable();
          this.districtId = x.districtId;
          this.circleId = x.circleId;
          this.provinceId = x.provinceId;
          let data = this.forestRanges.filter(y=>y.districtId == x.districtId);
          data.unshift({
            id: -1,
             name: 'Select',
             districtId : -1,
            isActive: false
          });
          this.forestRanges = data;
       })
      }
  }

  setCircleIdAndDistrictId = () =>{
    this.userDetailsServices.getUserDetailsByUserName(this.userName).subscribe((x)=>{
      this.districtId = x.districtId;
      this.circleId = x.circleId;
      this.provinceId = x.provinceId;
    });
  }
  setCircleIdAndDistrictIdForSuperAdmins = () =>{
    this.superAdminService.getSuperadminByUserName(this.userName).subscribe((x)=>{
      this.provinceId = x.province;
    });
  }
   
  onChipAdd(event: any) {
    const chip = event.value;
    const icon = '<i class="pi pi-user"></i> ';
    event.value = icon + chip;
  }

  onSubmitBaseline = () => {
    markAllFieldsAsDirty(this.formBaseline);
    if(this.formBaseline.valid) {
    let baseLineData: BaselineModel = {
      id: this.isEdit ? parseInt(this.id) : 0,
      dateOfDetection: this.formBaseline.value.DateOfDetection,
      officerName: this.formBaseline.value.OfficerName,
      crimeDetails: this.formBaseline.value.CrimeDetails,
      toolsUsed: this.formBaseline.value.ToolsUsed.join(","),
      circleId: this.formBaseline.value.CircleId,
      circleName: this.circleName ?? "",
      forestDivisionName: this.forestDivisionName,
      forestDivisionId: this.formBaseline.value.ForestDivisionId,
      forestRangeName: this.forestRangeName,
      forestRangeId: this.formBaseline.value.ForestRangeId,
      compartmentId: this.formBaseline.value.CompartmentId,
      compartmentName: this.compartmentName ?? "",
      caseNo: this.formBaseline.value.CaseNo,
      policeStation: this.formBaseline.value.PoliceStation,
      firNo: this.formBaseline.value.FIRNo,
      crimeDate: this.formBaseline.value.CrimeDate,
      sectionOfLaw: this.formBaseline.value.SectionOfLaw.join(","),
      quantity: this.formBaseline.value.Quantity,
      weight: this.formBaseline.value.Weight,
      noOfAccused: this.formBaseline.value.NoOfAccused,
      nameOfAccused: this.getAccusedNames(),
      speciesDetected: this.formBaseline.value.SpeciesDetected.join(","),
      itemDescription: this.formBaseline.value.ItemDescription,
      status: "Open",
      isActive: this.formBaseline.value.IsActive,
      updatedOn: new Date(),
      updatedBy: this.userName,
      provinceId: this.provinceId == 0 ? 1 : this.provinceId,
      provinceName: "",
      reason: ''
    };
    if(this.checkValidDistrictAndCircleIsSelected(baseLineData)){return;};
    if (this.isEdit) {
      this.baselineDataService.updateBaselinet(parseInt(this.id), baseLineData).subscribe(data => {
        let provinceAddmsg = "Baseline details are updated";
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: provinceAddmsg, life: 10000 });
        //check the user is added extra offenders 
        if (this.formBaseline.controls['NameOfAccused'].dirty) {
          this.offenderDataService.UpdateOffendersFromBaseLine(baseLineData.caseNo, this.selectedOffenders).subscribe(x => {
            let provinceAddmsg = "Offenders added to baseline details";
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: provinceAddmsg, life: 10000 });
            this.isDataLoaded = true;
          })
        }
      })
    } else {
      this.baselineDataService.createBaseline(baseLineData).subscribe((x) => {
        if (x) {
          console.log(x);
          let caseNo = x.caseNo;
          let provinceAddmsg = "Baseline details saved & Case No:" + caseNo + "";
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: provinceAddmsg, life: 10000 });


          this.offenderDataService.UpdateOffendersFromBaseLine(caseNo, this.selectedOffenders).subscribe(x => {
            let provinceAddmsg = "Offenders added to baseline details";
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: provinceAddmsg, life: 10000 });
          })
          this.isDataLoaded = true;
          this.formBaseline.reset();
        }
      })
    }
  }else{
    let provinceAddmsg = "Please provide the valid input in required fields"
    this.messageService.add({severity:'warn', summary: 'Validation Failed', detail: provinceAddmsg, life: 5000});
  }
  }

  onCircleChange = (event: any) => {
    debugger;
    if (event.value == -1) {
      this.forestDivisions = [];
      this.forestRanges = [];
      this.compartments = [];
      return;
    }
    this.manageDataService.getDistrict().subscribe((data) => {
      data = data.filter(x => x.circleId == event.value);
      data.unshift({
        id: -1, name: 'Select',
        circleId: 0,
        isActive: false,
        circle: { id: -1, name: "", isActive: true, provinceId: -1 }
      });
      this.forestDivisions = data;
      this.circleName = this.circles.filter(x => x.id == event.value)[0].name;
    })

  }

  onForestDivisionChange = (event: any) => {
    this.manageDataService.getDivison().subscribe((data) => {
      data = data.filter(x => x.districtId == event.value);;
      data.unshift({
        id: -1, name: 'Select',
        districtId: 0,
        isActive: false,
        district: { id: -1, name: "", isActive: true, circleId: -1 }
      });
      this.forestRanges = data;
      this.forestDivisionName = this.forestDivisions.filter(x => x.id == event.value)[0].name;
    })

  }
  onForestRangeChange = (event: any) => {
    this.manageDataService.getCompartment().subscribe((data) => {
      data = data.filter(x => x.divisionId == event.value);
      data.unshift({
        id: -1, name: 'Select',
        divisionId: 0,
        isActive: false,
        division: { id: -1, name: "", isActive: true, districtId: -1 }
      });
      this.compartments = data;
      this.forestRangeName = this.forestRanges.filter(x => x.id == event.value)[0].name;
    })
  }

  loadOffenders = async (baseline: BaselineModel) => {
    debugger;
    (await this.offenderDataService.getOffendersData()).subscribe(x => {
      this.offendars = x;
      if (this.isEdit) {
        this.getOffenderDetailsOnAadhar(baseline);
        this.isDataLoaded = true;
      }
      this.isDataLoaded = true;
    })
  }

  filterCountry(event: any) {
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
  onSelect(event: any) {
    debugger;
    // Access the selected item from the event object
    const selectedItem = event;

    // Push the selected item to the selectedOffenders array
    this.selectedOffenders.push(selectedItem);
    this.formBaseline.controls['NameOfAccused'].setValue(this.selectedOffenders);
  }

  onUnselect(event: any) {
    if(this.isEdit){
    this.confirmationService.confirm({
      message: 'Are you sure ? Do you want to remove offender [' + event.name + '] from the case ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const index = this.selectedOffenders.findIndex(x => x.aadhaarNo == event.aadhaarNo);
        if (index !== -1) {
          this.selectedOffenders.splice(index, 1);
        }
        this.offenderDataService.removeCaseId(this.caseId, event).subscribe(x => {
          debugger;
          console.log(x);
          if (x == null) {
            let provinceDeltedItem = "Offender [" + event.name + "] is removed from the case successfully.";
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: provinceDeltedItem, life: 3000 });

          }
        })
      }, reject: () => {
        debugger;
        this.formBaseline.controls['NameOfAccused'].setValue(this.selectedOffenders);
    }
    });
  }
  }
  onCompartmentChange = (event: any) => {
    this.compartmentName = this.compartments.filter(x => x.id == event.value)[0].name;
  }
  convertToDate = (onlyDate: any) => {
    const datePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(onlyDate, 'yyyy-MM-dd');
    return formattedDate;
  }

  getAccusedNames = () => {
    let result = this.selectedOffenders.map(x => x.aadhaarNo).join(',')
    return result;
  }

  getOffenderDetailsOnAadhar = (baseline: BaselineModel) => {
    if(baseline.nameOfAccused == null) { return this.selectedOffenders;};
    let aadharNos: any = baseline.nameOfAccused.indexOf(',') > 0 ? baseline.nameOfAccused.split(',') : baseline.nameOfAccused;
    if (baseline.nameOfAccused.split(',').length > 1) {
      aadharNos.forEach((element: any) => {
        this.selectedOffenders.push(this.offendars.filter(x => x.aadhaarNo == element)[0]);
        this.filteredOffenders = this.selectedOffenders;
        this.formBaseline.controls['NameOfAccused'].setValue(this.selectedOffenders);
      });
    } else {
      this.selectedOffenders.push(this.offendars.filter(x => x.aadhaarNo == aadharNos)[0]);
      this.formBaseline.controls['NameOfAccused'].setValue(this.selectedOffenders);
    }

    return this.selectedOffenders;
  }

  isUserCaseEntryOperatorOrDuptyDirector(){
    return (this.userTypeId == UserTypeEnum.CaseEntryOperator || this.userTypeId == UserTypeEnum.DeputyDirector);
  }

  checkValidDistrictAndCircleIsSelected(baseline : BaselineModel){
    if(this.isUserCaseEntryOperatorOrDuptyDirector()){
     let result =  (baseline.circleId == this.circleId && baseline.forestDivisionId == this.districtId);
     if(!result){
      let provinceAddmsg = "Selected Circle or District are invalid to assigned location. Please provide appropriate circle & Division /district. "
      this.messageService.add({severity:'error', summary: 'Validation Failed', detail: provinceAddmsg, life: 10000});
      return true;
     }
    }
    return false;
  }

// APPROVE & REJECT MODULE

onApproveCase = () =>{
  this.confirmationService.confirm({
    message: 'Are you sure ? Do you want to approve the case ?',
    header: 'Confirm',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      let approvedBaseLineData = this.baseLineData;
      approvedBaseLineData.status = 'Approved';
      this.baselineDataService.updateBaselinet(approvedBaseLineData.id, approvedBaseLineData).subscribe((x)=>{
        let provinceDeltedItem = "Baseline Data is approved.";
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: provinceDeltedItem, life: 3000 });
      });
    } 
  });
}

onRejectCase = () =>{
  this.confirmationService.confirm({
    message: 'Are you sure ? Do you want to reject the case ? Please provide the reason for rejection.',
    header: 'Confirm',
    icon: 'pi pi-exclamation-triangle',
    
    accept: () => {
      this.displayPosition = true;
    }
  });
}

onSubmittedRejectedReason = () =>{
  let rejectedBaseLineData = this.baseLineData;
  rejectedBaseLineData.status = 'Rejected';
  rejectedBaseLineData.reason = this.reason;
  this.baselineDataService.updateBaselinet(rejectedBaseLineData.id, rejectedBaseLineData).subscribe((x)=>{
    let provinceDeltedItem = "Baseline Data is Rejected.";
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: provinceDeltedItem, life: 3000 });
  });
}


}
