import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutDefComponent } from './layout-def.component';
import { RouterTestingModule } from "@angular/router/testing";

describe('LayoutDefComponent', () => {
  let component: LayoutDefComponent;
  let fixture: ComponentFixture<LayoutDefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ LayoutDefComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutDefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
