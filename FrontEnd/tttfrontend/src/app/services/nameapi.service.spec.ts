import { TestBed } from '@angular/core/testing';

import { NameapiService } from './nameapi.service';

describe('NameapiService', () => {
  let service: NameapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NameapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
