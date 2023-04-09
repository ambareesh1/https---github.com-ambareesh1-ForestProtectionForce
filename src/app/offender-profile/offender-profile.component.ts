import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { District } from '../Models/ManageDataModels';
import { ManagedataService } from '../services/managedata.service';
import { environment } from 'src/environments/environment.development';
import { OffenderdataService } from '../services/offenderdata.service';
import { MessageService } from 'primeng/api';
import { Offender } from '../Models/OffenderModel';
import { SharedService } from '../services/shared.service';
import { BaselineModel } from '../Models/BaselineModel';
import { BaselinedataService } from '../services/baselinedata.service';
@Component({
  selector: 'app-offender-profile',
  templateUrl: './offender-profile.component.html',
  styleUrls: ['./offender-profile.component.css']
})
export class OffenderProfileComponent {
  formOffender: FormGroup =new FormGroup({});
  maxDate: Date = new Date();
  districtData : District[]=[];
  imageUploadUrl : any = environment.apiBaseUrl+'/Offenders/upload';
  fileUploadPath : any = "";
  caseId : any = "";
  uploadedFiles: any[] = [];
  caseIds: BaselineModel[] = [];
  filteredCaseIds: BaselineModel[]=[];

  constructor(private fb: FormBuilder, 
    private manageDataService : ManagedataService,
    private offenderDataService: OffenderdataService,
    private messageService: MessageService,
    private sharedService : SharedService, 
    private baseLineservice : BaselinedataService) { 
    
      this.caseId = this.sharedService.getCaseId();
    }

  ngOnInit(): void {
   this.getDistrictData();
  }

  getDistrictData = () => {
    this.manageDataService.getDistrict().subscribe((data) =>{
       this.districtData = data;
       this.initFormOffender();
      });
  }

  bindCaseIds = () =>{
   this.baseLineservice.getBaseline().subscribe(x=>{
      this.caseIds = x;
    })
  }

  initFormOffender =() =>{
    debugger;
    this.formOffender = this.fb.group({
      caseId :[this.caseId],
      name: ['', Validators.required],
      surNameAlias: [''],
      fatherName: ['', Validators.required],
      caste: ['', Validators.required],
      trade: ['', Validators.required],
      dateOfPhotography: ['', Validators.required],
      photo: [''],

      dateOfBirth: ['', Validators.required],
      age: ['', Validators.required],
      sex: ['male', Validators.required],
      citizenShip: ['', Validators.required],
      email: ['', Validators.required],
      passport: ['', Validators.required],
      mobileNo: ['', Validators.required],
      aadharNo: ['', Validators.required],
      backAccountNo: ['', Validators.required],

      houseNo: ['', Validators.required],
      village: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
      policeStation: ['', Validators.required],
      district: [this.districtData[0].id, Validators.required],
      pincode: ['', Validators.required]
    });
  }

  onDateSelect(event:any) {
    const dateOfBirth = new Date(event);
    const currentDate = new Date();
    const diffInMs = Math.abs(currentDate.getTime() - dateOfBirth.getTime());
    const age = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 365));
    this.formOffender.controls['age'].setValue(age);
  }

  onSubmitOffender(): void{
    
    let offenderData: Offender = {
      Id: 0,
      caseId: this.caseId, //this.formOffender.value.caseId,
      Name: this.formOffender.value.name,
      SurnameAlias: this.formOffender.value.surNameAlias,
      FatherHusbandNameAlias: this.formOffender.value.fatherName,
      Caste: this.formOffender.value.caste,
      TradeProfession: this.formOffender.value.trade,
      DateOfPhotography: this.formOffender.value.dateOfPhotography,
      Photo: this.formOffender.value.photo,

      DateOfBirth: this.formOffender.value.dateOfBirth,
      Age: this.formOffender.value.age,
      Sex: this.formOffender.value.sex,
      Citizenship: this.formOffender.value.citizenShip,
      Email: this.formOffender.value.email,
      PassportNo: this.formOffender.value.passport,
      TelephoneMobileNo: this.formOffender.value.mobileNo,
      AadhaarNo: this.formOffender.value.aadharNo,
      BankAccountNo: this.formOffender.value.backAccountNo,

      HouseNo: this.formOffender.value.houseNo,
      Village: this.formOffender.value.village,
      City: this.formOffender.value.city,
      Street: this.formOffender.value.street,
      PoliceStation: this.formOffender.value.policeStation,
      DistrictId: this.formOffender.value.district,
      UpdatedBy: '',
      UpdatedOn: new Date(),
      IsActive: true,
      PinCode: this.formOffender.value.pincode,
    };

    
    this.offenderDataService.createOffender(offenderData).subscribe((x)=>{
      if(x){
       let provinceAddmsg = "Offender details "+this.formOffender.value.Name+ " saved"
       this.messageService.add({severity:'success', summary: 'Successful', detail: provinceAddmsg, life: 5000});
       this.formOffender.reset();
       //this.getProvinceData();
      }
     })
    
  }
  
  onUpload(event:any) {
    debugger;
     for(let file of event.files) {
            this.uploadedFiles.push(file);
        }
  let currentFile = this.uploadedFiles[0].name;
  this.formOffender.controls['photo'].setValue(environment.fileUploadPath+"/uploads/"+currentFile);
  this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }

  onSubmit(): void {
    // Do something with the form data
  }

  searchCountries(event:any) {
    const query = event.query;
    this.filteredCaseIds = this.caseIds.filter(country => country.caseNo.toLowerCase().startsWith(query.toLowerCase()));
  }
}