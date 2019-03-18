import { Directive, ElementRef, HostListener } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[IntegerDecimalFieldValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: IntegerDecimalValidatorDirective, multi: true}]
})
export class IntegerDecimalValidatorDirective {

  private regex: RegExp = new RegExp(/^[0-9]+([0-9.]*)$/g); 
  private specialKeys: Array<string> = [ 'Backspace', 'Tab', 'End', 'Home'];
  constructor(private el: ElementRef) { }
  @HostListener('keydown', [ '$event' ])
  onKeyDown(event: KeyboardEvent) {
  // Allow Backspace, tab, end, and home keys
  if (this.specialKeys.indexOf(event.key) !== -1) {
  return;
  }
  const current: string = this.el.nativeElement.value;
  const next: string = current.concat(event.key);
  if (next && !String(next).match(this.regex)) {
  event.preventDefault();
  }
  }
  public validate(control: AbstractControl): {[key: string]: any} {
     const isDecimalRegEx = /^[1-9]\d*(\.\d{3})?$/g;
    const validDecimal = isDecimalRegEx.test(control.value);
    // console.log(validMobile);

   return control.value < 1 || validDecimal ? null : {'IntegerDecimalFieldValidator': true};
  }


}
