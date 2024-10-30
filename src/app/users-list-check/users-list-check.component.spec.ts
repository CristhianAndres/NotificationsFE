import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersListCheckComponent } from './users-list-check.component';

describe('UsersListCheckComponent', () => {
  let component: UsersListCheckComponent;
  let fixture: ComponentFixture<UsersListCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersListCheckComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersListCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
