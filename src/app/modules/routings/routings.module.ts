import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from 'src/app/pages/not-found/not-found.component';
import { NavigationComponent } from 'src/app/components/layout/navigation/navigation.component';

const routes: Routes =
  [
    {
      path: '',
      component: NavigationComponent
    },
    {
      path: 'not-found',
      component: NotFoundComponent
    },
    {
      path: '**',
      redirectTo: 'not-found'
    },
  ]

  @NgModule({
    declarations: [],
    imports: [
      CommonModule,
      RouterModule.forChild(routes),
    ],
    exports:[
      RouterModule
    ]
  })
  
export class RoutingsModule { }
