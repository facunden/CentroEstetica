import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TipoGestionCategoriasAdminComponent } from './tipo-gestion-categorias-admin.component';

describe('TipoGestionCategoriasAdminComponent', () => {
  let component: TipoGestionCategoriasAdminComponent;
  let fixture: ComponentFixture<TipoGestionCategoriasAdminComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoGestionCategoriasAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoGestionCategoriasAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
