import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './components/layout/navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { DashboardComponent } from './components/layout/dashboard/dashboard.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MatrialImportsModule } from './modules/matrial-imports/matrial-imports.module';
import { CategoryIndexComponent } from './components/categories/category-index/category-index.component';
import { CategoryFormComponent } from './components/categories/category-form/category-form.component';
import { ProductFormComponent } from './components/products/product-form/product-form.component';
import { ProductIndexComponent } from './components/products/product-index/product-index.component';
import { HomeComponent } from './components/layout/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DashboardComponent,
    NotFoundComponent,
    CategoryIndexComponent,
    CategoryFormComponent,
    ProductFormComponent,
    ProductIndexComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatrialImportsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
