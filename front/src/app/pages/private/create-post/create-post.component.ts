import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/interfaces/Post';
import { PostsService } from 'src/app/services/posts.service';
import { StorageService } from 'src/app/services/storage.service';
import { FormErrorService } from '../../../services/form-error-service.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  post!: Post;
  form!: FormGroup;

  constructor(
    private postsService: PostsService,
    private storageService: StorageService,
    public formErrorService: FormErrorService,
    public dialog: MatDialog
  ) {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
      this.setPost();
  }

  async create() {
    try {
      if (this.form.invalid) return;
  
      await this.postsService.createPost(this.form.value);
      this.openDialog(false);
      this.form.reset();
      this.setPost();
    } catch (err) {
      this.openDialog(true);
    }
  }

  change() {
    this.post = { ...this.post, ...this.form.value };
  }

  setPost() {
    this.post = {
      title: 'Your post title',
      message: 'Your post message',
      user: this.storageService.getUser()
    }
  }

  openDialog(error: boolean): void {
    this.dialog.open(DialogComponent, {
      width: '250px',
      data: {error}
    });
  }
}
