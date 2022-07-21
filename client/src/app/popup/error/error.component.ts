import { Component, OnInit } from '@angular/core';
import { Subject } from "rxjs";
import { DtoErrorPopup } from "../../dto/dto.common";
import {ErrorService} from "../../service/error.service";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})

export class ErrorComponent implements OnInit {
  isError: DtoErrorPopup = { } as DtoErrorPopup;

  constructor(
    private errorService: ErrorService,
  ) {
    this.errorService.isErrorSubject.subscribe(( data: DtoErrorPopup ) => {
      this.isError = data;
    })
  }

  ngOnInit(): void {
    this.isError = this.errorService.isError;
  }

  closePopUp(e: Event) {
    e.stopPropagation();
    const target = e.currentTarget as HTMLElement;

    if(target.classList.contains('btn') || target.classList.contains('popup__zone')){
      this.errorService.restError()
    }
  }
}
