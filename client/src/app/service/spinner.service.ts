import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  spinner$: boolean = false;
  spinner: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  changeState() {
    this.spinner$ = !this.spinner$;
    this.spinner.next(this.spinner$)
  }
}
