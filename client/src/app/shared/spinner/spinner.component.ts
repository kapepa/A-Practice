import { Component, OnInit } from '@angular/core';
import {SpinnerService} from "../../service/spinner.service";

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  spinner!: boolean;

  constructor(
    private spinnerService: SpinnerService,
  ) { }

  ngOnInit(): void {
    this.spinnerService.spinner.subscribe(( bool: boolean ) => {
      this.spinner = bool;
    })
  }

}
