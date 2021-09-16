import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TipoGestionAdminComponent } from './tipo-gestion-admin.component';

describe('CrearTipoGestionComponent', () => {
  let component: TipoGestionAdminComponent;
  let fixture: ComponentFixture<TipoGestionAdminComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoGestionAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoGestionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
