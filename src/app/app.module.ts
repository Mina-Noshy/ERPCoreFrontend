import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// begin translate
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
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
import { HomeComponent } from './components/layout/home/home.component';
import { BidiModule } from '@angular/cdk/bidi';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CustomHttpInterceptor } from './settings/CustomHttpInterceptor';
import { FormsModule } from '@angular/forms';
import { UserListComponent } from './components/account/user-list/user-list.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { LocalStorageValues } from './static-values/local-storage-values';
import { DeleteConfirmationDialogComponent } from './components/dialog/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';
import { PageIndexComponent } from './components/permission/page/page-index/page-index.component';
import { PageFormComponent } from './components/permission/page/page-form/page-form.component';
import { PermissionIndexComponent } from './components/permission/permission/permission-index/permission-index.component';
import { PageGroupFormComponent } from './components/permission/page-group/page-group-form/page-group-form.component';
import { PageGroupIndexComponent } from './components/permission/page-group/page-group-index/page-group-index.component';


// Factory function required during AOT compilation
export function httpTranslateLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function appInitializerFactory(translate: TranslateService) {
  
  return () => {
    translate.addLangs(['ar', 'en']);

    let appLang = localStorage.getItem(LocalStorageValues.app_lang);
    if (appLang == null) appLang = "ar";
    
    translate.setDefaultLang(appLang);
    return translate.use(appLang).toPromise();
  };
}

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DashboardComponent,
    NotFoundComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UserListComponent,
    HeaderComponent,
    FooterComponent,
    DeleteConfirmationDialogComponent,
    AccessDeniedComponent,
    PageIndexComponent,
    PageFormComponent,
    PermissionIndexComponent,
    PageGroupFormComponent,
    PageGroupIndexComponent,
    
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
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: CustomHttpInterceptor, 
      multi: true 
    },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [TranslateService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
