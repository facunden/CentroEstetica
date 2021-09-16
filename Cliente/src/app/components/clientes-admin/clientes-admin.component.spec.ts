import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ClientesAdminComponent } from './clientes-admin.component';

describe('ClientesAdminComponent', () => {
  let component: ClientesAdminComponent;
  let fixture: ComponentFixture<ClientesAdminComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientesAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
