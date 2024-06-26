import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from 'src/app/pages/not-found/not-found.component';
import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';
import { NavigationComponent } from 'src/app/components/layout/navigation/navigation.component';
import { HomeComponent } from 'src/app/components/layout/home/home.component';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { RegisterComponent } from 'src/app/pages/register/register.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { UserListComponent } from 'src/app/components/account/user-list/user-list.component';
import { AccessDeniedComponent } from 'src/app/pages/access-denied/access-denied.component';
import { PermissionGuard } from 'src/app/guards/permission.guard';

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
          canActivate: [AuthGuard, PermissionGuard]
        },
        {
          path: 'users',
          component: UserListComponent,
          canActivate: [AuthGuard, PermissionGuard]
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
      path: 'access-denied',
      component: AccessDeniedComponent
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
