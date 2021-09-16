import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferidosAdminComponent } from './referidos-admin.component';

describe('ReferidosAdminComponent', () => {
  let component: ReferidosAdminComponent;
  let fixture: ComponentFixture<ReferidosAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferidosAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferidosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
