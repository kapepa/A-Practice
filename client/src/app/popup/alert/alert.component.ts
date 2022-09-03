import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DtoRecipe} from "../../dto/dto.recipe";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Output() closeAlert: EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor() { }

  ngOnInit(): void {
  }

  close(e: Event) {
    this.closeAlert.emit(true);
  }
}
