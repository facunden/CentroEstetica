import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ObservacionesTabuladasAdminComponent } from './observaciones-tabuladas-admin.component';

describe('ObservacionesTabuladasAdminComponent', () => {
  let component: ObservacionesTabuladasAdminComponent;
  let fixture: ComponentFixture<ObservacionesTabuladasAdminComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservacionesTabuladasAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservacionesTabuladasAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
