import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrearGestionComponent } from './crear-gestion.component';

describe('CrearGestionComponent', () => {
  let component: CrearGestionComponent;
  let fixture: ComponentFixture<CrearGestionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearGestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
