import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appSpinner]',
  exportAs: 'appSpinner',
})
export class SpinnerDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
