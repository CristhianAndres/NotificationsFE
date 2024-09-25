import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeGroupsComponent } from './tree-groups.component';

describe('TreeGroupsComponent', () => {
  let component: TreeGroupsComponent;
  let fixture: ComponentFixture<TreeGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreeGroupsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreeGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
