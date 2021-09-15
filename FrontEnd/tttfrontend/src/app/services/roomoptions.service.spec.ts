import { TestBed } from '@angular/core/testing';

import { RoomoptionsService } from './roomoptions.service';

describe('RoomoptionsService', () => {
  let service: RoomoptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomoptionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
