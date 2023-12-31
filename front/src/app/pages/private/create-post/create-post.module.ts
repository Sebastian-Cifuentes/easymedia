import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePostComponent } from './create-post.component';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: CreatePostComponent
  }
]

@NgModule({
  declarations: [
    CreatePostComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CreatePostModule { }
