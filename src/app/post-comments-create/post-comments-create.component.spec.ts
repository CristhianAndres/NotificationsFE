import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCommentsCreateComponent } from './post-comments-create.component';

describe('PostCommentsCreateComponent', () => {
  let component: PostCommentsCreateComponent;
  let fixture: ComponentFixture<PostCommentsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostCommentsCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostCommentsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
