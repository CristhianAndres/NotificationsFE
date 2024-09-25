import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextImagePostComponent } from './text-image-post.component';

describe('TextImagePostComponent', () => {
  let component: TextImagePostComponent;
  let fixture: ComponentFixture<TextImagePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextImagePostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextImagePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
