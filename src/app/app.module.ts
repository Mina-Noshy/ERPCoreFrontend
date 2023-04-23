import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// begin translate
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
// end translate

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
import { BidiModule } from '@angular/cdk/bidi';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CustomHttpInterceptor } from './settings/CustomHttpInterceptor';
import { FormsModule } from '@angular/forms';


// Factory function required during AOT compilation
export function httpTranslateLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

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
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatrialImportsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BidiModule,
    FormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
