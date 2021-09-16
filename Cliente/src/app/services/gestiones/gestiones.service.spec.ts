import { TestBed } from '@angular/core/testing';

import { GestionesService } from './gestiones.service';

describe('GestionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GestionesService = TestBed.get(GestionesService);
    expect(service).toBeTruthy();
  });
});
