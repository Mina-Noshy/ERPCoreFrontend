import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Directionality } from '@angular/cdk/bidi';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { LocalStorageValues } from 'src/app/static-values/local-storage-values';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent
{
  isAuthorize = false;
  username = '';

  appLang:string|null = "ar";
  appLangs: any[] = [
    { code: 'ar', name: 'Arabic' },
    { code: 'en', name: 'English' },
  ];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  
  constructor(public translate: TranslateService,
              private dir: Directionality,
              private router: Router,
              private authService: AuthService,
              private breakpointObserver: BreakpointObserver)
  {
    
    translate.addLangs(this.appLangs.map(item => item.code));

    this.appLang = localStorage.getItem(LocalStorageValues.app_lang);
    if (this.appLang == null) 
    {
      this.appLang = "ar";
      translate.setDefaultLang(this.appLang);
    }
    else
    {
      translate.setDefaultLang(this.appLang);
    }
    //this.dir.change(this.appLang == "ar" ? 'rtl' : 'ltr');
    this.checkAuthorization()
  } 
  
  checkAuthorization(): void 
  {
    this.isAuthorize = this.authService.isAuthorize();
    this.username = this.authService.getUserDetails()?.username?? '';
  }

  translateLanguageTo(lang: string) 
  {
    localStorage.setItem(LocalStorageValues.app_lang, lang);
    this.translate.use(lang);
    //this.dir.change(this.appLang == "ar" ? 'rtl' : 'ltr');
  }

  logout():void
  {
    this.authService.logout();
    this.checkAuthorization();
  }
}
