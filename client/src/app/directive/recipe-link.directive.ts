import {Directive, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appRecipeLink]'
})
export class RecipeLinkDirective {

  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    this.navigatedTo = this.linkParams;
  }

}
