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
import { ActivatedRoute } from '@angular/router';
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
  isItNavigatedFromBaeline : boolean = false;
  id: string = "";
  isEdit : boolean = false;
  isDataLoaded : boolean = false;
  titleText = "Manage Offenders Profile";
  buttonText = "Submit";

  constructor(private fb: FormBuilder, 
    private manageDataService : ManagedataService,
    private offenderDataService: OffenderdataService,
    private messageService: MessageService,
    private sharedService : SharedService, 
    private baseLineservice : BaselinedataService,
     private route: ActivatedRoute) { 
    debugger;
      this.caseId = this.sharedService.getCaseId();
      this.route.queryParams.subscribe(params => {
        if (Object.keys(params).length > 0) {
        this.caseId = params['data'];
        this.isItNavigatedFromBaeline = true;
        }
      });
    }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    if(this.id != null) {
      this.isEdit = true;
      this.buttonText = "Update"
      this.titleText = "Update Offenders Profile";

      this.offenderDataService.getOffendersData().subscribe((data:any)=>{
        let offender = data.filter((x:any)=>x.id == parseInt(this.id))[0];
        this.isDataLoaded = true;
        this.initFormOffender(offender);
      })
    }
   this.getDistrictData();
  }

  getDistrictData = () => {
    this.manageDataService.getDistrict().subscribe((data) =>{
       this.districtData = data;
       if(!this.isEdit){
          this.initFormOffender({} as Offender);
       }
      });
  }

  bindCaseIds = () =>{
   this.baseLineservice.getBaseline().subscribe(x=>{
      this.caseIds = x;
    })
  }

  initFormOffender =(offender:any) =>{
    console.log(offender);
    this.formOffender = this.fb.group({
      caseId :[offender.caseId || this.caseId],
      name: [offender.name || '', Validators.required],
      surNameAlias: [offender.surnameAlias ||''],
      fatherName: [offender.fatherHusbandNameAlias ||'', Validators.required],
      caste: [offender.caste ||'', Validators.required],
      trade: [offender.tradeProfession ||'', Validators.required],
      dateOfPhotography: [Object.keys(offender).length !== 0 ?new Date(offender.dateOfPhotography):''||'', Validators.required],
      photo: [''],

      dateOfBirth: [Object.keys(offender).length !== 0 ?new Date(offender.dateOfBirth):''||'', Validators.required],
      age: [offender.age ||0, Validators.required],
      sex: [offender.sex ||'male', Validators.required],
      citizenShip: [offender.citizenship ||'', Validators.required],
      email: [offender.email ||'', Validators.required],
      passport: [offender.passportNo ||'', Validators.required],
      mobileNo: [offender.telephoneMobileNo ||'', Validators.required],
      aadharNo: [offender.aadhaarNo ||'', Validators.required],
      backAccountNo: [offender.bankAccountNo ||'', Validators.required],

      houseNo: [offender.houseNo ||'', Validators.required],
      village: [offender.village ||'', Validators.required],
      city: [offender.city ||'', Validators.required],
      street: [offender.street ||'', Validators.required],
      policeStation: [offender.policeStation ||'', Validators.required],
      district: [offender.districtId ||this.districtData[0].id, Validators.required],
      pincode: [offender.pinCode ||'', Validators.required]
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
      Id: this.isEdit?  parseInt(this.id) : 0,
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

    if(this.isEdit){
      this.offenderDataService.UpdateOffendersDetails(parseInt(this.id), offenderData).subscribe(data=>{
        let provinceAddmsg = "Offender details updated successfully"
        this.messageService.add({severity:'success', summary: 'Successful', detail: provinceAddmsg, life: 5000});
      })
    }else{
    this.offenderDataService.createOffender(offenderData).subscribe((x)=>{
      if(x){
       let provinceAddmsg = "Offender details "+this.formOffender.value.Name+ " saved"
       this.messageService.add({severity:'success', summary: 'Successful', detail: provinceAddmsg, life: 5000});
       this.formOffender.reset();
       //this.getProvinceData();
      }
     })
    }
    
  }
  
  onUpload(event:any) {
    debugger;
     for(let file of event.files) {
            this.uploadedFiles.push(file);
        }
  let currentFile = this.uploadedFiles[0].name;
  console.log("-----Files------");
  console.log(event);
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