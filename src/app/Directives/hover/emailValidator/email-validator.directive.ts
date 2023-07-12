import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[hInvEmailValidator]',
  providers: [{provide: NG_VALIDATORS,
  useExisting: EmailValidatorDirective,
  multi: true
}]
})
export class EmailValidatorDirective implements Validator {

  constructor() { }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    const value = control.value as string;
    if(value.includes('admin')){
      return{ invalidEmail:true}
    }
    return null
  }

  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }

}
