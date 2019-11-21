import { TestBed } from '@angular/core/testing';

import { SettingsHomeService } from './settings-home.service';

describe('SettingsHomeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SettingsHomeService = TestBed.get(SettingsHomeService);
    expect(service).toBeTruthy();
  });
});
