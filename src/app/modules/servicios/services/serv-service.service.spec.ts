import { TestBed } from '@angular/core/testing';

import { ServServiceService } from './serv-service.service';

describe('ServServiceService', () => {
  let service: ServServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
