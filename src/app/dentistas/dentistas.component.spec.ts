import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DentistasComponent } from './dentistas.component';

describe('DentistasComponent', () => {
  let component: DentistasComponent;
  let fixture: ComponentFixture<DentistasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DentistasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DentistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
