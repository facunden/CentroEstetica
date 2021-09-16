import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GestionesPendientesComponent } from './gestiones-pendientes.component';

describe('GestionesPendientesComponent', () => {
  let component: GestionesPendientesComponent;
  let fixture: ComponentFixture<GestionesPendientesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionesPendientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionesPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
