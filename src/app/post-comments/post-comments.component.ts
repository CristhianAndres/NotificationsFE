import {Component, Inject, inject} from '@angular/core';
import {MatButton, MatFabButton} from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTableDataSource, MatTableModule
} from "@angular/material/table";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatIcon} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {Comment} from "../models/Comment";
import {CommentService} from "../services/comment.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {PostCommentsCreateComponent} from "../post-comments-create/post-comments-create.component";
import {MatToolbar} from "@angular/material/toolbar";

@Component({
  selector: 'app-post-comments',
  standalone: true,
  imports: [
    MatButton,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatFabButton,
    MatGridTile,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatRow,
    MatRowDef,
    NgIf,
    MatTableModule,
    MatGridList,
    MatToolbar
  ],
  templateUrl: './post-comments.component.html',
  styleUrl: './post-comments.component.css'
})
export class PostCommentsComponent {
  displayedColumnsComments: string[] = ['text', 'createAt'];
  dataSourceComments = new MatTableDataSource<any>();
  private commentService = inject(CommentService);
  readonly dialog = inject(MatDialog);
  comments: Comment[] = [];
  //data:any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {}) {
    //this.data = data;
    this.loadComments(data);
  }

  loadComments(data:any): void {
    this.commentService.getComments().subscribe(
      response => {
        console.log(response);
        this.dataSourceComments.data = response.filter((comment: Comment) => {
          return comment.postId == data.postId
        });
        console.log(this.dataSourceComments.data);
      },
      error => {
        console.error('Error al obtener datos', error);
      }
    );
  }

  openCreateComment() {
    const dialogRef = this.dialog.open(PostCommentsCreateComponent, {
      data: this.data,
      width: '90%', // Ajusta el ancho según sea necesario
      height: '100%', // Ajusta la altura según sea necesario
      maxWidth: '850px', // Puedes establecer un tamaño máximo
      maxHeight: '200px', // Puedes establecer un tamaño máximo
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.loadComments(this.data);
    });
  }
}
