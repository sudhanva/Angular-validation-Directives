import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
@Directive({
  selector: '[PincodeFieldValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: PincodeValidatorDirective, multi: true}]
})
export class PincodeValidatorDirective {

  constructor() { }

  public validate(control: AbstractControl): {[key: string]: any} {
    const isPinRegEx = /^[0-9]{6}$/g;
    // const isPinRegEx = /^[1-9]\d*(\.\d+)?$/g;
    const validPin = isPinRegEx.test(control.value);
    // console.log(validMobile);

   return control.value < 1 || validPin ? null : {'PincodeFieldValidator': true};
  }

}
