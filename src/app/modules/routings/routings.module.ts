import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from 'src/app/pages/not-found/not-found.component';
import { CategoryIndexComponent } from 'src/app/components/categories/category-index/category-index.component';
import { ProductIndexComponent } from 'src/app/components/products/product-index/product-index.component';
import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';
import { NavigationComponent } from 'src/app/components/layout/navigation/navigation.component';
import { HomeComponent } from 'src/app/components/layout/home/home.component';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { RegisterComponent } from 'src/app/pages/register/register.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

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
          component: DashboardComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'categories',
          component: CategoryIndexComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'products',
          component: ProductIndexComponent,
          canActivate: [AuthGuard]
        },
      ]
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'register',
      component: RegisterComponent
    },
    {
      path: 'logout',
      redirectTo: 'login'
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
