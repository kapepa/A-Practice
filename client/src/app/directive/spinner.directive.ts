import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appSpinner]'
})
export class SpinnerDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
