import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[PanFieldValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: PanValidatorDirective, multi: true}]
})
export class PanValidatorDirective {

  constructor() { }
  public validate(control: AbstractControl): {[key: string]: any} {
    const panRegEx = /^[A-Za-z]{5}\d{4}[A-Za-z]{1}/g;
   const validPan = panRegEx.test(control.value);
   // console.log(validMobile);

  return control.value < 1 || validPan ? null : {'PanFieldValidator': true};
 }

}
