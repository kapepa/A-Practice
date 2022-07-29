import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appAuth]'
})
export class AuthDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
