import { TestBed } from '@angular/core/testing';

import { MarquesService } from './marques.service';

describe('MarquesService', () => {
  let service: MarquesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarquesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
