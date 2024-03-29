import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminUser } from '../Models/AdmimUsersModel';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ManagedataService } from '../services/managedata.service';
import { Circle, Province } from '../Models/ManageDataModels';
import { async } from '@angular/core/testing';
import { RefreshService } from '../services/refresh.service';
import { circleValidator } from '../custom-validators/customvalidators';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-manage-circle',
  templateUrl: './manage-circle.component.html',
  styleUrls: ['./manage-circle.component.css']
})
export class ManageCircleComponent {

  productDialog: boolean = false;
  Delete : any = "Delete";
  btnTitle : any = "Add";
  circle : Circle[] = [];
  ProvinceData : Province[]=[];
  circleDataOnEdit : Circle = {} as Circle;
  submitted: boolean = true;
  search : any = "";
  

 formCircle: FormGroup =new FormGroup({});
 constructor(private manageDataService: ManagedataService,
    private messageService: MessageService,
     private confirmationService: ConfirmationService,
      private fb: FormBuilder, private refreshService : RefreshService,
      private viewportScroller: ViewportScroller) { 
     }

 ngOnInit() {

   this.getCircleData();
   this.getProvisionData();
  
 }
 initForm(circle: Circle = {} as Circle){
  
   this.formCircle = this.fb.group({
    circleName: [circle.name || '', Validators.required, [circleValidator(this.manageDataService)]],
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
  this.btnTitle = "Add";
  if(Object.keys(this.circleDataOnEdit).length === 0){
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
  }else{
    this.circleDataOnEdit.name = this.formCircle.value.circleName;
      this.manageDataService.updateCircle(this.circleDataOnEdit.id, this.circleDataOnEdit).subscribe((x)=>{
       
         let provinceAddmsg = "circle "+this.formCircle.value.circleName+ " updated"
         this.messageService.add({severity:'success', summary: 'Successful', detail: provinceAddmsg, life: 5000});
         this.formCircle.reset();
         this.getCircleData();
        this.circleDataOnEdit = {} as Circle;
       
       })
  }
  
}

 editCircle(circle: Circle) {
  this.circleDataOnEdit = circle;
  this.btnTitle = "Update";
    this.initForm(circle);
     this.productDialog = true;
     this.viewportScroller.scrollToPosition([0, 0]);
 }

 
 onReset(){
  this.formCircle.reset();
  this.btnTitle = "Add";
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
 
 get circleControl() {
  return this.formCircle.get('circleName');
}
 
}

