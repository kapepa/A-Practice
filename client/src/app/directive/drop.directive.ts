import {Directive, ElementRef, HostBinding, HostListener, ViewChild} from '@angular/core';

@Directive({
  selector: '[appDrop]'
})
export class DropDirective {
  @HostBinding('class.show') toggle = false;

  constructor(private el: ElementRef) {}

  @HostListener('click') onClick () {
    this.toggle = !this.toggle;
  }


}
