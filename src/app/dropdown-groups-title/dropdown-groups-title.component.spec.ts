import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownGroupComponent } from './dropdown-groups-title.component';

describe('DropdownGroupsComponent', () => {
  let component: DropdownGroupsComponent;
  let fixture: ComponentFixture<DropdownGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownGroupsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
