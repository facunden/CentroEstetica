import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCajaDiariaComponent } from './lista-caja-diaria.component';

describe('ListaCajaDiariaComponent', () => {
  let component: ListaCajaDiariaComponent;
  let fixture: ComponentFixture<ListaCajaDiariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaCajaDiariaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaCajaDiariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
