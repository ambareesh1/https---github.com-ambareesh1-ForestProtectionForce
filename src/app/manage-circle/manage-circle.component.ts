import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminUser } from '../Models/AdmimUsersModel';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ManagedataService } from '../services/managedata.service';
import { Circle, Province } from '../Models/ManageDataModels';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-manage-circle',
  templateUrl: './manage-circle.component.html',
  styleUrls: ['./manage-circle.component.css']
})
export class ManageCircleComponent {

  productDialog: boolean = false;
  Delete : any = "Delete";
  circle : Circle[] = [];
  ProvinceData : Province[]=[];
  submitted: boolean = true;
  search : any = "";

 formCircle: FormGroup =new FormGroup({});
 constructor(private manageDataService: ManagedataService,
    private messageService: MessageService,
     private confirmationService: ConfirmationService,
      private fb: FormBuilder) { 
     }

 ngOnInit() {
   this.getCircleData();
   this.getProvisionData();
 }
 initForm(circle: Circle = {} as Circle){
  
   this.formCircle = this.fb.group({
    circleName: [circle.name || '', Validators.required],
       province : [circle.provinceId || this.ProvinceData[0].id]
   });
}

getCircleData(){
 this.manageDataService.getCircle().subscribe((data)=>{
   this.circle = data;
 })
}

getProvisionData = () => {
  this.manageDataService.getProvince().subscribe((data) =>{
     this.ProvinceData = data;
     this.initForm();
    });
}

onSubmitCircle() {
  console.log(this.formCircle.value);
   let circleData: Circle = {
     id: 0,
     name: this.formCircle.value.circleName,
     isActive: true,
     provinceId: this.formCircle.value.province
   };
  
   this.manageDataService.createCircle(circleData).subscribe((x)=>{
    if(x){
     let circleAddmsg = "circle "+this.formCircle.value.circleName+ " saved"
     this.messageService.add({severity:'success', summary: 'Successful', detail: circleAddmsg, life: 5000});
     this.getCircleData();
    }
   })
}

 editCircle(circle: Circle) {
    this.initForm(circle);
     this.productDialog = true;
 }

 deleteCircle(circle: Circle) {
         this.confirmationService.confirm({
           message: 'Are you sure you want to delete ' + circle.name + '?',
           header: 'Confirm',
           icon: 'pi pi-exclamation-triangle',
           accept: () => {
             this.manageDataService.deleteCircle(circle.id).subscribe((x)=>{
               if(x==null){
               this.circle = this.circle.filter(val => val.id !== circle.id);
                let circleDeltedItem = "circle "+circle.name+" is Deleted";
               this.messageService.add({severity:'success', summary: 'Successful', detail: circleDeltedItem, life: 3000});
               
           }
         })
       }
       });
 }

 hideDialog() {
     this.productDialog = false;
     this.submitted = false;
 }
 

 
}

