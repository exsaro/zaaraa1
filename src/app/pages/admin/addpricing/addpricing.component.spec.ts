import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpricingComponent } from './addpricing.component';

describe('AddpricingComponent', () => {
  let component: AddpricingComponent;
  let fixture: ComponentFixture<AddpricingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddpricingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
