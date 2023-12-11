import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PrivateComponent } from './private.component';
import { LayoutModule } from 'src/app/layout/layout.module';

const routes: Routes = [
  {
    path: '',
    component: PrivateComponent,
    children: [
      {
        path: 'all-posts',
        loadChildren: () => import('./all-posts/all-posts.module').then(m => m.AllPostsModule)
      },
      {
        path: 'my-posts',
        loadChildren: () => import('./my-posts/my-posts.module').then(m => m.MyPostsModule)
      },
      {
        path: 'create-post',
        loadChildren: () => import('./create-post/create-post.module').then(m => m.CreatePostModule)
      },
      {
        path: '**',
        redirectTo: 'my-posts'
      }
    ]
  }
  
];

@NgModule({
  declarations: [
    PrivateComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    RouterModule.forChild(routes)
  ]
})
export class PrivateModule { }
