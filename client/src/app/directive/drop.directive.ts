import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDrop]',
  exportAs: 'dropList'
})
export class DropDirective {
  @HostBinding('class.show') toggle = false;

  constructor(
    private el: ElementRef,
  ) {}

  @HostListener('click', ['$event'])
  onClick (event: Event) {
    event.stopPropagation()
    this.toggle = !this.toggle;
  }

  @HostListener('window:click', ['$event'])
  onWindow(event: Event) {
    if(this.toggle) this.toggle = !this.toggle;
  }

}
