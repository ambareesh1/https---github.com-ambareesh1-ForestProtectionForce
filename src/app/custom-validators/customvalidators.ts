import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDetailService } from '../services/user-detail.service';
import { ManagedataService } from '../services/managedata.service';

// Custom async validator to check if username is already taken
export function usernameTakenValidator(userService: UserDetailService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const username = control.value;
    return userService.verifyUserName(username).pipe(
      map(isTaken => (isTaken ? { usernameTaken: true } : null))
    );
  };
}
export function emailValidator(userService: UserDetailService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    
    const email = control.value;
    return userService.verifyEmail(email).pipe(
      map(isTaken => (isTaken ? { emailtaken: true } : null))
    );
  };
}
  
  // Custom validator to check if a value is a valid phone number
  export function phoneValidator(userService: UserDetailService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const phone = control.value;
      return userService.verifyPhone(phone).pipe(
        map(isTaken => (isTaken ? { phoneTaken: true } : null))
      );
    };
  }


  export function provinceValidator(manageDataService: ManagedataService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const province = control.value;
      return manageDataService.getProvinceByName(province).pipe(
        map(isTaken => (isTaken ? { provinceTaken: true } : null))
      );
    };
  }


  export function circleValidator(manageDataService: ManagedataService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const circle = control.value;
      return manageDataService.getCircleByName(circle).pipe(
        map(isTaken => (isTaken ? { circleTaken: true } : null))
      );
    };
  }


  export function districtValidator(manageDataService: ManagedataService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const district = control.value;
      return manageDataService.getDistrictByName(district).pipe(
        map(isTaken => (isTaken ? { districtTaken: true } : null))
      );
    };
  }


  export function divisionValidator(manageDataService: ManagedataService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      
      const division = control.value;
      return manageDataService.getDivisonByName(division).pipe(
        map(isTaken => (isTaken ? { divisionTaken: true } : null))
      );
    };
  }


  export function compartmentValidator(manageDataService: ManagedataService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const compartment = control.value;
      return manageDataService.getCompartmentByName(compartment).pipe(
        map(isTaken => (isTaken ? { compartmentTaken: true } : null))
      );
    };
  }

  export function passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value || '';
  
    const hasLowercase = /[a-z]/.test(value);
    const hasUppercase = /[A-Z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(value);
  
    const errors: ValidationErrors = {};
  
    if (!hasLowercase) {
      errors['lowercase'] = true;
    }
  
    if (!hasUppercase) {
      errors['uppercase'] = true;
    }
  
    if (!hasNumeric) {
      errors['numeric'] = true;
    }
  
    if (!hasSpecialChar) {
      errors['special'] = true;
    }
  
    if (value.length < 8) {
      errors['minlength'] = true;
    }
  
    return Object.keys(errors).length ? errors : null;
  }