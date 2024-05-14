import { TestBed } from '@angular/core/testing';

import { ArchivaService } from './archiva.service';

describe('ArchivaService', () => {
  let service: ArchivaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArchivaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
