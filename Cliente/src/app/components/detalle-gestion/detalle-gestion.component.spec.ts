import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DetalleGestionComponent } from './detalle-gestion.component';

describe('DetalleGestionComponent', () => {
  let component: DetalleGestionComponent;
  let fixture: ComponentFixture<DetalleGestionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleGestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
