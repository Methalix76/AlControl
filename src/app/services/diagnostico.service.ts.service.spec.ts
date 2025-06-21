import { TestBed } from '@angular/core/testing';

import { DiagnosticoServiceTsService } from './diagnostico.service.ts.service';

describe('DiagnosticoServiceTsService', () => {
  let service: DiagnosticoServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiagnosticoServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
