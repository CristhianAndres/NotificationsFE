import {Component, Inject, inject} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFabButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {CommentService} from "../services/comment.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../models/User";
import {HttpErrorResponse} from "@angular/common/http";
import {Comment} from "../models/Comment";

@Component({
  selector: 'app-post-comments-create',
  standalone: true,
  imports: [
    MatToolbar,
    FormsModule,
    ReactiveFormsModule,
    MatFabButton,
    MatFormField,
    MatInput,
    MatLabel
  ],
  templateUrl: './post-comments-create.component.html',
  styleUrl: './post-comments-create.component.css'
})
export class PostCommentsCreateComponent {

  commentForm!: FormGroup;
  private commentService = inject(CommentService);
  readonly dialogRef = inject(MatDialogRef<PostCommentsCreateComponent>);

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.commentForm = this.fb.group({
      textComment: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.commentForm.valid) {
      const comment: Comment = this.commentForm.value;
      comment.createAt = new Date();
      comment.updateAt = new Date();
      comment.postId = this.data.postId;
      comment.userId = this.data.loginUserId;
      comment.text = this.commentForm.value.textComment;
      this.commentService.createComment(comment).subscribe(
        (data: Comment) => {
          console.log('got data', data);
          this.dialogRef.close();
        },
        (error: HttpErrorResponse) => {
          console.log('there was an error sending the query', error);
        }
      );
    }
  }
}
