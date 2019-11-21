import { TestBed } from '@angular/core/testing';

import { DaxtraService } from './daxtra.service';

describe('DaxtraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DaxtraService = TestBed.get(DaxtraService);
    expect(service).toBeTruthy();
  });
});
