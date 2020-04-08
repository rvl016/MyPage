import { TestBed } from '@angular/core/testing';

import { FeaturedProjectsService } from './featured-projects.service';

describe('FeaturedProjectsService', () => {
  let service: FeaturedProjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeaturedProjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
