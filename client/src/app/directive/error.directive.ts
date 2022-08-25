import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appError]',
  exportAs: 'appError',
})
export class ErrorDirective {

  constructor(public viewContainerRef: ViewContainerRef) { };

}
