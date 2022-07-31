import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SpinnerService} from "../../service/spinner.service";

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  @Input() spinner!: boolean;

  constructor(
  ) { }

  ngOnInit(): void {

  }

}
