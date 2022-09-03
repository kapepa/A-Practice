import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertComponent } from './alert.component';
import {By} from "@angular/platform-browser";

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should click on alert popup and close',() => {
    let htmlAlert = fixture.debugElement.query(By.css('#alert'));

    component.closeAlert.pipe().subscribe((attr: Boolean) => {
      expect(attr).toBeTrue();
    })

    htmlAlert.triggerEventHandler('click');
  })
});
