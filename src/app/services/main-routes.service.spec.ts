import { TestBed } from '@angular/core/testing';

import { MainRoutesService } from './main-routes.service';

describe('MainRoutesService', () => {
  let service: MainRoutesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainRoutesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
