import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Subject } from "rxjs";
import { DtoErrorPopup } from "../../dto/dto.common";
import { ErrorService } from "../../service/error.service";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})

export class ErrorComponent implements OnInit {
  @Input() isError!: DtoErrorPopup;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  closePopUp(e: Event) {
    e.stopPropagation();
    const target = e.currentTarget as HTMLElement;

    if(target.classList.contains('btn') || target.classList.contains('popup__zone')){
      this.close.emit();
    }
  }
}
