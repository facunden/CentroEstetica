import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TratamientoClienteComponent } from './tratamiento-cliente.component';

describe('TratamientoClienteComponent', () => {
  let component: TratamientoClienteComponent;
  let fixture: ComponentFixture<TratamientoClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TratamientoClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TratamientoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
