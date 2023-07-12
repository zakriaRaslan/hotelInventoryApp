import { TestBed } from '@angular/core/testing';

import { ChildRoomGuard } from './child-room.guard';

describe('ChildRoomGuard', () => {
  let guard: ChildRoomGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ChildRoomGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
