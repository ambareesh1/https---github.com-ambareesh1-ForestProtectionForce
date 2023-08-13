import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminUser } from '../Models/AdmimUsersModel';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ManagedataService } from '../services/managedata.service';
import { UserTypes } from '../Models/UserTypes';
import { UserTypeService } from '../services/user-type.service';


@Component({
  selector: 'app-manage-user-types',
  templateUrl: './manage-user-types.component.html',
  styleUrls: ['./manage-user-types.component.css']
})
export class ManageUserTypesComponent {

  productDialog: boolean = false;
  Delete : any = "Delete";
  userTypes : UserTypes[] = [];
 submitted: boolean = true;
 search : any = "";
 btnTitle : any = "Add";
 userTypesDataOnEdit : UserTypes = {} as UserTypes;

 formUserTypes: FormGroup =new FormGroup({});
 constructor(private userTypeDataService: UserTypeService,
    private messageService: MessageService,
     private confirmationService: ConfirmationService,
      private fb: FormBuilder) { 
     }

 ngOnInit() {
   this.initForm();
   this.getUserTypesData();
 }
 initForm(userTypes: UserTypes = {} as UserTypes){
  
   this.formUserTypes = this.fb.group({
       userTypesName: [userTypes.name || '', Validators.required]
   });
}

getUserTypesData(){
 this.userTypeDataService.getUserTypes().subscribe((data)=>{
   this.userTypes = data;
 })
}

onSubmitUserTypes() {
   let userTypesData: UserTypes = {
     id: 0,
     name: this.formUserTypes.value.userTypesName,
     isActive: true
   };
  
   this.userTypeDataService.createUserTypes(userTypesData).subscribe((x)=>{
    
    if(x){
     let userTypesAddmsg = "UserTypes "+this.formUserTypes.value.userTypesName+ " saved"
     this.messageService.add({severity:'success', summary: 'Successful', detail: userTypesAddmsg, life: 5000});
     this.formUserTypes.reset();
     this.getUserTypesData();
    }
   })
}

 editUserTypes(userTypes: UserTypes) {
    this.initForm(userTypes);
     this.productDialog = true;
 }

 deleteUserTypes(userTypes: UserTypes) {
         this.confirmationService.confirm({
           message: 'Are you sure you want to delete ' + userTypes.name + '?',
           header: 'Confirm',
           icon: 'pi pi-exclamation-triangle',
           accept: () => {
             this.userTypeDataService.deleteUserTypes(userTypes.id).subscribe((x)=>{
               
               console.log(x);
               if(x==null){
               this.userTypes = this.userTypes.filter(val => val.id !== userTypes.id);
                let userTypesDeltedItem = "userTypes "+userTypes.name+" is Deleted";
               this.messageService.add({severity:'success', summary: 'Successful', detail: userTypesDeltedItem, life: 3000});
               
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

