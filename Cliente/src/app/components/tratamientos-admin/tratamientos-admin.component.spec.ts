import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TratamientosAdminComponent } from './tratamientos-admin.component';

describe('TratamientosAdminComponent', () => {
  let component: TratamientosAdminComponent;
  let fixture: ComponentFixture<TratamientosAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TratamientosAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TratamientosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
