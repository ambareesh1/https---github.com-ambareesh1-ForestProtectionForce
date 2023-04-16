import { AbstractControl, FormGroup } from "@angular/forms";


export function  markAllFieldsAsDirty(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control: AbstractControl) => {
        control.markAsDirty();
      });
  }