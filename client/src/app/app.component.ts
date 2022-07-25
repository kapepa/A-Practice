import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  title = 'client';

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    // console.log('window:scroll')
  }
}
