import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaGiftCardsComponent } from './lista-gift-cards.component';

describe('ListaGiftCardsComponent', () => {
  let component: ListaGiftCardsComponent;
  let fixture: ComponentFixture<ListaGiftCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaGiftCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaGiftCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
