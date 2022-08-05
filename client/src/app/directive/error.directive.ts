import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appError]'
})
export class ErrorDirective {

  constructor(public viewContainerRef: ViewContainerRef) { };

}
