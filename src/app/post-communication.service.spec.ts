import { TestBed } from '@angular/core/testing';

import { PostCommunicationService } from './post-communication.service';

describe('PostCommunicationService', () => {
  let service: PostCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
