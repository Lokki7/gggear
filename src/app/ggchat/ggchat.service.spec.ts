import { TestBed, inject } from '@angular/core/testing';

import { GgchatService } from './ggchat.service';

describe('GgchatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GgchatService]
    });
  });

  it('should be created', inject([GgchatService], (service: GgchatService) => {
    expect(service).toBeTruthy();
  }));
});
