import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbuilderComponent } from './addbuilder.component';

describe('AddbuilderComponent', () => {
  let component: AddbuilderComponent;
  let fixture: ComponentFixture<AddbuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddbuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddbuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
