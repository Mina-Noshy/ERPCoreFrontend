import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from 'src/app/pages/not-found/not-found.component';
import { CategoryIndexComponent } from 'src/app/components/categories/category-index/category-index.component';
import { ProductIndexComponent } from 'src/app/components/products/product-index/product-index.component';
import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';
import { NavigationComponent } from 'src/app/components/layout/navigation/navigation.component';
import { HomeComponent } from 'src/app/components/layout/home/home.component';

const routes: Routes =
  [
    {
      path: '',
      component: NavigationComponent,
      children: 
      [
        {
          path: '',
          component: HomeComponent
        },
        {
          path: 'dashboard',
          component: DashboardComponent
        },
        {
          path: 'categories',
          component: CategoryIndexComponent
        },
        {
          path: 'products',
          component: ProductIndexComponent
        },
      ]
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
