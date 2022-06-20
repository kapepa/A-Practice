import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutDefComponent } from './layout-def.component';

describe('LayoutDefComponent', () => {
  let component: LayoutDefComponent;
  let fixture: ComponentFixture<LayoutDefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
