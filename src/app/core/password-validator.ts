import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const passwordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const ps = control.get('password');
    const conf = control.get('confirmPassword');
  
    return ps && conf && ps.value !== conf.value ? { noMatch: true } : null;
};