import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorsListCheckComponent } from './actors-list-check.component';

describe('ActorsListCheckComponent', () => {
  let component: ActorsListCheckComponent;
  let fixture: ComponentFixture<ActorsListCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActorsListCheckComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActorsListCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
