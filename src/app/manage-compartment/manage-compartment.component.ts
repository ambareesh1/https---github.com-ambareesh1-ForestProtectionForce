import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminUser } from '../Models/AdmimUsersModel';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ManagedataService } from '../services/managedata.service';
import { CircleView, Compartment, District, Division, Province } from '../Models/ManageDataModels';
import { RefreshService } from '../services/refresh.service';
import { compartmentValidator } from '../custom-validators/customvalidators';


@Component({
  selector: 'app-manage-compartment',
  templateUrl: './manage-compartment.component.html',
  styleUrls: ['./manage-compartment.component.css']
})
export class ManageCompartmentComponent {

  productDialog: boolean = false;
  Delete : any = "Delete";
  compartment : Compartment[] = [];
  divisontData : Division[]=[];
  districtData : District[]=[];
  provinceData : Province[]=[];
  circleData : CircleView[] =[];
  submitted: boolean = true;
  search : any = "";

 formCompartment: FormGroup =new FormGroup({});
 constructor(private manageDataService: ManagedataService,
    private messageService: MessageService,
     private confirmationService: ConfirmationService,
      private fb: FormBuilder, private refreshServie : RefreshService) { 
     }

 ngOnInit() {
  this.refreshServie.refreshEvent.subscribe(() => {
   this.getCompartmentData();
   this.getDivisionData();
   this.getDistrictData();
   this.getCircleData();
   this.getProvinceData();
  });
 }
 initForm(compartment: Compartment = {} as Compartment){
  
   this.formCompartment = this.fb.group({
    compartmentName: [compartment.name || '', Validators.required, [compartmentValidator(this.manageDataService)]],
    division : [compartment.divisionId || this.divisontData[0].id]
   });
}

getCompartmentData(){
 this.manageDataService.getCompartment().subscribe((data)=>{
   this.compartment = data;
 })
}

getDivisionData = () => {
  this.manageDataService.getDivison().subscribe((data) =>{
     this.divisontData = data;
     this.initForm();
    });
}
getDistrictData = () => {
  this.manageDataService.getDistrict().subscribe((data) =>{
     this.districtData = data;
     this.initForm();
    });
}
getProvinceData(){
  this.manageDataService.getProvince().subscribe((data)=>{
    this.provinceData = data;
  })
 }

 getCircleData(){
  this.manageDataService.getCircle().subscribe((data)=>{
    this.circleData = data;
  })
 }
onSubmitCompartment() {
  console.log(this.formCompartment.value);
   let compartmentData: Compartment = {
     id: 0,
     name: this.formCompartment.value.compartmentName,
     isActive: true,
     divisionId: this.formCompartment.value.division
   };
  
   this.manageDataService.createCompartment(compartmentData).subscribe((x)=>{
    if(x){
     let compartmentAddmsg = "compartment "+this.formCompartment.value.compartmentName+ " saved"
     this.messageService.add({severity:'success', summary: 'Successful', detail: compartmentAddmsg, life: 5000});
     this.getCompartmentData();
     this.formCompartment.reset();
    }
   })
}

 editCompartment(compartment: Compartment) {
    this.initForm(compartment);
     this.productDialog = true;
 }

 deleteCompartment(compartment: Compartment) {
         this.confirmationService.confirm({
           message: 'Are you sure you want to delete ' + compartment.name + '?',
           header: 'Confirm',
           icon: 'pi pi-exclamation-triangle',
           accept: () => {
             this.manageDataService.deleteDivison(compartment.id).subscribe((x)=>{
               if(x==null){
               this.compartment = this.compartment.filter(val => val.id !== compartment.id);
                let compartmentDeltedItem = "compartment "+compartment.name+" is Deleted";
               this.messageService.add({severity:'success', summary: 'Successful', detail: compartmentDeltedItem, life: 3000});
               
           }
         })
       }
       });
 }

 hideDialog() {
     this.productDialog = false;
     this.submitted = false;
 }
 
 onChangeProvince = (event:any)=>{
  this.manageDataService.getCircle().subscribe((data)=>{
    
    data= data.filter(x=>x.provinceId == event.value);
     this.circleData = data;
   })
 }
 
 onChangeCircle = (event:any) =>{
  this.manageDataService.getDistrict().subscribe((data)=>{
    
    data= data.filter(x=>x.circleId == event.value);
     this.districtData = data;
   })
 }

 onChangDistrict = (event:any) =>{
  this.manageDataService.getDivison().subscribe((data)=>{
    
    data= data.filter(x=>x.districtId == event.value);
     this.divisontData = data;
   })
 }
 
 get compartmentControl() {
  return this.formCompartment.get('compartmentName');
}

}
