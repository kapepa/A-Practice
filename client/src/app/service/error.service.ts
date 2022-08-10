import { Injectable } from '@angular/core';
import { DtoErrorPopup } from "../dto/dto.common";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  isError: DtoErrorPopup = { open: false, title: '', desc: '' } as DtoErrorPopup;
  isErrorSubject = new Subject<DtoErrorPopup>();

  constructor() { }

  setError(data: DtoErrorPopup): void {
    this.isErrorSubject.next(data);
  }

  restError(): void {
    this.isErrorSubject.next({open: false, title: '', desc: ''});
  }
}
