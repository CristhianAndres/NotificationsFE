import { TestBed } from '@angular/core/testing';

import { GroupCommunicationService } from './group-communication.service';

describe('GroupCommunicationService', () => {
  let service: GroupCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
