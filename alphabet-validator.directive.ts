import { Directive, HostListener, ElementRef } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
@Directive({
  selector: '[AlphabetFieldValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: AlphabetValidatorDirective, multi: true}]
})
export class AlphabetValidatorDirective {
  private regex: RegExp = new RegExp(/^[a-zA-Z ]+$/i);
  private specialKeys: Array<string> = [ 'Backspace', 'Tab', 'End', 'Home', 'Space'];
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
    const alphaRegEx = /^[a-zA-Z ]+$/i;
    const validAlpha = alphaRegEx.test(control.value);
    // console.log(validMobile);
   return control.value < 1 || validAlpha ? null : {'AlphabetFieldValidator': true};
  }

}
