import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderlistComponent } from './builderlist.component';

describe('BuilderlistComponent', () => {
  let component: BuilderlistComponent;
  let fixture: ComponentFixture<BuilderlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuilderlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuilderlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
