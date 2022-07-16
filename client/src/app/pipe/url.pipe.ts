import { Pipe, PipeTransform } from '@angular/core';
import { Router } from "@angular/router";

@Pipe({
  name: 'url'
})
export class UrlPipe implements PipeTransform {

  constructor(private router: Router) {}

  transform(value: unknown, ...args: unknown[]): unknown {
    console.log(this.router.url)
    return null;
  }

};
