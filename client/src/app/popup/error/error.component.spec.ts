import {ComponentFixture, TestBed} from '@angular/core/testing';

import { ErrorComponent } from './error.component';
import {DtoErrorPopup} from "../../dto/dto.common";
import {By} from "@angular/platform-browser";

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;

  let error: DtoErrorPopup = {
    open: true,
    title: 'Title',
    desc: 'Description',
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ErrorComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;

    component.isError = error;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close error popup',() => {
    spyOn(component, 'closePopUp').and.callThrough();
    let popup = fixture.debugElement.query(By.css('#isError'));

    component.close.pipe().subscribe((attr) => {
      expect(attr).toBeUndefined();
    })
    popup.triggerEventHandler(
      'click',
      {stopPropagation: () => {}, currentTarget: {classList: { contains: (attr: string): boolean => attr === 'popup__zone' }} }
    );

    expect(component.closePopUp).toHaveBeenCalled();
  })
});
