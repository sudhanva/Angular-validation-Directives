import { Directive, ElementRef, HostListener } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[MobileFieldValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: MobileValidatorDirective, multi: true}]
})
export class MobileValidatorDirective {
  private regex: RegExp = new RegExp(/^[6-9]+([0-9]*)$/g); 
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
    const mobileRegEx = /^[6-9][0-9]{9}$/g;
    const validMobile = mobileRegEx.test(control.value);
    // console.log(validMobile);
   return control.value < 1 || validMobile ? null : {'MobileFieldValidator': true};
  }

}
